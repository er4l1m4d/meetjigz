import { usePortfolioData } from '../hooks/usePortfolioData.js'
import AboutSection from '../components/sections/AboutSection.jsx'
import ContactSection from '../components/sections/ContactSection.jsx'
import HeroSection from '../components/sections/HeroSection.jsx'
import ProjectSection from '../components/sections/ProjectSection.jsx'
import TopBar from '../components/TopBar.jsx'
import styles from './DesktopScreen.module.css'

function DesktopScreen() {
  const { projects, about, contact } = usePortfolioData()

  return (
    <div className={styles.page}>
      <TopBar />
      <HeroSection />
      <ProjectSection projects={projects} />
      <AboutSection about={about} />
      <ContactSection contact={contact} />
    </div>
  )
}

export default DesktopScreen
