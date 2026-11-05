import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AirplaneTilt, ArrowUpRight, Tag } from '@phosphor-icons/react'
import { hasRealCaseStudy } from '../lib/caseStudy.js'
import { externalHrefOf } from '../lib/externalHref.js'
import DotMatrixVisual from './DotMatrixVisual.jsx'
import Lightbox from './Lightbox.jsx'
import styles from './SelectedWorkCard.module.css'

function isRealSrc(src) {
  return Boolean(src && !src.includes('placeholder'))
}

function resolveMedia(entry) {
  if (entry.kind === 'design') {
    const shot = entry.images?.find((img) => isRealSrc(img.src))
    if (shot) return { src: shot.src, alt: shot.alt, zoomable: true }
  }
  if (isRealSrc(entry.thumbnail?.src)) {
    return { src: entry.thumbnail.src, alt: entry.thumbnail.alt, zoomable: false }
  }
  return null
}

function SelectedWorkCard({ entry }) {
  const [lightbox, setLightbox] = useState(null)

  const media = resolveMedia(entry)
  const hasCaseStudy = hasRealCaseStudy(entry)
  const externalHref = externalHrefOf(entry)
  const isBuild = entry.kind === 'build'
  const liveHref = isBuild && externalHref ? externalHref : null
  const caseStudyTo = hasCaseStudy ? `/project/${entry.id}` : null

  const description = entry.kind === 'design' ? entry.brief : entry.description

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.media}>
          {liveHref ? (
            <a
              href={liveHref}
              className={styles.mediaLink}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Open live site for ${entry.title}`}
            >
              {media ? (
                <img
                  className={styles.image}
                  src={media.src}
                  alt={media.alt || entry.title}
                  loading="lazy"
                />
              ) : (
                <div className={styles.visual} aria-hidden="true">
                  <DotMatrixVisual seedString={entry.id} accentIndex={0} />
                </div>
              )}
            </a>
          ) : media ? (
            <img
              className={styles.image}
              src={media.src}
              alt={media.alt || entry.title}
              loading="lazy"
            />
          ) : (
            <div className={styles.visual} aria-hidden="true">
              <DotMatrixVisual seedString={entry.id} accentIndex={0} />
            </div>
          )}
          {media?.zoomable && (
            <button
              type="button"
              className={styles.zoomHit}
              onClick={() => setLightbox({ src: media.src, alt: media.alt })}
              aria-label={`View full image: ${media.alt || entry.title}`}
            />
          )}
        </div>

        <div className={styles.body}>
          <h3 className={styles.title}>{entry.title}</h3>
          {entry.kind && (
            <p className={styles.subtitle}>{entry.kind}</p>
          )}
          {description && (
            <p className={styles.description}>{description}</p>
          )}

          {(entry.year || entry.client) && (
            <div className={styles.meta}>
              {entry.year && (
                <span className={styles.metaItem}>
                  <Tag className={styles.metaIcon} aria-hidden="true" />
                  {entry.year}
                </span>
              )}
              {entry.client && (
                <span className={styles.metaItem}>
                  <AirplaneTilt className={styles.metaIcon} aria-hidden="true" />
                  {entry.client}
                </span>
              )}
            </div>
          )}

          {caseStudyTo && (
            <div className={styles.actions}>
              <Link to={caseStudyTo} className={styles.ctaPill}>
                Case study
                <ArrowUpRight className={styles.ctaArrow} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  )
}

export default SelectedWorkCard
