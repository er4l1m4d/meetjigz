import { useState } from 'react'
import { useToast } from '../../context/ToastContext.jsx'
import { usePortfolioData } from '../../hooks/usePortfolioData.js'
import Reveal from '../animations/Reveal.jsx'
import { fadeUp } from '../animations/variants.js'
import styles from './ContactSection.module.css'

const DEFAULT_INTEREST_TAGS = ['UI/UX design', 'Website', 'Branding', 'Design system', 'Other']

function ContactSection() {
  const { showToast } = useToast()
  const { settings } = usePortfolioData()

  const contactConfig = settings?.contactForm || {}
  const headline = contactConfig.headline || 'Have a project?'
  const subhead = contactConfig.subhead || 'We would love to help.'
  const formTitle = contactConfig.title || 'Start a project'
  const formSubtitle = contactConfig.subtitle || "Fill in the form below and I'll be in touch within 24 hours."
  const eyebrow = contactConfig.eyebrow || '// Contact'
  const interestTags = contactConfig.interestTags || DEFAULT_INTEREST_TAGS

  const [formData, setFormData] = useState({
    interest: '',
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTagClick = (interest) => {
    setFormData((prev) => ({ ...prev, interest }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.interest || !formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all fields.', { duration: 3000 })
      return
    }

    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(formData.email)) {
      showToast('Please enter a valid email address.', { duration: 3000 })
      return
    }

    setIsSubmitting(true)

    const submission = {
      interest: formData.interest,
      name: formData.name,
      email: formData.email,
      message: formData.message,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      })

      if (!res.ok) throw new Error('Failed to send')

      if (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY) {
        const web3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
            name: formData.name,
            email: formData.email,
            interest: formData.interest,
            message: formData.message,
          }),
        })
        if (!web3Res.ok) throw new Error('Failed to send')
      }

      setFormData({ interest: '', name: '', email: '', message: '' })
      showToast('Message sent! I\'ll get back to you soon.', { duration: 4000 })
    } catch {
      showToast('Something went wrong. Please try again.', { duration: 4000 })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div>
            <Reveal variant={fadeUp}>
              <p className={styles.eyebrow}>{eyebrow}</p>
            </Reveal>
            <Reveal variant={fadeUp} transition={{ delay: 0.06 }}>
              <h2 className={styles.headline}>
                {headline}
                <br />
                We would love to help.
              </h2>
            </Reveal>
            <Reveal variant={fadeUp} transition={{ delay: 0.12 }}>
              <p className={styles.subhead}>
                {subhead}
              </p>
            </Reveal>
          </div>
        </div>
        <div className={styles.right}>
          <h3 className={styles.formTitle}>{formTitle}</h3>
          <p className={styles.formSubtitle}>{formSubtitle}</p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <p className={styles.label}>I'm interested in...</p>
            <div className={styles.tags}>
              {interestTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`${styles.tag} ${formData.interest === tag ? styles.active : ''}`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                type="text"
                className={styles.input}
                placeholder="Jane Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">Your email</label>
              <input
                id="email"
                name="email"
                type="email"
                className={styles.input}
                placeholder="jane@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="message">Tell us about your project</label>
              <textarea
                id="message"
                name="message"
                className={styles.textarea}
                placeholder="What are you looking for? Any timeline or budget constraints?"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send request'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection