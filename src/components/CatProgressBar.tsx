import React, { useEffect, useState } from 'react'
import { birthdayConfig } from '../config/birthdayConfig'

interface CatProgressBarProps {
  onComplete: () => void
}

export const CatProgressBar: React.FC<CatProgressBarProps> = ({
  onComplete,
}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = birthdayConfig.loadingDurationMs
    let startTime: number | null = null
    let animationFrameId: number
    let completionTimeoutId: number | undefined

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp
      }
      const elapsed = timestamp - startTime
      const ratio = Math.min(1, elapsed / duration)
      // Smooth ease-in-out curve with steady progress
      const eased =
        ratio < 0.5
          ? 2 * ratio * ratio
          : 1 - Math.pow(-2 * ratio + 2, 2) / 2
      const nextPercent = Math.min(100, Math.round(eased * 100))
      setProgress(nextPercent)

      if (ratio < 1) {
        animationFrameId = window.requestAnimationFrame(step)
      } else {
        setProgress(100)
        completionTimeoutId = window.setTimeout(() => {
          onComplete()
        }, 480)
      }
    }

    animationFrameId = window.requestAnimationFrame(step)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.clearTimeout(completionTimeoutId)
    }
  }, [onComplete])

  const currentStatusMessage =
    [...birthdayConfig.loadingMessages]
      .reverse()
      .find((item) => progress >= item.threshold)?.text ??
    birthdayConfig.loadingMessages[0].text

  // Clamp visual cat position between 4% and 96% so the cat stays cleanly over the bar edges
  const clampedLeft = Math.min(96, Math.max(4, progress))

  return (
    <section
      className="loader-card"
      aria-label="Tiến trình chuẩn bị bất ngờ sinh nhật"
    >
      <div className="loader-badge">
        <span>🎂</span>
        <span>{birthdayConfig.birthdayDate}</span>
      </div>

      <h1 className="loader-title">
        Đang chuẩn bị món quà cho{' '}
        <span className="loader-recipient">{birthdayConfig.recipientName}</span>
      </h1>

      <p className="loader-subtitle">{currentStatusMessage}</p>

      {/* Progress Stage with Walking Cat Above */}
      <div className="cat-progress-stage">
        <div
          className="cat-walker-anchor"
          style={{ left: `${clampedLeft}%` }}
          data-testid="cat-walker"
        >
          {/* Floating % bubble above cat */}
          <div className="cat-percent-bubble">{progress}%</div>

          {/* Animated SVG Cute Cat carrying a tiny birthday letter */}
          <svg
            className="cat-svg"
            viewBox="0 0 120 96"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Wagging tail */}
            <path
              className="cat-tail"
              d="M 24 58 Q 6 42 14 24"
              fill="none"
              stroke="#ff8fab"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Back legs */}
            <rect
              className="cat-leg cat-leg--back"
              x="32"
              y="66"
              width="10"
              height="20"
              rx="5"
              fill="#ffb3c6"
            />
            <rect
              className="cat-leg cat-leg--front"
              x="46"
              y="66"
              width="10"
              height="20"
              rx="5"
              fill="#ffffff"
              stroke="#ff8fab"
              strokeWidth="2"
            />
            {/* Front legs */}
            <rect
              className="cat-leg cat-leg--back"
              x="64"
              y="66"
              width="10"
              height="20"
              rx="5"
              fill="#ffb3c6"
            />
            <rect
              className="cat-leg cat-leg--front"
              x="76"
              y="66"
              width="10"
              height="20"
              rx="5"
              fill="#ffffff"
              stroke="#ff8fab"
              strokeWidth="2"
            />

            {/* Body */}
            <ellipse
              cx="56"
              cy="56"
              rx="30"
              ry="19"
              fill="#ffffff"
              stroke="#ff8fab"
              strokeWidth="3"
            />
            {/* Pink spot on back */}
            <ellipse cx="48" cy="46" rx="12" ry="7" fill="#ffd6e0" />

            {/* Head */}
            <g className="cat-head-group">
              {/* Left Ear */}
              <polygon
                points="64,28 69,10 81,22"
                fill="#ffffff"
                stroke="#ff8fab"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <polygon points="67,25 70,15 77,22" fill="#ffb3c6" />
              {/* Right Ear */}
              <polygon
                points="82,22 95,10 98,29"
                fill="#ffffff"
                stroke="#ff8fab"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <polygon points="85,22 93,15 95,25" fill="#ffb3c6" />

              {/* Tiny Party Hat between ears */}
              <polygon
                points="74,20 81,3 88,20"
                fill="#ffd166"
                stroke="#f77f00"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="81" cy="3" r="3.5" fill="#ff4d6d" />

              {/* Face circle */}
              <circle
                cx="81"
                cy="38"
                r="19"
                fill="#ffffff"
                stroke="#ff8fab"
                strokeWidth="3"
              />
              {/* Rosy cheeks */}
              <ellipse cx="70" cy="42" rx="4" ry="2.5" fill="#ff8fab" opacity="0.7" />
              <ellipse cx="93" cy="42" rx="4" ry="2.5" fill="#ff8fab" opacity="0.7" />
              {/* Eyes */}
              <circle cx="75" cy="36" r="2.8" fill="#4a2545" />
              <circle cx="88" cy="36" r="2.8" fill="#4a2545" />
              <circle cx="76" cy="35" r="1" fill="#ffffff" />
              <circle cx="89" cy="35" r="1" fill="#ffffff" />
              {/* Cute Nose & Mouth */}
              <polygon points="80,40 84,40 82,43" fill="#ff4d6d" />
              <path
                d="M 78 45 Q 82 48 86 45"
                fill="none"
                stroke="#4a2545"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Tiny Love Letter held by the cat */}
              <g transform="translate(88, 46) rotate(-10)">
                <rect
                  x="0"
                  y="0"
                  width="22"
                  height="15"
                  rx="3"
                  fill="#fff0f3"
                  stroke="#ff4d6d"
                  strokeWidth="2"
                />
                <path
                  d="M 1 1 L 11 9 L 21 1"
                  fill="none"
                  stroke="#ff4d6d"
                  strokeWidth="1.8"
                />
                <circle cx="11" cy="8" r="2.3" fill="#ff4d6d" />
              </g>
            </g>
          </svg>
        </div>

        {/* Progress Bar Track */}
        <div
          className="progress-track"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          >
            <div className="progress-shimmer" />
          </div>
        </div>

        <div className="progress-footer">
          <span className="progress-label">🐾 Mèo đưa thư đang chạy...</span>
          <span className="progress-number" data-testid="progress-percent">
            {progress}%
          </span>
        </div>
      </div>
    </section>
  )
}
