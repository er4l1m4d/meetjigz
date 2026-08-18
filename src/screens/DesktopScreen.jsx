import { motion } from 'framer-motion'
import { usePortfolioData } from '../hooks/usePortfolioData.js'
import { staggerContainer } from '../components/animations/variants.js'
import HeroSection from '../components/sections/HeroSection.jsx'
import AboutSection from '../components/sections/AboutSection.jsx'
import SkillsSection from '../components/sections/SkillsSection.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import ContactSection from '../components/sections/ContactSection.jsx'
import Footer from '../components/Footer.jsx'
import TopBar from '../components/TopBar.jsx'
import styles from './DesktopScreen.module.css'

function DesktopScreen() {
  const { featuredEntries, contact, hero, about, skills } = usePortfolioData()

  return (
    <>
      <TopBar />
      <main className={styles.page}>
        <HeroSection hero={hero} />
        <AboutSection about={about} />
        <SkillsSection skills={skills} />

        <div id="works">
          {featuredEntries.length > 0 && (
            <h2 className={styles.sectionHeader}>featured works</h2>
          )}

          <motion.div
            className={styles.worksGrid}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {featuredEntries
              .slice()
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
              .map((entry, i) => (
                <ProjectCard key={entry.id} entry={entry} index={i + 1} />
              ))}
          </motion.div>
        </div>
      </main>
      <div id="contact">
        <ContactSection contact={contact} />
      </div>
      <Footer />
    </>
  )
}

export default DesktopScreen
