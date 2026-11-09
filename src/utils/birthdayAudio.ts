import { birthdayConfig } from '../config/birthdayConfig'

interface NoteEvent {
  freq: number
  harmonyFreq?: number
  beats: number
}

// Traditional "Happy Birthday to You" melody in F Major (warm music-box register)
const HAPPY_BIRTHDAY_MELODY: NoteEvent[] = [
  // "Hap-py Birth-day to you"
  { freq: 523.25, harmonyFreq: 261.63, beats: 0.75 }, // C5
  { freq: 523.25, beats: 0.25 }, // C5
  { freq: 587.33, harmonyFreq: 349.23, beats: 1.0 }, // D5
  { freq: 523.25, harmonyFreq: 349.23, beats: 1.0 }, // C5
  { freq: 698.46, harmonyFreq: 440.0, beats: 1.0 }, // F5
  { freq: 659.25, harmonyFreq: 392.0, beats: 2.0 }, // E5

  // "Hap-py Birth-day to you"
  { freq: 523.25, harmonyFreq: 261.63, beats: 0.75 }, // C5
  { freq: 523.25, beats: 0.25 }, // C5
  { freq: 587.33, harmonyFreq: 392.0, beats: 1.0 }, // D5
  { freq: 523.25, harmonyFreq: 392.0, beats: 1.0 }, // C5
  { freq: 783.99, harmonyFreq: 523.25, beats: 1.0 }, // G5
  { freq: 698.46, harmonyFreq: 349.23, beats: 2.0 }, // F5

  // "Hap-py Birth-day dear Best-ie"
  { freq: 523.25, harmonyFreq: 261.63, beats: 0.75 }, // C5
  { freq: 523.25, beats: 0.25 }, // C5
  { freq: 1046.5, harmonyFreq: 523.25, beats: 1.0 }, // C6
  { freq: 880.0, harmonyFreq: 440.0, beats: 1.0 }, // A5
  { freq: 698.46, harmonyFreq: 349.23, beats: 1.0 }, // F5
  { freq: 659.25, harmonyFreq: 392.0, beats: 1.0 }, // E5
  { freq: 587.33, harmonyFreq: 466.16, beats: 1.8 }, // D5

  // "Hap-py Birth-day to you!"
  { freq: 932.33, harmonyFreq: 466.16, beats: 0.75 }, // Bb5
  { freq: 932.33, beats: 0.25 }, // Bb5
  { freq: 880.0, harmonyFreq: 440.0, beats: 1.0 }, // A5
  { freq: 698.46, harmonyFreq: 349.23, beats: 1.0 }, // F5
  { freq: 783.99, harmonyFreq: 523.25, beats: 1.0 }, // G5
  { freq: 698.46, harmonyFreq: 349.23, beats: 2.4 }, // F5
]

export interface AudioStateSnapshot {
  isPlaying: boolean
  isMuted: boolean
}

type Listener = (state: AudioStateSnapshot) => void

class BirthdayAudioController {
  private audioCtx: AudioContext | null = null
  private masterGainNode: GainNode | null = null
  private passGainNode: GainNode | null = null
  private htmlAudio: HTMLAudioElement | null = null
  private loopTimerId: number | undefined
  private isPlayingState = false
  private isMutedState = false
  private listeners = new Set<Listener>()

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener)
    listener(this.getSnapshot())
    return () => {
      this.listeners.delete(listener)
    }
  }

  public getSnapshot(): AudioStateSnapshot {
    return {
      isPlaying: this.isPlayingState,
      isMuted: this.isMutedState,
    }
  }

  private notify() {
    const snap = this.getSnapshot()
    for (const listener of this.listeners) {
      listener(snap)
    }
  }

  public isPlaying(): boolean {
    return this.isPlayingState
  }

  public isMuted(): boolean {
    return this.isMutedState
  }

  public async play(): Promise<void> {
    if (this.isPlayingState) {
      return
    }

    const customUrl = birthdayConfig.music.audioUrl.trim()
    if (customUrl.length > 0) {
      try {
        if (!this.htmlAudio) {
          this.htmlAudio = new Audio(customUrl)
          this.htmlAudio.loop = true
          this.htmlAudio.muted = this.isMutedState
        }
        await this.htmlAudio.play()
        this.isPlayingState = true
        this.notify()
        return
      } catch {
        // Fallback to Web Audio API music-box synth if custom audio fails
      }
    }

    this.startMusicBoxSynth()
  }

  public pause(): void {
    this.isPlayingState = false
    window.clearTimeout(this.loopTimerId)
    this.loopTimerId = undefined

    if (this.htmlAudio) {
      this.htmlAudio.pause()
    }
    this.disconnectActivePass()
    if (this.audioCtx && this.audioCtx.state === 'running') {
      void this.audioCtx.suspend()
    }
    this.notify()
  }

  public async replay(): Promise<void> {
    this.pause()
    if (this.htmlAudio) {
      this.htmlAudio.currentTime = 0
    }
    await this.play()
  }

  public toggle(): void {
    if (this.isPlayingState) {
      this.pause()
    } else {
      void this.play()
    }
  }

  public toggleMute(): void {
    this.isMutedState = !this.isMutedState
    if (this.htmlAudio) {
      this.htmlAudio.muted = this.isMutedState
    }
    if (this.masterGainNode && this.audioCtx) {
      this.masterGainNode.gain.setValueAtTime(
        this.isMutedState ? 0 : 1,
        this.audioCtx.currentTime
      )
    }
    this.notify()
  }

  private disconnectActivePass(): void {
    if (this.passGainNode) {
      try {
        this.passGainNode.disconnect()
      } catch {
        // Ignore already disconnected node
      }
      this.passGainNode = null
    }
  }

  private startMusicBoxSynth(): void {
    if (typeof window.AudioContext === 'undefined') {
      return
    }

    if (!this.audioCtx) {
      this.audioCtx = new window.AudioContext()
      this.masterGainNode = this.audioCtx.createGain()
      this.masterGainNode.gain.setValueAtTime(
        this.isMutedState ? 0 : 1,
        this.audioCtx.currentTime
      )
      this.masterGainNode.connect(this.audioCtx.destination)
    }

    if (this.audioCtx.state === 'suspended') {
      void this.audioCtx.resume()
    }

    this.isPlayingState = true
    this.notify()
    this.scheduleMelodyLoop()
  }

  private scheduleMelodyLoop(): void {
    if (!this.isPlayingState || !this.audioCtx || !this.masterGainNode) {
      return
    }

    this.disconnectActivePass()

    const ctx = this.audioCtx
    const passBus = ctx.createGain()
    passBus.gain.setValueAtTime(1, ctx.currentTime)
    passBus.connect(this.masterGainNode)
    this.passGainNode = passBus

    const beatDurationSec = 0.42 // ~142 BPM gentle waltz feel
    let cursorTime = ctx.currentTime + 0.06

    for (const note of HAPPY_BIRTHDAY_MELODY) {
      const noteDuration = note.beats * beatDurationSec
      this.triggerMusicBoxChime(
        ctx,
        passBus,
        note.freq,
        cursorTime,
        noteDuration,
        0.16
      )

      if (note.harmonyFreq) {
        this.triggerMusicBoxChime(
          ctx,
          passBus,
          note.harmonyFreq,
          cursorTime,
          noteDuration * 1.15,
          0.075
        )
      }
      cursorTime += noteDuration
    }

    const totalLoopMs = Math.round((cursorTime - ctx.currentTime + 0.35) * 1000)
    window.clearTimeout(this.loopTimerId)
    this.loopTimerId = window.setTimeout(() => {
      if (this.isPlayingState) {
        this.scheduleMelodyLoop()
      }
    }, totalLoopMs)
  }

  private triggerMusicBoxChime(
    ctx: AudioContext,
    destination: AudioNode,
    frequency: number,
    startTime: number,
    duration: number,
    peakGain: number
  ): void {
    const oscMain = ctx.createOscillator()
    const oscOvertone = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscMain.type = 'sine'
    oscMain.frequency.setValueAtTime(frequency, startTime)

    // Soft bell overtone (2x frequency at lower volume)
    oscOvertone.type = 'triangle'
    oscOvertone.frequency.setValueAtTime(frequency * 2, startTime)

    const overtoneGain = ctx.createGain()
    overtoneGain.gain.setValueAtTime(0.18, startTime)

    gainNode.gain.setValueAtTime(0.0001, startTime)
    gainNode.gain.linearRampToValueAtTime(peakGain, startTime + 0.025)
    gainNode.gain.exponentialRampToValueAtTime(
      0.0008,
      startTime + duration + 0.22
    )

    oscMain.connect(gainNode)
    oscOvertone.connect(overtoneGain)
    overtoneGain.connect(gainNode)
    gainNode.connect(destination)

    oscMain.start(startTime)
    oscOvertone.start(startTime)
    oscMain.stop(startTime + duration + 0.25)
    oscOvertone.stop(startTime + duration + 0.25)
  }
}

export const birthdayAudio = new BirthdayAudioController()
