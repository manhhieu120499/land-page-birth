import React, { useEffect, useState } from 'react'
import { birthdayConfig, type CornerPhoto } from '../config/birthdayConfig'

export const CornerPolaroids: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<CornerPhoto | null>(null)

  useEffect(() => {
    if (!selectedPhoto) {
      return
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedPhoto(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedPhoto])

  return (
    <>
      <div
        className="corner-polaroids-layer"
        aria-label="Bộ sưu tập ảnh kỷ niệm 4 góc"
        data-testid="corner-polaroids"
      >
        {birthdayConfig.cornerPhotos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            className={`polaroid-card polaroid-card--${photo.position}`}
            style={
              {
                '--polaroid-rot': `${photo.rotation}deg`,
                '--polaroid-delay': `${0.12 + index * 0.14}s`,
              } as React.CSSProperties
            }
            onClick={() => setSelectedPhoto(photo)}
            title="Bấm để phóng to ảnh kỷ niệm"
            data-testid={`corner-photo-${photo.position}`}
          >
            <span className="polaroid-pin" aria-hidden="true" />
            <div className="polaroid-img-wrap">
              <img
                src={photo.imageUrl}
                alt={photo.caption}
                className="polaroid-img"
              />
              <span className="polaroid-date-tag">{photo.dateTag}</span>
            </div>
            <span className="polaroid-caption">{photo.caption}</span>
          </button>
        ))}
      </div>

      {/* Lightbox when clicking any of the 4 corner mini photos */}
      {selectedPhoto && (
        <div
          className="polaroid-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.caption}
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="polaroid-lightbox-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="polaroid-lightbox-close"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Đóng ảnh phóng to"
              autoFocus
            >
              ✕
            </button>
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.caption}
              className="polaroid-lightbox-img"
            />
            <div className="polaroid-lightbox-meta">
              <span className="polaroid-lightbox-tag">
                {selectedPhoto.dateTag}
              </span>
              <p className="polaroid-lightbox-caption">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
