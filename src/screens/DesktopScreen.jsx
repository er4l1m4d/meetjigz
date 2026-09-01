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
      <HeroSection hero={hero} projects={featuredEntries} />
      <main className={styles.page}>
        <div className={styles.skillStrip} aria-label="Core capabilities">
          {skills.categories.flatMap((category) => category.items).slice(0, 8).map((skill) => (
            <span key={skill.name}>{skill.name}</span>
          ))}
        </div>

        <section id="works" className={styles.works}>
          {featuredEntries.length > 0 && (
            <div className={styles.worksHeading}>
              <p>Portfolio</p>
              <h2>Selected Work</h2>
              <span>Products and identities shaped from first idea to final interface.</span>
            </div>
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
        </section>
        <SkillsSection skills={skills} />
        <AboutSection about={about} />
      </main>
      <ContactSection contact={contact} />
      <Footer />
    </>
  )
}

export default DesktopScreen
