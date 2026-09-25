import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AirplaneTilt, ArrowUpRight, Tag } from '@phosphor-icons/react'
import { hasRealCaseStudy } from '../lib/caseStudy.js'
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
  const hasExternal = entry.href && entry.href !== '#'
  const cta = hasExternal
    ? { label: 'Live site', href: entry.href, internal: false }
    : hasCaseStudy
      ? { label: 'Case study', to: `/project/${entry.id}`, internal: true }
      : null

  const description = entry.kind === 'design' ? entry.brief : entry.description
  const caseStudyCta = hasCaseStudy && hasExternal
    ? { label: 'Case study', to: `/project/${entry.id}`, internal: true }
    : null
  const roundHref = hasExternal ? entry.href : null

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.media}>
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

          {(cta || roundHref || caseStudyCta) && (
            <div className={styles.actions}>
              {cta && (
                cta.internal ? (
                  <Link to={cta.to} className={styles.ctaPill}>
                    {cta.label}
                    <ArrowUpRight className={styles.ctaArrow} aria-hidden="true" />
                  </Link>
                ) : (
                  <a
                    href={cta.href}
                    className={styles.ctaPill}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {cta.label}
                    <ArrowUpRight className={styles.ctaArrow} aria-hidden="true" />
                  </a>
                )
              )}
              {caseStudyCta && (
                <Link to={caseStudyCta.to} className={styles.ctaPill}>
                  {caseStudyCta.label}
                  <ArrowUpRight className={styles.ctaArrow} aria-hidden="true" />
                </Link>
              )}
              {roundHref && (
                <a
                  href={roundHref}
                  className={styles.roundBtn}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Open live site for ${entry.title}`}
                >
                  <ArrowUpRight aria-hidden="true" />
                </a>
              )}
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
