import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePortfolioData } from '../hooks/usePortfolioData.js'
import { useToast } from '../context/ToastContext.jsx'
import TopBar from '../components/TopBar.jsx'
import styles from './ConsolePage.module.css'

function TextInput({ label, value, onChange, multiline, placeholder }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      {multiline ? (
        <textarea className={styles.input} value={value} onChange={(e) => onChange(e.target.value)} rows={3} placeholder={placeholder} />
      ) : (
        <input className={styles.input} type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      )}
    </label>
  )
}

function HeroForm({ hero, onSave }) {
  const [form, setForm] = useState({
    name: hero.name || '',
    role: hero.role || '',
    tagline: hero.tagline || '',
    ctas: hero.ctas || [],
    currentBuild: hero.currentBuild || { text: '', project: '', description: '' },
  })

  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }))

  const updateCta = (index, key, val) => {
    setForm((prev) => ({
      ...prev,
      ctas: prev.ctas.map((c, i) => (i === index ? { ...c, [key]: val } : c)),
    }))
  }

  const updateBuild = (key, val) => {
    setForm((prev) => ({
      ...prev,
      currentBuild: { ...prev.currentBuild, [key]: val },
    }))
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>$ hero --edit</h2>
      <div className={styles.form}>
        <TextInput label="name" value={form.name} onChange={set('name')} />
        <TextInput label="role" value={form.role} onChange={set('role')} />
        <TextInput label="tagline" value={form.tagline} onChange={set('tagline')} multiline />

        <div className={styles.subsection}>
          <span className={styles.label}>CTAs</span>
          {form.ctas.map((cta, i) => (
            <div key={i} className={styles.socialRow}>
              <input className={styles.input} type="text" placeholder="label" value={cta.label} onChange={(e) => updateCta(i, 'label', e.target.value)} />
              <input className={styles.input} type="text" placeholder="target (element id)" value={cta.target} onChange={(e) => updateCta(i, 'target', e.target.value)} />
            </div>
          ))}
        </div>

        <div className={styles.subsection}>
          <span className={styles.label}>currently building</span>
          <TextInput label="label" value={form.currentBuild.text} onChange={(v) => updateBuild('text', v)} placeholder="Currently building" />
          <TextInput label="project" value={form.currentBuild.project} onChange={(v) => updateBuild('project', v)} />
          <TextInput label="description" value={form.currentBuild.description} onChange={(v) => updateBuild('description', v)} />
        </div>

        <button type="button" className={styles.saveBtn} onClick={() => onSave(form)}>
          save
        </button>
      </div>
    </section>
  )
}

function AboutForm({ about, onSave }) {
  const [form, setForm] = useState({
    bio: about.bio || '',
    interests: about.interests || '',
    availableFor: about.availableFor?.join(', ') || '',
  })

  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }))

  const handleSave = () => {
    onSave({
      ...form,
      availableFor: form.availableFor ? form.availableFor.split(',').map((s) => s.trim()).filter(Boolean) : [],
    })
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>$ about --edit</h2>
      <div className={styles.form}>
        <TextInput label="bio" value={form.bio} onChange={set('bio')} multiline />
        <TextInput label="interests" value={form.interests} onChange={set('interests')} />
        <TextInput label="available for (comma-separated)" value={form.availableFor} onChange={set('availableFor')} placeholder="Full-time roles, Freelance projects" />
        <button type="button" className={styles.saveBtn} onClick={handleSave}>
          save
        </button>
      </div>
    </section>
  )
}

function SkillsForm({ skills, onSave }) {
  const [form, setForm] = useState({
    categories: skills.categories?.map((cat) => ({
      ...cat,
      items: cat.items.map((item) => ({ ...item, projectIds: item.projectIds?.join(', ') || '' })),
    })) || [],
  })

  const updateCategory = (catIndex, key, val) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.map((c, i) => (i === catIndex ? { ...c, [key]: val } : c)),
    }))
  }

  const updateSkill = (catIndex, skillIndex, key, val) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.map((c, i) =>
        i === catIndex
          ? { ...c, items: c.items.map((item, j) => (j === skillIndex ? { ...item, [key]: val } : item)) }
          : c
      ),
    }))
  }

  const addSkill = (catIndex) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.map((c, i) =>
        i === catIndex ? { ...c, items: [...c.items, { name: '', proficiency: 'daily-driver', projectIds: '' }] } : c
      ),
    }))
  }

  const removeSkill = (catIndex, skillIndex) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.map((c, i) =>
        i === catIndex ? { ...c, items: c.items.filter((_, j) => j !== skillIndex) } : c
      ),
    }))
  }

  const addCategory = () => {
    setForm((prev) => ({
      ...prev,
      categories: [...prev.categories, { id: '', label: '', items: [] }],
    }))
  }

  const removeCategory = (catIndex) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== catIndex),
    }))
  }

  const handleSave = () => {
    onSave({
      categories: form.categories.map((cat) => ({
        ...cat,
        items: cat.items.map((item) => ({
          ...item,
          projectIds: item.projectIds ? item.projectIds.split(',').map((s) => s.trim()).filter(Boolean) : [],
        })),
      })),
    })
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>$ skills --edit</h2>
      <div className={styles.form}>
        {form.categories.map((cat, catIndex) => (
          <div key={catIndex} className={styles.categoryBlock}>
            <div className={styles.categoryHeader}>
              <input className={styles.input} type="text" placeholder="category label" value={cat.label} onChange={(e) => updateCategory(catIndex, 'label', e.target.value)} />
              <button type="button" className={styles.removeBtn} onClick={() => removeCategory(catIndex)}>×</button>
            </div>

            {cat.items.map((skill, skillIndex) => (
              <div key={skillIndex} className={styles.skillRow}>
                <input className={styles.input} type="text" placeholder="name" value={skill.name} onChange={(e) => updateSkill(catIndex, skillIndex, 'name', e.target.value)} />
                <select className={styles.select} value={skill.proficiency} onChange={(e) => updateSkill(catIndex, skillIndex, 'proficiency', e.target.value)}>
                  <option value="daily-driver">daily driver</option>
                  <option value="comfortable">comfortable</option>
                  <option value="familiar">familiar</option>
                </select>
                <input className={styles.input} type="text" placeholder="project ids (comma-separated)" value={skill.projectIds} onChange={(e) => updateSkill(catIndex, skillIndex, 'projectIds', e.target.value)} />
                <button type="button" className={styles.removeBtn} onClick={() => removeSkill(catIndex, skillIndex)}>×</button>
              </div>
            ))}

            <button type="button" className={styles.addBtn} onClick={() => addSkill(catIndex)}>
              + add skill
            </button>
          </div>
        ))}

        <button type="button" className={styles.addBtn} onClick={addCategory}>
          + add category
        </button>

        <button type="button" className={styles.saveBtn} onClick={handleSave}>
          save
        </button>
      </div>
    </section>
  )
}

function CaseStudyEditor({ caseStudy, onChange }) {
  const [form, setForm] = useState(() => caseStudy || {
    heroImage: { src: '', alt: '' },
    sections: { context: '', problem: '', role: '', thinking: '', build: '', challenges: '', result: '' },
    evidence: [],
    links: [],
  })

  const setSection = (key, val) => {
    const next = { ...form, sections: { ...form.sections, [key]: val } }
    setForm(next)
    onChange(next)
  }

  const setHeroImage = (key, val) => {
    const next = { ...form, heroImage: { ...form.heroImage, [key]: val } }
    setForm(next)
    onChange(next)
  }

  const addEvidence = () => {
    const next = { ...form, evidence: [...form.evidence, { src: '', alt: '', caption: '' }] }
    setForm(next)
    onChange(next)
  }

  const updateEvidence = (index, key, val) => {
    const next = { ...form, evidence: form.evidence.map((e, i) => (i === index ? { ...e, [key]: val } : e)) }
    setForm(next)
    onChange(next)
  }

  const removeEvidence = (index) => {
    const next = { ...form, evidence: form.evidence.filter((_, i) => i !== index) }
    setForm(next)
    onChange(next)
  }

  const addLink = () => {
    const next = { ...form, links: [...form.links, { label: '', href: '' }] }
    setForm(next)
    onChange(next)
  }

  const updateLink = (index, key, val) => {
    const next = { ...form, links: form.links.map((l, i) => (i === index ? { ...l, [key]: val } : l)) }
    setForm(next)
    onChange(next)
  }

  const removeLink = (index) => {
    const next = { ...form, links: form.links.filter((_, i) => i !== index) }
    setForm(next)
    onChange(next)
  }

  return (
    <div className={styles.caseStudyEditor}>
      <span className={styles.label}>case study</span>

      <div className={styles.formRow}>
        <TextInput label="hero image src" value={form.heroImage.src} onChange={(v) => setHeroImage('src', v)} placeholder="/images/..." />
        <TextInput label="hero image alt" value={form.heroImage.alt} onChange={(v) => setHeroImage('alt', v)} />
      </div>

      {['context', 'problem', 'role', 'thinking', 'build', 'challenges', 'result'].map((key) => (
        <TextInput key={key} label={key} value={form.sections[key] || ''} onChange={(v) => setSection(key, v)} multiline />
      ))}

      <div className={styles.subsection}>
        <span className={styles.label}>evidence</span>
        {form.evidence.map((item, i) => (
          <div key={i} className={styles.skillRow}>
            <input className={styles.input} type="text" placeholder="src" value={item.src} onChange={(e) => updateEvidence(i, 'src', e.target.value)} />
            <input className={styles.input} type="text" placeholder="alt" value={item.alt} onChange={(e) => updateEvidence(i, 'alt', e.target.value)} />
            <input className={styles.input} type="text" placeholder="caption" value={item.caption} onChange={(e) => updateEvidence(i, 'caption', e.target.value)} />
            <button type="button" className={styles.removeBtn} onClick={() => removeEvidence(i)}>×</button>
          </div>
        ))}
        <button type="button" className={styles.addBtn} onClick={addEvidence}>+ add evidence</button>
      </div>

      <div className={styles.subsection}>
        <span className={styles.label}>links</span>
        {form.links.map((link, i) => (
          <div key={i} className={styles.skillRow}>
            <input className={styles.input} type="text" placeholder="label" value={link.label} onChange={(e) => updateLink(i, 'label', e.target.value)} />
            <input className={styles.input} type="text" placeholder="href" value={link.href} onChange={(e) => updateLink(i, 'href', e.target.value)} />
            <button type="button" className={styles.removeBtn} onClick={() => removeLink(i)}>×</button>
          </div>
        ))}
        <button type="button" className={styles.addBtn} onClick={addLink}>+ add link</button>
      </div>
    </div>
  )
}

function EntryForm({ entry, onSave, onCancel }) {
  const [form, setForm] = useState(() => {
    if (entry) {
      return {
        ...entry,
        tags: entry.tags?.join(', ') || '',
        tools: entry.tools?.join(', ') || '',
        thumbnailSrc: entry.thumbnail?.src || '',
        thumbnailAlt: entry.thumbnail?.alt || '',
        hasCaseStudy: entry.caseStudy != null,
        caseStudy: entry.caseStudy || null,
      }
    }
    return {
      kind: 'build',
      title: '',
      status: 'in-progress',
      description: '',
      tags: '',
      href: '',
      graphic: '',
      brief: '',
      tools: '',
      thumbnailSrc: '',
      thumbnailAlt: '',
      year: '',
      client: '',
      duration: '',
      order: '',
      hasCaseStudy: false,
      caseStudy: null,
    }
  })

  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }))

  const handleSave = () => {
    const parsed = {
      ...form,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      tools: form.tools ? form.tools.split(',').map((t) => t.trim()).filter(Boolean) : [],
      thumbnail: form.thumbnailSrc ? { src: form.thumbnailSrc, alt: form.thumbnailAlt } : undefined,
      year: form.year || undefined,
      client: form.client || undefined,
      duration: form.duration || undefined,
      order: form.order ? parseInt(form.order, 10) : undefined,
      caseStudy: form.hasCaseStudy ? form.caseStudy : null,
    }
    delete parsed.thumbnailSrc
    delete parsed.thumbnailAlt
    delete parsed.hasCaseStudy
    if (!parsed.graphic) parsed.graphic = null
    onSave(parsed)
  }

  return (
    <div className={styles.entryForm}>
      <div className={styles.formRow}>
        <label className={styles.field}>
          <span className={styles.label}>kind</span>
          <select className={styles.select} value={form.kind} onChange={(e) => set('kind')(e.target.value)}>
            <option value="build">build</option>
            <option value="design">design</option>
          </select>
        </label>
        <TextInput label="title" value={form.title} onChange={set('title')} />
      </div>

      <div className={styles.formRow}>
        <TextInput label="year" value={form.year || ''} onChange={set('year')} placeholder="2025" />
        <TextInput label="client" value={form.client || ''} onChange={set('client')} placeholder="Personal" />
        <TextInput label="duration" value={form.duration || ''} onChange={set('duration')} placeholder="4 months" />
        <TextInput label="order" value={form.order || ''} onChange={set('order')} placeholder="1" />
      </div>

      <div className={styles.formRow}>
        <TextInput label="thumbnail src" value={form.thumbnailSrc} onChange={set('thumbnailSrc')} placeholder="/images/..." />
        <TextInput label="thumbnail alt" value={form.thumbnailAlt} onChange={set('thumbnailAlt')} />
      </div>

      {form.kind === 'build' && (
        <>
          <TextInput label="description" value={form.description} onChange={set('description')} multiline />
          <TextInput label="tags (comma-separated)" value={form.tags} onChange={set('tags')} />
          <TextInput label="project url" value={form.href} onChange={set('href')} />
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

      <label className={styles.toggleRow}>
        <input
          type="checkbox"
          checked={form.hasCaseStudy}
          onChange={(e) => set('hasCaseStudy')(e.target.checked)}
          className={styles.checkbox}
        />
        <span className={styles.label}>enable case study</span>
      </label>

      {form.hasCaseStudy && (
        <CaseStudyEditor
          caseStudy={form.caseStudy}
          onChange={(cs) => set('caseStudy')(cs)}
        />
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
        {entry.caseStudy && <span className={styles.caseStudyBadge}>cs</span>}
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

function ContactForm({ contact, onSave }) {
  const [form, setForm] = useState({
    ...contact,
    socials: contact.socials.map((s) => ({ ...s })),
  })
  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }))

  const updateSocial = (index, key, val) => {
    setForm((prev) => ({
      ...prev,
      socials: prev.socials.map((s, i) => (i === index ? { ...s, [key]: val } : s)),
    }))
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
              <input className={styles.input} type="text" placeholder="id" value={social.id} onChange={(e) => updateSocial(i, 'id', e.target.value)} />
              <input className={styles.input} type="text" placeholder="label" value={social.label} onChange={(e) => updateSocial(i, 'label', e.target.value)} />
              <input className={styles.input} type="text" placeholder="href" value={social.href} onChange={(e) => updateSocial(i, 'href', e.target.value)} />
              <button type="button" className={styles.removeBtn} onClick={() => removeSocial(i)}>×</button>
            </div>
          ))}
          <button type="button" className={styles.addBtn} onClick={addSocial}>+ add social</button>
        </div>

        <button type="button" className={styles.saveBtn} onClick={() => onSave(form)}>
          save
        </button>
      </div>
    </section>
  )
}

function ConsolePage() {
  const { hero, contact, about, skills, featuredEntries, setHero, setContact, setAbout, setSkills, addEntry, updateEntry, deleteEntry } = usePortfolioData()
  const { showToast } = useToast()
  const [editingEntry, setEditingEntry] = useState(null)
  const [showNewForm, setShowNewForm] = useState(false)

  const allEntries = featuredEntries

  const handleDeleteEntry = (entry) => {
    deleteEntry(entry.id)
    showToast(`deleted "${entry.title}"`, {
      onUndo: () => {
        addEntry(entry, 'featured')
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

        <HeroForm hero={hero} onSave={(data) => { setHero(data); showToast('hero updated') }} />
        <AboutForm about={about} onSave={(data) => { setAbout(data); showToast('about updated') }} />
        <SkillsForm skills={skills} onSave={(data) => { setSkills(data); showToast('skills updated') }} />

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

        <ContactForm contact={contact} onSave={(data) => { setContact(data); showToast('contact updated') }} />

        <footer className={styles.footer}>
          <Link to="/" className={styles.backLink}>← back to main</Link>
        </footer>
      </main>
    </>
  )
}

export default ConsolePage
