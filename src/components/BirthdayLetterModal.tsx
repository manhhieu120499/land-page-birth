import React from 'react'
import { birthdayConfig } from '../config/birthdayConfig'

interface BirthdayLetterModalProps {
  onShootConfetti: () => void
  onReplayProgress: () => void
}

export const BirthdayLetterModal: React.FC<BirthdayLetterModalProps> = ({
  onShootConfetti,
  onReplayProgress,
}) => {
  return (
    <article
      className="letter-card"
      aria-label="Thư chúc mừng sinh nhật"
      data-testid="birthday-letter-card"
    >
      {/* Decorative corner ribbons */}
      <div className="letter-ribbon letter-ribbon--left" aria-hidden="true">
        🎀
      </div>
      <div className="letter-ribbon letter-ribbon--right" aria-hidden="true">
        🎀
      </div>

      {/* Main Recipient Photo Portrait Frame */}
      <div className="recipient-hero">
        <div className="recipient-photo-frame">
          <img
            src={birthdayConfig.mainPhotoUrl}
            alt={birthdayConfig.recipientName}
            className="recipient-photo-img"
            data-testid="recipient-main-photo"
          />
          <span className="recipient-crown-badge" aria-hidden="true">
            👑
          </span>
        </div>
        <div className="recipient-header-bottom">
          <img
            src={birthdayConfig.headerLeftFlowerUrl}
            alt="Hoa cẩm tú cầu hồng bên trái"
            className="header-hydrangea header-hydrangea--left"
            data-testid="hydrangea-left"
          />
          <div className="recipient-meta">
            <span className="recipient-age-pill">{birthdayConfig.ageBadge}</span>
            <h1 className="recipient-name">{birthdayConfig.recipientName}</h1>
            <p className="recipient-caption">{birthdayConfig.mainPhotoCaption}</p>
          </div>
          <img
            src={birthdayConfig.headerRightFlowerUrl}
            alt="Hoa cẩm tú cầu hồng bên phải"
            className="header-hydrangea header-hydrangea--right"
            data-testid="hydrangea-right"
          />
        </div>
      </div>

      <div className="letter-divider" aria-hidden="true">
        <span>🌸</span>
        <span>🎂</span>
        <span>🌸</span>
      </div>

      {/* Birthday Letter Content */}
      <div className="letter-body">
        <p className="letter-greeting">{birthdayConfig.letter.greeting}</p>

        {birthdayConfig.letter.paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="letter-paragraph"
            style={{ animationDelay: `${0.18 + index * 0.14}s` }}
          >
            {paragraph}
          </p>
        ))}

        <div className="letter-wish-highlight">
          {birthdayConfig.letter.wishHighlight}
        </div>

        <div className="letter-footer">
          <div className="letter-cat-sticker" aria-hidden="true">
            🐱💐
          </div>
          <div className="letter-signature-block">
            <p className="letter-closing">{birthdayConfig.letter.closing}</p>
            <p className="letter-signature">
              {birthdayConfig.letter.senderSignature}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="letter-actions">
        <button
          type="button"
          className="letter-btn letter-btn--primary"
          onClick={onShootConfetti}
          data-testid="shoot-confetti-btn"
        >
          🎉 Bắn thêm pháo hoa chúc mừng!
        </button>
        <button
          type="button"
          className="letter-btn letter-btn--ghost"
          onClick={onReplayProgress}
        >
          🔄 Xem lại mèo chạy
        </button>
      </div>
    </article>
  )
}
