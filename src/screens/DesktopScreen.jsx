import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Code,
  FileTs,
  Database,
  FigmaLogo,
  CirclesThree,
  Layout,
  Monitor,
  GitBranch,
  Triangle,
  ArrowsOutSimple,
  Notepad,
} from '@phosphor-icons/react'
import { usePortfolioData } from '../hooks/usePortfolioData.js'
import { DEFAULT_HERO } from '../data/defaults.js'
import { staggerContainer, staggerItem } from '../components/animations/variants.js'
import Entry from '../components/Entry.jsx'
import Lightbox from '../components/Lightbox.jsx'
import CiphraChip from '../components/graphics/CiphraChip.jsx'
import VergeGate from '../components/graphics/VergeGate.jsx'
import HeroSection from '../components/sections/HeroSection.jsx'
import ContactSection from '../components/sections/ContactSection.jsx'
import Footer from '../components/Footer.jsx'
import TopBar from '../components/TopBar.jsx'
import styles from './DesktopScreen.module.css'

const SKILL_ICONS = {
  'React': Code,
  'TypeScript': FileTs,
  'Node.js': Database,
  'Figma': FigmaLogo,
  'Motion Design': CirclesThree,
  'System Design': Layout,
}

const TOOL_ICONS = {
  'VS Code': Monitor,
  'Figma': FigmaLogo,
  'Git': GitBranch,
  'Vercel': Triangle,
  'Linear': ArrowsOutSimple,
  'Notion': Notepad,
}

function SeeMore({ children }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={styles.seeMore}>
      <div className={`${styles.seeMoreContent} ${expanded ? styles.expanded : ''}`}>
        <div className={styles.seeMoreInner}>
          {children}
        </div>
      </div>
      <button
        type="button"
        className={styles.seeMoreBtn}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'see less' : 'see more'}
      </button>
    </div>
  )
}

function AboutContent({ entry }) {
  return (
    <>
      <p className={styles.bio}>{entry.bio}</p>

      <div className={styles.tagGroup}>
        <span className={styles.tagLabel}>Skills</span>
        <div className={styles.tags}>
          {entry.skills.map((skill) => {
            const Icon = SKILL_ICONS[skill]
            return (
              <span key={skill} className={styles.tag}>
                {Icon && <Icon size={14} weight="light" />}
                {skill}
              </span>
            )
          })}
        </div>
      </div>

      <div className={styles.tagGroup}>
        <span className={styles.tagLabel}>Tools</span>
        <div className={styles.tags}>
          {entry.tools.map((tool) => {
            const Icon = TOOL_ICONS[tool]
            return (
              <span key={tool} className={styles.tag}>
                {Icon && <Icon size={14} weight="light" />}
                {tool}
              </span>
            )
          })}
        </div>
      </div>

      {entry.hobbies && (
        <p className={styles.hobbies}>{entry.hobbies}</p>
      )}
    </>
  )
}

const GRAPHICS = {
  'ciphra-chip': CiphraChip,
  'verge-gate': VergeGate,
}

function BuildContent({ entry }) {
  const Graphic = entry.graphic ? GRAPHICS[entry.graphic] : null

  return (
    <>
      <SeeMore>
        <p className={styles.description}>{entry.description}</p>
      </SeeMore>

      {Graphic && <Graphic />}

      <div className={styles.tagGroup}>
        <div className={styles.tags}>
          {entry.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>

      {entry.href && entry.href !== '#' && (
        <a href={entry.href} className={styles.projectLink} target="_blank" rel="noreferrer noopener">
          View project →
        </a>
      )}
    </>
  )
}

function DesignContent({ entry }) {
  const [lightbox, setLightbox] = useState(null)

  return (
    <>
      <SeeMore>
        <p className={styles.description}>{entry.brief}</p>
      </SeeMore>

      {entry.images && entry.images.length > 0 && (
        <div className={styles.imageGrid}>
          {entry.images.map((img, i) => (
            <button
              key={i}
              className={styles.imageButton}
              onClick={() => setLightbox(img)}
              aria-label={`View: ${img.alt}`}
            >
              <img src={img.src} alt={img.alt} className={styles.image} loading="lazy" />
            </button>
          ))}
        </div>
      )}

      <div className={styles.tagGroup}>
        <div className={styles.tags}>
          {entry.tools.map((tool) => (
            <span key={tool} className={styles.tag}>{tool}</span>
          ))}
        </div>
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  )
}

function DesktopScreen() {
  const { featuredEntries, contact } = usePortfolioData()
  const [aboutId, ...worksEntries] = featuredEntries

  return (
    <>
      <TopBar />
      <main className={styles.page}>
        <HeroSection
          eyebrow={DEFAULT_HERO.eyebrow}
          headline={DEFAULT_HERO.headline}
          highlight={DEFAULT_HERO.highlight}
          support={DEFAULT_HERO.support}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {aboutId && (
            <motion.div key={aboutId.id} variants={staggerItem} id="about">
              <Entry index={0} title={aboutId.title} kind="about">
                <AboutContent entry={aboutId} />
              </Entry>
            </motion.div>
          )}

          <div id="works">
            {worksEntries.map((entry, i) => {
              const index = i + 1

              if (entry.kind === 'build') {
                return (
                  <motion.div key={entry.id} variants={staggerItem}>
                    <Entry index={index} title={entry.title} status={entry.status} kind="build">
                      <BuildContent entry={entry} />
                    </Entry>
                  </motion.div>
                )
              }

              if (entry.kind === 'design') {
                return (
                  <motion.div key={entry.id} variants={staggerItem}>
                    <Entry index={index} title={entry.title} kind="design">
                      <DesignContent entry={entry} />
                    </Entry>
                  </motion.div>
                )
              }

              return null
            })}
          </div>
        </motion.div>
      </main>
      <ContactSection contact={contact} />
      <Footer />
    </>
  )
}

export default DesktopScreen
