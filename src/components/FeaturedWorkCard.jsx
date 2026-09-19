import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { hasRealCaseStudy } from '../lib/caseStudy.js'
import ProjectVisual from './ProjectVisual.jsx'
import Lightbox from './Lightbox.jsx'
import {
  CutoutCard,
  CutoutCardAction,
  CutoutCardContent,
  CutoutCardFooter,
  CutoutCardImage,
  CutoutCardInsetLabel,
  CutoutCardMedia,
  CutoutCardOverlay,
  CutoutCardPin,
  CutoutCardVisual,
  CutoutCorner,
} from './ui/CutoutCard.jsx'
import {
  cutoutCardSurfaceClassName,
  useCutoutContentStaggerVariants,
} from './ui/cutoutCardBits.js'
import styles from './FeaturedWorkCard.module.css'
import ui from './ui/CutoutCard.module.css'

function isRealSrc(src) {
  return Boolean(src && !src.includes('placeholder'))
}

// Media priority: a real design shot (clickable, opens lightbox) > real
// thumbnail > ProjectVisual fallback.
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

function FeaturedWorkCard({ entry }) {
  const stagger = useCutoutContentStaggerVariants()
  const [lightbox, setLightbox] = useState(null)

  const media = resolveMedia(entry)
  const hasCaseStudy = hasRealCaseStudy(entry)
  const hasExternal = entry.href && entry.href !== '#'
  const cta = hasCaseStudy
    ? { label: 'Read case study', to: `/project/${entry.id}`, internal: true }
    : hasExternal
      ? { label: 'View project', href: entry.href, internal: false }
      : null

  const description = entry.kind === 'design' ? entry.brief : entry.description
  const chips = entry.kind === 'design' ? entry.tools : entry.tags
  const metaItems = [entry.year, entry.client, entry.duration].filter(Boolean)

  const ctaInner = cta ? (
    <>
      {cta.label}
      <span aria-hidden="true">&rarr;</span>
    </>
  ) : null

  return (
    <div className={styles.root}>
      <CutoutCard className={cutoutCardSurfaceClassName}>
        <CutoutCardMedia className={styles.media}>
          <CutoutCardImage
            alt={media?.alt || entry.title}
            src={media?.src || null}
            fallback={
              <CutoutCardVisual>
                <ProjectVisual entry={entry} />
              </CutoutCardVisual>
            }
          />
          {media?.zoomable && (
            <button
              type="button"
              className={styles.zoomHit}
              onClick={() => setLightbox({ src: media.src, alt: media.alt })}
              aria-label={`View full image: ${media.alt || entry.title}`}
            />
          )}
          <CutoutCardOverlay />

          <CutoutCardInsetLabel>
            <span className={styles.insetLabelText}>{entry.kind}</span>
            <CutoutCorner className={styles.labelCorner} style={{ right: -31, bottom: -1 }} />
            <CutoutCorner className={styles.labelCorner} style={{ top: -31, left: -1 }} />
          </CutoutCardInsetLabel>

          {entry.status && (
            <CutoutCardPin>
              {entry.status.replace('-', ' ')}
              <CutoutCorner
                className={styles.pinCorner}
                size={24}
                angle={180}
                style={{ top: -1, left: -23 }}
              />
              <CutoutCorner
                className={styles.pinCorner}
                size={24}
                angle={180}
                style={{ right: -1, bottom: -23 }}
              />
            </CutoutCardPin>
          )}
        </CutoutCardMedia>

        <CutoutCardContent>
          <motion.div
            className={styles.stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={stagger.container}
          >
            <motion.h3 className={styles.title} variants={stagger.item}>
              {entry.title}
            </motion.h3>
            {description && (
              <motion.p className={styles.description} variants={stagger.item}>
                {description}
              </motion.p>
            )}
            {chips?.length > 0 && (
              <motion.div className={ui.tags} variants={stagger.item}>
                {chips.map((chip) => (
                  <span key={chip} className={ui.tag}>
                    {chip}
                  </span>
                ))}
              </motion.div>
            )}
            <motion.div variants={stagger.item}>
              <CutoutCardFooter>
                <span className={styles.metaGroup}>
                  <span className={ui.avatar} aria-hidden="true" />
                  <span className={ui.meta}>
                    {metaItems.map((item, i) => (
                      <span key={item} className={styles.metaItem}>
                        {i > 0 && <span className={ui.metaDot} aria-hidden="true" />}
                        {item}
                      </span>
                    ))}
                  </span>
                </span>
                {cta && (
                  <CutoutCardAction inline className={styles.action}>
                    {cta.internal ? (
                      <Link to={cta.to} className={ui.ctaPill}>
                        {ctaInner}
                      </Link>
                    ) : (
                      <a href={cta.href} className={ui.ctaPill} target="_blank" rel="noreferrer noopener">
                        {ctaInner}
                      </a>
                    )}
                  </CutoutCardAction>
                )}
              </CutoutCardFooter>
            </motion.div>
          </motion.div>
        </CutoutCardContent>
      </CutoutCard>

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

export default FeaturedWorkCard
