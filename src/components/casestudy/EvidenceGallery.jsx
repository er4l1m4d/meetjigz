import { useState } from 'react'
import Reveal from '../animations/Reveal'
import { staggerContainer, staggerItem } from '../animations/variants'
import Lightbox from '../Lightbox'
import styles from './EvidenceGallery.module.css'

function EvidenceGallery({ evidence }) {
  const [lightbox, setLightbox] = useState(null)

  if (!evidence?.length) return null

  return (
    <Reveal variant={staggerContainer}>
      <div className={styles.gallery}>
        {evidence.map((item, i) => (
          <Reveal key={i} variants={staggerItem}>
            <figure className={styles.item}>
              <button
                className={styles.imageButton}
                onClick={() => setLightbox(item)}
                aria-label={`View: ${item.alt}`}
              >
                <img src={item.src} alt={item.alt} className={styles.image} loading="lazy" />
              </button>
              {item.caption && (
                <figcaption className={styles.caption}>{item.caption}</figcaption>
              )}
            </figure>
          </Reveal>
        ))}
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </Reveal>
  )
}

export default EvidenceGallery
