import { useCallback, useEffect, useState } from 'react'
import { birthdayConfig } from './config/birthdayConfig'
import { BirthdayEnvelope } from './components/BirthdayEnvelope'
import { BirthdayLetterModal } from './components/BirthdayLetterModal'
import { CakeBackground } from './components/CakeBackground'
import { CatProgressBar } from './components/CatProgressBar'
import { ConfettiCanvas } from './components/ConfettiCanvas'
import { CornerPolaroids } from './components/CornerPolaroids'
import { MusicPlayer } from './components/MusicPlayer'
import { birthdayAudio } from './utils/birthdayAudio'
import './App.css'

export type BirthdayStage = 'loading' | 'envelope' | 'opened'

function App() {
  const [stage, setStage] = useState<BirthdayStage>('loading')
  const [confettiBurstKey, setConfettiBurstKey] = useState(0)
  const [hasUnlockedMusic, setHasUnlockedMusic] = useState(false)

  useEffect(() => {
    const urls = new Set<string>([
      birthdayConfig.mainPhotoUrl,
      birthdayConfig.headerLeftFlowerUrl,
      birthdayConfig.headerRightFlowerUrl,
      ...birthdayConfig.cornerPhotos.map((item) => item.imageUrl),
    ])
    for (const url of urls) {
      const img = new Image()
      img.src = url
    }
  }, [])

  const handleLoadingComplete = useCallback(() => {
    setStage('envelope')
  }, [])

  const handleStartMusicAndConfetti = useCallback(() => {
    setHasUnlockedMusic(true)
    void birthdayAudio.play()
    setConfettiBurstKey((prev) => prev + 1)
  }, [])

  const handleFinishOpenEnvelope = useCallback(() => {
    setStage('opened')
    setConfettiBurstKey((prev) => prev + 1)
  }, [])

  const handleShootConfetti = useCallback(() => {
    setConfettiBurstKey((prev) => prev + 1)
  }, [])

  const handleReplayProgress = useCallback(() => {
    setStage('loading')
  }, [])
  return (
    <div className={`birthday-app birthday-app--${stage}`}>
      {/* Layer 0: Persistent Illustrated Birthday Cake Background */}
      <CakeBackground stage={stage} />

      {/* Layer 1: Celebratory Confetti Overlay */}
      <ConfettiCanvas burstKey={confettiBurstKey} />

      {/* Layer 2: 4 Corner Mini Polaroid Photos (Revealed when letter opens) */}
      {stage === 'opened' && <CornerPolaroids />}

      {/* Layer 3: Center Stage (Progress Cat -> Envelope -> Photo + Letter) */}
      <main className="birthday-center-stage">
        {stage === 'loading' && (
          <CatProgressBar onComplete={handleLoadingComplete} />
        )}

        {stage === 'envelope' && (
          <BirthdayEnvelope
            onStartMusicAndConfetti={handleStartMusicAndConfetti}
            onFinishOpen={handleFinishOpenEnvelope}
          />
        )}

        {stage === 'opened' && (
          <BirthdayLetterModal
            onShootConfetti={handleShootConfetti}
            onReplayProgress={handleReplayProgress}
          />
        )}
      </main>

      {/* Layer 4: Persistent Music Player once letter has been opened */}
      {hasUnlockedMusic && <MusicPlayer />}
    </div>
  )
}

export default App
