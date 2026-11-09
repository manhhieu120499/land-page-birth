import React from 'react'

interface CakeBackgroundProps {
  stage: 'loading' | 'envelope' | 'opened'
}

const SPARKLES = [
  { id: 1, left: '8%', top: '14%', size: 10, delay: '0s', duration: '4.2s' },
  { id: 2, left: '18%', top: '72%', size: 14, delay: '0.8s', duration: '5.1s' },
  { id: 3, left: '28%', top: '18%', size: 8, delay: '1.4s', duration: '3.8s' },
  { id: 4, left: '44%', top: '10%', size: 12, delay: '0.3s', duration: '4.6s' },
  { id: 5, left: '62%', top: '15%', size: 9, delay: '1.9s', duration: '4.0s' },
  { id: 6, left: '78%', top: '22%', size: 13, delay: '0.5s', duration: '5.3s' },
  { id: 7, left: '88%', top: '65%', size: 11, delay: '1.1s', duration: '4.4s' },
  { id: 8, left: '14%', top: '42%', size: 9, delay: '2.2s', duration: '4.8s' },
  { id: 9, left: '84%', top: '38%', size: 12, delay: '1.6s', duration: '3.9s' },
  { id: 10, left: '52%', top: '86%', size: 10, delay: '0.9s', duration: '5.0s' },
]

export const CakeBackground: React.FC<CakeBackgroundProps> = ({ stage }) => {
  return (
    <div
      className={`cake-background cake-background--${stage}`}
      aria-hidden="true"
    >
      {/* Ambient soft glowing orbs */}
      <div className="cake-bg-orb cake-bg-orb--pink" />
      <div className="cake-bg-orb cake-bg-orb--gold" />
      <div className="cake-bg-orb cake-bg-orb--lavender" />

      {/* Festive bunting garland at top */}
      <svg
        className="cake-bunting"
        viewBox="0 0 1200 130"
        preserveAspectRatio="none"
      >
        <path
          d="M 0,10 Q 150,95 300,15 Q 450,95 600,15 Q 750,95 900,15 Q 1050,95 1200,10"
          fill="none"
          stroke="rgba(255, 255, 255, 0.55)"
          strokeWidth="3"
        />
        {/* Pennants */}
        {[
          { x: 55, y: 38, color: '#ff8fab' },
          { x: 135, y: 55, color: '#ffd166' },
          { x: 215, y: 42, color: '#a0c4ff' },
          { x: 355, y: 40, color: '#bdb2ff' },
          { x: 435, y: 56, color: '#ffadad' },
          { x: 515, y: 42, color: '#fdffb6' },
          { x: 655, y: 40, color: '#ff8fab' },
          { x: 735, y: 56, color: '#caffbf' },
          { x: 815, y: 42, color: '#ffd166' },
          { x: 955, y: 40, color: '#a0c4ff' },
          { x: 1035, y: 56, color: '#ffc6ff' },
          { x: 1115, y: 42, color: '#ff8fab' },
        ].map((flag, idx) => (
          <polygon
            key={idx}
            points={`${flag.x - 24},${flag.y - 12} ${flag.x + 24},${flag.y - 12} ${flag.x},${flag.y + 34}`}
            fill={flag.color}
            opacity="0.72"
          />
        ))}
      </svg>

      {/* Floating sparkles */}
      <div className="cake-sparkles">
        {SPARKLES.map((item) => (
          <span
            key={item.id}
            className="cake-sparkle"
            style={{
              left: item.left,
              top: item.top,
              width: `${item.size}px`,
              height: `${item.size}px`,
              animationDelay: item.delay,
              animationDuration: item.duration,
            }}
          />
        ))}
      </div>

      {/* Central Illustrated Multi-Tier Birthday Cake */}
      <div className="cake-scene-wrapper">
        <svg
          className="cake-illustration"
          viewBox="0 0 700 620"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="candleHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffe66d" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#ff9f1c" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ff9f1c" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="tierBottom" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffc2d4" />
              <stop offset="100%" stopColor="#ff8fab" />
            </linearGradient>
            <linearGradient id="tierMiddle" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fff0f5" />
              <stop offset="100%" stopColor="#ffd6e0" />
            </linearGradient>
            <linearGradient id="tierTop" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffe5ec" />
              <stop offset="100%" stopColor="#ffb3c6" />
            </linearGradient>
            <linearGradient id="icingCream" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fff0f3" />
            </linearGradient>
            <linearGradient id="plateGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f8edeb" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f8edeb" />
            </linearGradient>
          </defs>

          {/* Soft ambient glow behind the cake */}
          <circle cx="350" cy="310" r="275" fill="url(#candleHalo)" opacity="0.55" />

          {/* Cake Stand & Plate */}
          <ellipse cx="350" cy="566" rx="150" ry="20" fill="#e8d7df" opacity="0.7" />
          <path
            d="M300 505 L400 505 L425 562 L275 562 Z"
            fill="url(#plateGrad)"
            stroke="#f2d0dd"
            strokeWidth="3"
          />
          <ellipse
            cx="350"
            cy="502"
            rx="255"
            ry="28"
            fill="url(#plateGrad)"
            stroke="#f2c6d8"
            strokeWidth="4"
          />

          {/* === BOTTOM TIER === */}
          <rect
            x="130"
            y="360"
            width="440"
            height="140"
            rx="28"
            fill="url(#tierBottom)"
            stroke="#ff7597"
            strokeWidth="3"
          />
          {/* Bottom tier decorative vertical stripes */}
          {[175, 225, 275, 325, 375, 425, 475, 525].map((x) => (
            <line
              key={x}
              x1={x}
              y1="382"
              x2={x}
              y2="495"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="8"
              strokeLinecap="round"
            />
          ))}
          {/* Bottom tier cream drips */}
          <path
            d="M130 375
               Q155 412 180 380
               Q205 422 230 380
               Q255 408 280 380
               Q305 425 330 380
               Q355 410 380 380
               Q405 426 430 380
               Q455 412 480 380
               Q505 422 530 380
               Q550 408 570 375
               L570 360 L130 360 Z"
            fill="url(#icingCream)"
          />
          {/* Bottom base cream puffs */}
          {[148, 184, 220, 256, 292, 328, 364, 400, 436, 472, 508, 544].map(
            (cx, i) => (
              <circle
                key={cx}
                cx={cx}
                cy="496"
                r="16"
                fill={i % 2 === 0 ? '#fff0f3' : '#ffd166'}
              />
            )
          )}

          {/* === MIDDLE TIER === */}
          <rect
            x="185"
            y="240"
            width="330"
            height="122"
            rx="24"
            fill="url(#tierMiddle)"
            stroke="#ff9ebb"
            strokeWidth="3"
          />
          {/* Middle tier frosting swags */}
          <path
            d="M185 256
               Q212 292 240 258
               Q268 296 295 258
               Q322 292 350 258
               Q378 296 405 258
               Q432 292 460 258
               Q488 294 515 256
               L515 240 L185 240 Z"
            fill="url(#icingCream)"
          />
          {/* Sprinkles & hearts on middle tier */}
          {[
            { cx: 225, cy: 312, fill: '#ff5d8f' },
            { cx: 275, cy: 326, fill: '#ffd166' },
            { cx: 325, cy: 308, fill: '#4cc9f0' },
            { cx: 375, cy: 326, fill: '#ff5d8f' },
            { cx: 425, cy: 310, fill: '#9d4edd' },
            { cx: 475, cy: 324, fill: '#ffd166' },
          ].map((dot, idx) => (
            <circle key={idx} cx={dot.cx} cy={dot.cy} r="6.5" fill={dot.fill} />
          ))}

          {/* === TOP TIER === */}
          <rect
            x="240"
            y="145"
            width="220"
            height="98"
            rx="20"
            fill="url(#tierTop)"
            stroke="#ff7597"
            strokeWidth="3"
          />
          <path
            d="M240 160
               Q267 192 295 160
               Q322 195 350 160
               Q378 195 405 160
               Q432 192 460 160
               L460 145 L240 145 Z"
            fill="url(#icingCream)"
          />
          {/* Strawberries on top tier */}
          {[268, 310, 350, 390, 432].map((sx) => (
            <g key={sx} transform={`translate(${sx}, 140)`}>
              <path
                d="M-11,4 C-12,-10 0,-18 0,-18 C0,-18 12,-10 11,4 C10,12 -10,12 -11,4 Z"
                fill="#ff4d6d"
              />
              <path d="M-6,-13 L0,-9 L6,-13 L0,-16 Z" fill="#52b788" />
            </g>
          ))}

          {/* === 5 GLOWING CANDLES ON TOP === */}
          {[280, 315, 350, 385, 420].map((cx, idx) => (
            <g key={cx} className={`cake-candle cake-candle--${idx + 1}`}>
              {/* Candle body */}
              <rect
                x={cx - 8}
                y="76"
                width="16"
                height="66"
                rx="6"
                fill="#ffffff"
                stroke="#ff9ebb"
                strokeWidth="2"
              />
              {/* Diagonal candy stripes */}
              <line
                x1={cx - 7}
                y1="92"
                x2={cx + 7}
                y2="102"
                stroke={idx % 2 === 0 ? '#ff5d8f' : '#4cc9f0'}
                strokeWidth="4"
              />
              <line
                x1={cx - 7}
                y1="112"
                x2={cx + 7}
                y2="122"
                stroke={idx % 2 === 0 ? '#ffd166' : '#9d4edd'}
                strokeWidth="4"
              />
              {/* Wick */}
              <line
                x1={cx}
                y1="68"
                x2={cx}
                y2="76"
                stroke="#4a2545"
                strokeWidth="2.5"
              />
              {/* Halo glow */}
              <circle
                cx={cx}
                cy="52"
                r="28"
                fill="url(#candleHalo)"
                className="candle-halo"
              />
              {/* Outer Flame */}
              <path
                d={`M ${cx} 28 C ${cx - 12} 46, ${cx - 10} 64, ${cx} 68 C ${cx + 10} 64, ${cx + 12} 46, ${cx} 28 Z`}
                fill="#ff9f1c"
                className="candle-flame-outer"
              />
              {/* Inner Flame */}
              <path
                d={`M ${cx} 38 C ${cx - 6} 49, ${cx - 5} 61, ${cx} 65 C ${cx + 5} 61, ${cx + 6} 49, ${cx} 38 Z`}
                fill="#fff3b0"
                className="candle-flame-inner"
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
