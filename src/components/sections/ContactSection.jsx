import styles from './ContactSection.module.css'

function ContactSection({ contact }) {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.orb} aria-hidden="true"><span /><span /><span /></div>
        <h2 className={styles.headline}>
          Let&apos;s Build Something<br />That Performs.
        </h2>
        <p className={styles.subhead}>Tell me about your product, interface, or identity. I&apos;ll bring design thinking and production code to the same table.</p>
        <div className={styles.actions}>
          <a href={`mailto:${contact.email}`} className={styles.primary}>Start a project</a>
          {contact.socials.slice(0, 2).map((social) => (
            <a key={social.id} href={social.href} className={styles.secondary} target="_blank" rel="noreferrer noopener">{social.label}</a>
          ))}
        </div>
        <div className={styles.contactLine}><span>{contact.name}</span><span>{contact.role}</span><a href={`mailto:${contact.email}`}>{contact.email}</a></div>
      </div>
    </section>
  )
}

export default ContactSection
