import { usePortfolioData } from '../hooks/usePortfolioData.js'
import HeroSection from '../components/sections/HeroSection.jsx'
import AboutSection from '../components/sections/AboutSection.jsx'
import SkillsSection from '../components/sections/SkillsSection.jsx'
import ContactSection from '../components/sections/ContactSection.jsx'
import SelectedWorksMarquee from '../components/SelectedWorksMarquee.jsx'
import Footer from '../components/Footer.jsx'
import TopBar from '../components/TopBar.jsx'
import Reveal from '../components/animations/Reveal.jsx'
import { fadeUp } from '../components/animations/variants.js'
import styles from './DesktopScreen.module.css'

function DesktopScreen() {
  const { featuredEntries, hero, about, skills, settings } = usePortfolioData()
  const entries = featuredEntries.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  const worksHeading = settings?.works?.heading || 'Selected Work'
  const worksSubtext = settings?.works?.subtext || 'Products and identities shaped from first idea to final interface.'
  const worksEyebrow = settings?.works?.eyebrow || '// Works'

  return (
    <>
      <div className={styles.heroScope}>
        <TopBar navLinks={settings?.navLinks} />
        <HeroSection hero={hero} />
      </div>
      <AboutSection about={about} />
      <main className={styles.page}>
        <SkillsSection skills={skills} />
        <section id="works" className={styles.works}>
          <div className={styles.worksInner}>
            <Reveal variant={fadeUp}>
              <p className={styles.worksEyebrow}>{worksEyebrow}</p>
            </Reveal>
            <div className={styles.worksIntro}>
            <Reveal variant={fadeUp} transition={{ delay: 0.06 }}>
              <h2>{worksHeading}</h2>
            </Reveal>
            <Reveal variant={fadeUp} transition={{ delay: 0.12 }}>
              <span>{worksSubtext}</span>
            </Reveal>
            {hero.currentBuild?.project && (
              <p className={styles.buildNote}>
                {hero.currentBuild.text || 'Currently building'} <strong>{hero.currentBuild.project}</strong>
                {hero.currentBuild.description ? `, ${hero.currentBuild.description}` : ''}
              </p>
            )}
          </div>

          {entries.length > 0 && (
            <div className={styles.worksMarquee}>
              <SelectedWorksMarquee entries={entries} />
            </div>
          )}
          </div>
        </section>
      </main>
      <ContactSection />
      <Footer />
    </>
  )
}

export default DesktopScreen
