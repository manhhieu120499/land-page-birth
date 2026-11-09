import React, { useEffect, useState } from 'react'
import { birthdayConfig } from '../config/birthdayConfig'
import { birthdayAudio, type AudioStateSnapshot } from '../utils/birthdayAudio'

export const MusicPlayer: React.FC = () => {
  const [audioState, setAudioState] = useState<AudioStateSnapshot>(() =>
    birthdayAudio.getSnapshot()
  )

  useEffect(() => {
    return birthdayAudio.subscribe(setAudioState)
  }, [])

  const { isPlaying, isMuted } = audioState

  return (
    <aside
      className="music-player-pill"
      aria-label="Trình phát nhạc chúc mừng sinh nhật"
      data-testid="music-player"
    >
      {/* Spinning Vinyl Disc */}
      <div
        className={`music-vinyl ${isPlaying && !isMuted ? 'music-vinyl--spinning' : ''}`}
        aria-hidden="true"
      >
        <div className="music-vinyl-center">{isMuted ? '🔇' : '🎵'}</div>
      </div>

      {/* Song Info */}
      <div className="music-meta">
        <div className="music-status-row">
          <span
            className="music-status-dot"
            data-playing={isPlaying && !isMuted}
          />
          <span className="music-status-label">
            {isPlaying
              ? isMuted
                ? 'Đang tắt tiếng'
                : 'Đang phát nhạc sinh nhật'
              : 'Nhạc đang tạm dừng'}
          </span>
        </div>
        <div className="music-track-title">
          {birthdayConfig.music.trackTitle}
        </div>
      </div>

      {/* Animated Equalizer Bars */}
      <div
        className={`music-eq ${isPlaying && !isMuted ? 'music-eq--active' : ''}`}
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* Play / Pause Button */}
      <button
        type="button"
        className="music-toggle-btn"
        onClick={() => birthdayAudio.toggle()}
        aria-label={
          isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc chúc mừng sinh nhật'
        }
        data-testid="music-toggle-btn"
      >
        {isPlaying ? '⏸ Tạm dừng' : '▶ Phát nhạc'}
      </button>

      {/* Mute / Unmute Button */}
      <button
        type="button"
        className="music-icon-btn"
        onClick={() => birthdayAudio.toggleMute()}
        aria-label={isMuted ? 'Bật tiếng nhạc' : 'Tắt tiếng nhạc'}
        title={isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
        data-testid="music-mute-btn"
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      {/* Replay Melody Button */}
      <button
        type="button"
        className="music-icon-btn"
        onClick={() => void birthdayAudio.replay()}
        aria-label="Phát lại từ đầu"
        title="Phát lại bài nhạc từ đầu"
        data-testid="music-replay-btn"
      >
        ↺
      </button>
    </aside>
  )
}
