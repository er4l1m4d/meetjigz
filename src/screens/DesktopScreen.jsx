import { usePortfolioData } from '../hooks/usePortfolioData.js'
import AboutSection from '../components/sections/AboutSection.jsx'
import ContactSection from '../components/sections/ContactSection.jsx'
import HeroSection from '../components/sections/HeroSection.jsx'
import ProjectSection from '../components/sections/ProjectSection.jsx'
import Footer from '../components/Footer.jsx'
import TopBar from '../components/TopBar.jsx'
import styles from './DesktopScreen.module.css'

function DesktopScreen() {
  const { featuredEntries, contact } = usePortfolioData()

  const aboutEntry = featuredEntries.find((e) => e.kind === 'about')
  const projectEntries = featuredEntries.filter((e) => e.kind === 'build')

  return (
    <>
      <TopBar />
      <main className={styles.page}>
        <HeroSection />
        <ProjectSection projects={projectEntries} />
        {aboutEntry && <AboutSection about={aboutEntry} />}
        <ContactSection contact={contact} />
      </main>
      <Footer contact={contact} />
    </>
  )
}

export default DesktopScreen
