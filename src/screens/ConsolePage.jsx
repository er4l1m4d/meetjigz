import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePortfolioData } from '../hooks/usePortfolioData.js'
import { useToast } from '../context/ToastContext.jsx'
import TopBar from '../components/TopBar.jsx'
import styles from './ConsolePage.module.css'

const ENTRY_FIELDS = {
  about: ['bio', 'skills', 'tools', 'hobbies'],
  build: ['description', 'tags', 'href', 'status', 'graphic'],
  design: ['brief', 'images', 'tools', 'caseStudy'],
}

function TextInput({ label, value, onChange, multiline }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      {multiline ? (
        <textarea className={styles.input} value={value} onChange={(e) => onChange(e.target.value)} rows={3} />
      ) : (
        <input className={styles.input} type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  )
}

function HeroForm({ hero, onSave }) {
  const [form, setForm] = useState({ ...hero })
  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }))

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>$ hero --edit</h2>
      <div className={styles.form}>
        <TextInput label="eyebrow" value={form.eyebrow} onChange={set('eyebrow')} />
        <TextInput label="headline" value={form.headline} onChange={set('headline')} />
        <TextInput label="highlight" value={form.highlight} onChange={set('highlight')} />
        <TextInput label="support" value={form.support} onChange={set('support')} multiline />
        <button type="button" className={styles.saveBtn} onClick={() => onSave(form)}>
          save
        </button>
      </div>
    </section>
  )
}

function ContactForm({ contact, onSave }) {
  const [form, setForm] = useState({
    ...contact,
    socials: contact.socials.map((s) => ({ ...s })),
  })
  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }))

  const updateSocial = (index, key, val) => {
    setForm((prev) => {
      const socials = prev.socials.map((s, i) => (i === index ? { ...s, [key]: val } : s))
      return { ...prev, socials }
    })
  }

  const addSocial = () => {
    setForm((prev) => ({
      ...prev,
      socials: [...prev.socials, { id: '', label: '', href: '' }],
    }))
  }

  const removeSocial = (index) => {
    setForm((prev) => ({
      ...prev,
      socials: prev.socials.filter((_, i) => i !== index),
    }))
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>$ contact --edit</h2>
      <div className={styles.form}>
        <TextInput label="name" value={form.name} onChange={set('name')} />
        <TextInput label="role" value={form.role} onChange={set('role')} />
        <TextInput label="email" value={form.email} onChange={set('email')} />

        <div className={styles.subsection}>
          <span className={styles.label}>socials</span>
          {form.socials.map((social, i) => (
            <div key={i} className={styles.socialRow}>
              <input
                className={styles.input}
                type="text"
                placeholder="id"
                value={social.id}
                onChange={(e) => updateSocial(i, 'id', e.target.value)}
              />
              <input
                className={styles.input}
                type="text"
                placeholder="label"
                value={social.label}
                onChange={(e) => updateSocial(i, 'label', e.target.value)}
              />
              <input
                className={styles.input}
                type="text"
                placeholder="href"
                value={social.href}
                onChange={(e) => updateSocial(i, 'href', e.target.value)}
              />
              <button type="button" className={styles.removeBtn} onClick={() => removeSocial(i)}>
                ×
              </button>
            </div>
          ))}
          <button type="button" className={styles.addBtn} onClick={addSocial}>
            + add social
          </button>
        </div>

        <button type="button" className={styles.saveBtn} onClick={() => onSave(form)}>
          save
        </button>
      </div>
    </section>
  )
}

function EntryForm({ entry, onSave, onCancel }) {
  const [form, setForm] = useState(() => {
    if (entry) return { ...entry, tags: entry.tags?.join(', ') || '', skills: entry.skills?.join(', ') || '', tools: entry.tools?.join(', ') || '' }
    return { kind: 'build', title: '', status: 'in-progress', description: '', tags: '', href: '', graphic: '', brief: '', images: [], skills: '', tools: '', bio: '', hobbies: '', caseStudy: null }
  })
  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }))

  const handleSave = () => {
    const parsed = {
      ...form,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      skills: form.skills ? form.skills.split(',').map((t) => t.trim()).filter(Boolean) : [],
      tools: form.tools ? form.tools.split(',').map((t) => t.trim()).filter(Boolean) : [],
    }
    if (!parsed.graphic) parsed.graphic = null
    if (!parsed.caseStudy) parsed.caseStudy = null
    onSave(parsed)
  }

  const fields = ENTRY_FIELDS[form.kind] || []

  return (
    <div className={styles.entryForm}>
      <div className={styles.formRow}>
        <label className={styles.field}>
          <span className={styles.label}>kind</span>
          <select className={styles.select} value={form.kind} onChange={(e) => set('kind')(e.target.value)}>
            <option value="about">about</option>
            <option value="build">build</option>
            <option value="design">design</option>
          </select>
        </label>
        <TextInput label="title" value={form.title} onChange={set('title')} />
      </div>

      {form.kind === 'about' && (
        <>
          <TextInput label="bio" value={form.bio} onChange={set('bio')} multiline />
          <TextInput label="skills (comma-separated)" value={form.skills} onChange={set('skills')} />
          <TextInput label="tools (comma-separated)" value={form.tools} onChange={set('tools')} />
          <TextInput label="hobbies" value={form.hobbies} onChange={set('hobbies')} />
        </>
      )}

      {form.kind === 'build' && (
        <>
          <TextInput label="description" value={form.description} onChange={set('description')} multiline />
          <TextInput label="tags (comma-separated)" value={form.tags} onChange={set('tags')} />
          <TextInput label="href" value={form.href} onChange={set('href')} />
          <div className={styles.formRow}>
            <label className={styles.field}>
              <span className={styles.label}>status</span>
              <select className={styles.select} value={form.status} onChange={(e) => set('status')(e.target.value)}>
                <option value="live">live</option>
                <option value="in-progress">in-progress</option>
                <option value="shadow">shadow</option>
              </select>
            </label>
            <label className={styles.field}>
              <span className={styles.label}>graphic</span>
              <select className={styles.select} value={form.graphic || ''} onChange={(e) => set('graphic')(e.target.value || null)}>
                <option value="">none</option>
                <option value="ciphra-chip">ciphra-chip</option>
                <option value="verge-gate">verge-gate</option>
              </select>
            </label>
          </div>
        </>
      )}

      {form.kind === 'design' && (
        <>
          <TextInput label="brief" value={form.brief} onChange={set('brief')} multiline />
          <TextInput label="tools (comma-separated)" value={form.tools} onChange={set('tools')} />
        </>
      )}

      <div className={styles.formActions}>
        <button type="button" className={styles.saveBtn} onClick={handleSave}>
          {entry ? 'update' : 'create'}
        </button>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          cancel
        </button>
      </div>
    </div>
  )
}

function EntryItem({ entry, onEdit, onDelete }) {
  return (
    <div className={styles.entryItem}>
      <div className={styles.entryInfo}>
        <span className={styles.entryKind}>{entry.kind}</span>
        <span className={styles.entryTitle}>{entry.title}</span>
      </div>
      <div className={styles.entryActions}>
        <button type="button" className={styles.actionBtn} onClick={() => onEdit(entry)}>
          edit
        </button>
        <button type="button" className={styles.actionBtnDanger} onClick={() => onDelete(entry)}>
          delete
        </button>
      </div>
    </div>
  )
}

function ConsolePage() {
  const { hero, contact, featuredEntries, archiveEntries, setHero, setContact, addEntry, updateEntry, deleteEntry } = usePortfolioData()
  const { showToast } = useToast()
  const [editingEntry, setEditingEntry] = useState(null)
  const [showNewForm, setShowNewForm] = useState(false)

  const allEntries = [...featuredEntries, ...archiveEntries]

  const handleDeleteEntry = (entry) => {
    deleteEntry(entry.id)
    showToast(`deleted "${entry.title}"`, {
      onUndo: () => {
        if (featuredEntries.some((e) => e.id === entry.id)) {
          addEntry(entry, 'featured')
        } else {
          addEntry(entry, 'archive')
        }
      },
    })
  }

  const handleSaveEntry = (form) => {
    if (editingEntry) {
      updateEntry(editingEntry.id, form)
      showToast(`updated "${form.title}"`)
    } else {
      addEntry(form, 'featured')
      showToast(`created "${form.title}"`)
    }
    setEditingEntry(null)
    setShowNewForm(false)
  }

  return (
    <>
      <TopBar />
      <main className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>console</h1>
          <p className={styles.subtitle}>manage your portfolio content</p>
        </header>

        <HeroForm hero={hero} onSave={setHero} />

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>$ entries --list</h2>

          {allEntries.map((entry) => (
            <EntryItem
              key={entry.id}
              entry={entry}
              onEdit={setEditingEntry}
              onDelete={handleDeleteEntry}
            />
          ))}

          {(showNewForm || editingEntry) && (
            <EntryForm
              entry={editingEntry}
              onSave={handleSaveEntry}
              onCancel={() => { setEditingEntry(null); setShowNewForm(false) }}
            />
          )}

          {!showNewForm && !editingEntry && (
            <button type="button" className={styles.addEntryBtn} onClick={() => setShowNewForm(true)}>
              + new entry
            </button>
          )}
        </section>

        <ContactForm contact={contact} onSave={setContact} />

        <footer className={styles.footer}>
          <Link to="/" className={styles.backLink}>← back to main</Link>
        </footer>
      </main>
    </>
  )
}

export default ConsolePage
