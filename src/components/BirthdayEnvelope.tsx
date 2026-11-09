import React, { useState } from 'react'
import { birthdayConfig } from '../config/birthdayConfig'

interface BirthdayEnvelopeProps {
  onStartMusicAndConfetti: () => void
  onFinishOpen: () => void
}

export const BirthdayEnvelope: React.FC<BirthdayEnvelopeProps> = ({
  onStartMusicAndConfetti,
  onFinishOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false)

  const handleOpenClick = () => {
    if (isOpening) {
      return
    }
    setIsOpening(true)
    // Trigger music and confetti synchronously inside the user click gesture!
    onStartMusicAndConfetti()
    window.setTimeout(() => {
      onFinishOpen()
    }, 680)
  }

  return (
    <section
      className="envelope-stage"
      aria-label="Phong bì thư chúc mừng sinh nhật"
    >
      <div className="envelope-header">
        <span className="envelope-badge">🎉 100% Hoàn tất!</span>
        <h1 className="envelope-title">{birthdayConfig.envelope.title}</h1>
        <p className="envelope-subtitle">{birthdayConfig.envelope.subtitle}</p>
      </div>

      <button
        type="button"
        className={`envelope-button ${isOpening ? 'envelope-button--opening' : ''}`}
        onClick={handleOpenClick}
        aria-label={birthdayConfig.envelope.buttonText}
        data-testid="open-envelope-btn"
      >
        <div className="envelope-3d">
          {/* Back of envelope */}
          <div className="envelope-back" />

          {/* Preview letter peeking inside */}
          <div className="envelope-letter-preview">
            <div className="envelope-letter-mini-avatar">🎂</div>
            <div className="envelope-letter-mini-title">
              Gửi {birthdayConfig.recipientName}
            </div>
            <div className="envelope-letter-mini-lines">
              <span />
              <span />
            </div>
          </div>

          {/* Left & Right & Bottom folded pockets */}
          <svg
            className="envelope-pocket-svg"
            viewBox="0 0 340 220"
            preserveAspectRatio="none"
          >
            {/* Left fold */}
            <polygon points="0,0 175,115 0,220" fill="#ffb3c6" />
            {/* Right fold */}
            <polygon points="340,0 165,115 340,220" fill="#ff9ebb" />
            {/* Bottom fold */}
            <polygon points="0,220 170,102 340,220" fill="#ff8fab" />
          </svg>

          {/* Top Flap that flips open */}
          <svg
            className="envelope-flap-svg"
            viewBox="0 0 340 130"
            preserveAspectRatio="none"
          >
            <polygon
              points="0,0 170,124 340,0"
              fill="#ff7597"
              stroke="#ff5d8f"
              strokeWidth="2"
            />
          </svg>

          {/* Wax Seal with Cat Paw / Heart */}
          <div className="envelope-wax-seal">
            <span className="envelope-seal-icon">💌</span>
            <span className="envelope-seal-text">
              {birthdayConfig.envelope.sealLabel}
            </span>
          </div>
        </div>

        <span className="envelope-cta-pill">
          {birthdayConfig.envelope.buttonText}
        </span>
      </button>
    </section>
  )
}
