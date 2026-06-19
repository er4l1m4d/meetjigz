import { usePortfolioData } from '../hooks/usePortfolioData.js'
import AboutSection from '../components/sections/AboutSection.jsx'
import ContactSection from '../components/sections/ContactSection.jsx'
import HeroSection from '../components/sections/HeroSection.jsx'
import ProjectSection from '../components/sections/ProjectSection.jsx'
import Footer from '../components/Footer.jsx'
import TopBar from '../components/TopBar.jsx'
import styles from './DesktopScreen.module.css'

function DesktopScreen() {
  const { projects, about, contact } = usePortfolioData()

  return (
    <>
      <TopBar />
      <main className={styles.page}>
        <HeroSection />
        <ProjectSection projects={projects} />
        <AboutSection about={about} />
        <ContactSection contact={contact} />
      </main>
      <Footer contact={contact} />
    </>
  )
}

export default DesktopScreen
