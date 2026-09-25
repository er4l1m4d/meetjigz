import { useState } from "react";
import { Link } from "react-router-dom";
import { usePortfolioData } from "../hooks/usePortfolioData.js";
import { useToast } from "../context/ToastContext.jsx";
import TopBar from "../components/TopBar.jsx";
import IconPicker from "../components/ui/IconPicker.jsx";
import SocialIconPicker from "../components/ui/SocialIconPicker.jsx";
import styles from "./ConsolePage.module.css";

function TextInput({ label, value, onChange, multiline, placeholder }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      {multiline ? (
        <textarea
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}

function HeroForm({ hero, onSave }) {
  const [form, setForm] = useState({
    firstName: hero.firstName || "",
    lastName: hero.lastName || "",
    role: hero.role || "",
    tagline: hero.tagline || "",
    revealText: hero.revealText || "",
    portraitSrc: hero.portrait?.src || "",
    portraitAlt: hero.portrait?.alt || "",
    currentBuild: hero.currentBuild || {
      text: "",
      project: "",
      description: "",
    },
  });

  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }));

  const updateBuild = (key, val) => {
    setForm((prev) => ({
      ...prev,
      currentBuild: { ...prev.currentBuild, [key]: val },
    }));
  };

  const handleSave = () => {
    const parsed = {
      ...form,
      portrait: form.portraitSrc
        ? { src: form.portraitSrc, alt: form.portraitAlt }
        : undefined,
    };
    delete parsed.portraitSrc;
    delete parsed.portraitAlt;
    onSave(parsed);
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>$ hero --edit</h2>
      <div className={styles.form}>
        <div className={styles.formRow}>
          <TextInput
            label="first name"
            value={form.firstName}
            onChange={set("firstName")}
          />
          <TextInput
            label="last name"
            value={form.lastName}
            onChange={set("lastName")}
          />
        </div>
        <TextInput label="role" value={form.role} onChange={set("role")} />
        <TextInput
          label="tagline"
          value={form.tagline}
          onChange={set("tagline")}
          multiline
        />
        <TextInput
          label="reveal button text"
          value={form.revealText}
          onChange={set("revealText")}
          placeholder="Who is he?"
        />

        <div className={styles.subsection}>
          <span className={styles.label}>portrait image</span>
          <TextInput
            label="src"
            value={form.portraitSrc}
            onChange={set("portraitSrc")}
            placeholder="/images/portrait.png"
          />
          <TextInput
            label="alt"
            value={form.portraitAlt}
            onChange={set("portraitAlt")}
            placeholder="Portrait description"
          />
        </div>

        <div className={styles.subsection}>
          <span className={styles.label}>currently building</span>
          <TextInput
            label="label"
            value={form.currentBuild.text}
            onChange={(v) => updateBuild("text", v)}
            placeholder="Currently building"
          />
          <TextInput
            label="project"
            value={form.currentBuild.project}
            onChange={(v) => updateBuild("project", v)}
          />
          <TextInput
            label="description"
            value={form.currentBuild.description}
            onChange={(v) => updateBuild("description", v)}
          />
        </div>

        <button type="button" className={styles.saveBtn} onClick={handleSave}>
          save
        </button>
      </div>
    </section>
  );
}

function AboutForm({ about, onSave }) {
  const [form, setForm] = useState({
    bio: about.bio || "",
    eyebrow: about.eyebrow || "",
    statement: about.statement || "",
    ctaText: about.ctaText || "",
  });

  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSave = () => {
    onSave({
      ...form,
    });
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>$ about --edit</h2>
      <div className={styles.form}>
        <TextInput
          label="bio"
          value={form.bio}
          onChange={set("bio")}
          multiline
         />
        <TextInput
          label="eyebrow"
          value={form.eyebrow}
          onChange={set("eyebrow")}
          placeholder="// Intro"
        />
        <TextInput
          label="statement"
          value={form.statement}
          onChange={set("statement")}
          multiline
          placeholder="I'm a versatile designer..."
        />
        <TextInput
          label="cta button text"
          value={form.ctaText}
          onChange={set("ctaText")}
          placeholder="See my Work"
        />
        <button type="button" className={styles.saveBtn} onClick={handleSave}>
          save
        </button>
      </div>
    </section>
  );
}

function SkillsForm({ skills, onSave }) {
  const [form, setForm] = useState({
    heading: skills.heading || "",
    subtext: skills.subtext || "",
    eyebrow: skills.eyebrow || "",
    categories:
      skills.categories?.map((cat) => ({
        ...cat,
        items: cat.items.map((item) => ({
          ...item,
          projectIds: item.projectIds?.join(", ") || "",
        })),
      })) || [],
  });

  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }));

  const updateCategory = (catIndex, key, val) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.map((c, i) =>
        i === catIndex ? { ...c, [key]: val } : c,
      ),
    }));
  };

  const updateSkill = (catIndex, skillIndex, key, val) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.map((c, i) =>
        i === catIndex
          ? {
              ...c,
              items: c.items.map((item, j) =>
                j === skillIndex ? { ...item, [key]: val } : item,
              ),
            }
          : c,
      ),
    }));
  };

  const addSkill = (catIndex) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.map((c, i) =>
        i === catIndex
          ? {
              ...c,
              items: [...c.items, { name: "", icon: "", projectIds: "" }],
            }
          : c,
      ),
    }));
  };

  const removeSkill = (catIndex, skillIndex) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.map((c, i) =>
        i === catIndex
          ? { ...c, items: c.items.filter((_, j) => j !== skillIndex) }
          : c,
      ),
    }));
  };

  const addCategory = () => {
    setForm((prev) => ({
      ...prev,
      categories: [...prev.categories, { id: "", label: "", items: [] }],
    }));
  };

  const removeCategory = (catIndex) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== catIndex),
    }));
  };

  const handleSave = () => {
    onSave({
      heading: form.heading,
      subtext: form.subtext,
      eyebrow: form.eyebrow,
      categories: form.categories.map((cat) => ({
        ...cat,
        items: cat.items.map((item) => ({
          name: item.name,
          ...(item.icon ? { icon: item.icon } : {}),
          projectIds: item.projectIds
            ? item.projectIds
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : [],
        })),
      })),
    });
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>$ skills --edit</h2>
      <div className={styles.form}>
        <TextInput
          label="eyebrow"
          value={form.eyebrow}
          onChange={set("eyebrow")}
          placeholder="// Stack"
        />
        <TextInput
          label="heading"
          value={form.heading}
          onChange={set("heading")}
          placeholder="Design meets development."
        />
        <TextInput
          label="subtext"
          value={form.subtext}
          onChange={set("subtext")}
          multiline
          placeholder="A focused toolkit..."
        />

        {form.categories.map((cat, catIndex) => (
          <div key={catIndex} className={styles.categoryBlock}>
            <div className={styles.categoryHeader}>
              <input
                className={styles.input}
                type="text"
                placeholder="category label"
                value={cat.label}
                onChange={(e) =>
                  updateCategory(catIndex, "label", e.target.value)
                }
              />
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeCategory(catIndex)}
              >
                ×
              </button>
            </div>

            {cat.items.map((skill, skillIndex) => (
              <div key={skillIndex} className={styles.skillRow}>
                <IconPicker
                  skill={{ name: skill.name, icon: skill.icon }}
                  value={skill.icon || ""}
                  onChange={(v) => updateSkill(catIndex, skillIndex, "icon", v)}
                />
                <input
                  className={styles.input}
                  type="text"
                  placeholder="name"
                  value={skill.name}
                  onChange={(e) =>
                    updateSkill(catIndex, skillIndex, "name", e.target.value)
                  }
                />
                <input
                  className={styles.input}
                  type="text"
                  placeholder="project ids (comma-separated)"
                  value={skill.projectIds}
                  onChange={(e) =>
                    updateSkill(
                      catIndex,
                      skillIndex,
                      "projectIds",
                      e.target.value,
                    )
                  }
                />
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeSkill(catIndex, skillIndex)}
                >
                  ×
                </button>
              </div>
            ))}

            <button
              type="button"
              className={styles.addBtn}
              onClick={() => addSkill(catIndex)}
            >
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
  );
}

function CaseStudyEditor({ caseStudy, onChange }) {
  const [form, setForm] = useState(
    () =>
      caseStudy || {
        heroImage: { src: "", alt: "" },
        sections: {
          context: "",
          problem: "",
          role: "",
          thinking: "",
          build: "",
          challenges: "",
          result: "",
        },
        evidence: [],
        links: [],
      },
  );

  const setSection = (key, val) => {
    const next = { ...form, sections: { ...form.sections, [key]: val } };
    setForm(next);
    onChange(next);
  };

  const setHeroImage = (key, val) => {
    const next = { ...form, heroImage: { ...form.heroImage, [key]: val } };
    setForm(next);
    onChange(next);
  };

  const addEvidence = () => {
    const next = {
      ...form,
      evidence: [...form.evidence, { src: "", alt: "", caption: "" }],
    };
    setForm(next);
    onChange(next);
  };

  const updateEvidence = (index, key, val) => {
    const next = {
      ...form,
      evidence: form.evidence.map((e, i) =>
        i === index ? { ...e, [key]: val } : e,
      ),
    };
    setForm(next);
    onChange(next);
  };

  const removeEvidence = (index) => {
    const next = {
      ...form,
      evidence: form.evidence.filter((_, i) => i !== index),
    };
    setForm(next);
    onChange(next);
  };

  const addLink = () => {
    const next = { ...form, links: [...form.links, { label: "", href: "" }] };
    setForm(next);
    onChange(next);
  };

  const updateLink = (index, key, val) => {
    const next = {
      ...form,
      links: form.links.map((l, i) => (i === index ? { ...l, [key]: val } : l)),
    };
    setForm(next);
    onChange(next);
  };

  const removeLink = (index) => {
    const next = { ...form, links: form.links.filter((_, i) => i !== index) };
    setForm(next);
    onChange(next);
  };

  return (
    <div className={styles.caseStudyEditor}>
      <span className={styles.label}>case study</span>

      <div className={styles.formRow}>
        <TextInput
          label="hero image src"
          value={form.heroImage.src}
          onChange={(v) => setHeroImage("src", v)}
          placeholder="/images/..."
        />
        <TextInput
          label="hero image alt"
          value={form.heroImage.alt}
          onChange={(v) => setHeroImage("alt", v)}
        />
      </div>

      {[
        "context",
        "problem",
        "role",
        "thinking",
        "build",
        "challenges",
        "result",
      ].map((key) => (
        <TextInput
          key={key}
          label={key}
          value={form.sections[key] || ""}
          onChange={(v) => setSection(key, v)}
          multiline
        />
      ))}

      <div className={styles.subsection}>
        <span className={styles.label}>evidence</span>
        {form.evidence.map((item, i) => (
          <div key={i} className={styles.skillRow}>
            <input
              className={styles.input}
              type="text"
              placeholder="src"
              value={item.src}
              onChange={(e) => updateEvidence(i, "src", e.target.value)}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="alt"
              value={item.alt}
              onChange={(e) => updateEvidence(i, "alt", e.target.value)}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="caption"
              value={item.caption}
              onChange={(e) => updateEvidence(i, "caption", e.target.value)}
            />
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => removeEvidence(i)}
            >
              ×
            </button>
          </div>
        ))}
        <button type="button" className={styles.addBtn} onClick={addEvidence}>
          + add evidence
        </button>
      </div>

      <div className={styles.subsection}>
        <span className={styles.label}>links</span>
        {form.links.map((link, i) => (
          <div key={i} className={styles.skillRow}>
            <input
              className={styles.input}
              type="text"
              placeholder="label"
              value={link.label}
              onChange={(e) => updateLink(i, "label", e.target.value)}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="href"
              value={link.href}
              onChange={(e) => updateLink(i, "href", e.target.value)}
            />
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => removeLink(i)}
            >
              ×
            </button>
          </div>
        ))}
        <button type="button" className={styles.addBtn} onClick={addLink}>
          + add link
        </button>
      </div>
    </div>
  );
}

function ImagesEditor({ images, onChange }) {
  const updateImage = (index, key, val) => {
    onChange(
      images.map((img, i) => (i === index ? { ...img, [key]: val } : img)),
    );
  };

  const addImage = () => {
    onChange([...images, { src: "", alt: "" }]);
  };

  const removeImage = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  if (!images || !Array.isArray(images)) return null;

  return (
    <div className={styles.subsection}>
      <span className={styles.label}>images</span>
      {images.map((img, i) => (
        <div key={i} className={styles.skillRow}>
          <input
            className={styles.input}
            type="text"
            placeholder="src"
            value={img.src}
            onChange={(e) => updateImage(i, "src", e.target.value)}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="alt"
            value={img.alt}
            onChange={(e) => updateImage(i, "alt", e.target.value)}
          />
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => removeImage(i)}
          >
            ×
          </button>
        </div>
      ))}
      <button type="button" className={styles.addBtn} onClick={addImage}>
        + add image
      </button>
    </div>
  );
}

function EntryForm({ entry, onSave, onCancel }) {
  const [form, setForm] = useState(() => {
    if (entry) {
      return {
        ...entry,
        tags: entry.tags?.join(", ") || "",
        tools: entry.tools?.join(", ") || "",
        thumbnailSrc: entry.thumbnail?.src || "",
        thumbnailAlt: entry.thumbnail?.alt || "",
        images: entry.images || [],
        hasCaseStudy: entry.caseStudy != null,
        caseStudy: entry.caseStudy || null,
      };
    }
    return {
      kind: "build",
      title: "",
      status: "in-progress",
      description: "",
      tags: "",
      href: "",
      graphic: "",
      brief: "",
      tools: "",
      thumbnailSrc: "",
      thumbnailAlt: "",
      images: [],
      year: "",
      client: "",
      duration: "",
      order: "",
      hasCaseStudy: false,
      caseStudy: null,
    };
  });

  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSave = () => {
    const parsed = {
      ...form,
      tags: form.tags
        ? form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      tools: form.tools
        ? form.tools
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      thumbnail: form.thumbnailSrc
        ? { src: form.thumbnailSrc, alt: form.thumbnailAlt }
        : undefined,
      year: form.year || undefined,
      client: form.client || undefined,
      duration: form.duration || undefined,
      order: form.order ? parseInt(form.order, 10) : undefined,
      caseStudy: form.hasCaseStudy ? form.caseStudy : null,
    };
    delete parsed.thumbnailSrc;
    delete parsed.thumbnailAlt;
    delete parsed.hasCaseStudy;
    if (!parsed.graphic) parsed.graphic = null;
    onSave(parsed);
  };

  return (
    <div className={styles.entryForm}>
      <div className={styles.formRow}>
        <label className={styles.field}>
          <span className={styles.label}>kind</span>
          <select
            className={styles.select}
            value={form.kind}
            onChange={(e) => set("kind")(e.target.value)}
          >
            <option value="build">build</option>
            <option value="design">design</option>
          </select>
        </label>
        <TextInput label="title" value={form.title} onChange={set("title")} />
      </div>

      <div className={styles.formRow}>
        <TextInput
          label="year"
          value={form.year || ""}
          onChange={set("year")}
          placeholder="2025"
        />
        <TextInput
          label="client"
          value={form.client || ""}
          onChange={set("client")}
          placeholder="Personal"
        />
        <TextInput
          label="duration"
          value={form.duration || ""}
          onChange={set("duration")}
          placeholder="4 months"
        />
        <TextInput
          label="order"
          value={form.order || ""}
          onChange={set("order")}
          placeholder="1"
        />
      </div>

      <div className={styles.formRow}>
        <TextInput
          label="thumbnail src"
          value={form.thumbnailSrc}
          onChange={set("thumbnailSrc")}
          placeholder="/images/..."
        />
        <TextInput
          label="thumbnail alt"
          value={form.thumbnailAlt}
          onChange={set("thumbnailAlt")}
        />
      </div>

      {form.kind === "build" && (
        <>
          <TextInput
            label="description"
            value={form.description}
            onChange={set("description")}
            multiline
          />
          <TextInput
            label="tags (comma-separated)"
            value={form.tags}
            onChange={set("tags")}
          />
          <TextInput
            label="project url"
            value={form.href}
            onChange={set("href")}
          />
          <div className={styles.formRow}>
            <label className={styles.field}>
              <span className={styles.label}>status</span>
              <select
                className={styles.select}
                value={form.status}
                onChange={(e) => set("status")(e.target.value)}
              >
                <option value="live">live</option>
                <option value="in-progress">in-progress</option>
                <option value="shadow">shadow</option>
              </select>
            </label>
            <label className={styles.field}>
              <span className={styles.label}>graphic</span>
              <select
                className={styles.select}
                value={form.graphic || ""}
                onChange={(e) => set("graphic")(e.target.value || null)}
              >
                <option value="">none</option>
                <option value="ciphra-chip">ciphra-chip</option>
                <option value="verge-gate">verge-gate</option>
              </select>
            </label>
          </div>
        </>
      )}

      {form.kind === "design" && (
        <>
          <TextInput
            label="brief"
            value={form.brief}
            onChange={set("brief")}
            multiline
          />
          <TextInput
            label="tools (comma-separated)"
            value={form.tools}
            onChange={set("tools")}
          />
          <ImagesEditor
            images={form.images}
            onChange={(imgs) => set("images")(imgs)}
          />
        </>
      )}

      <label className={styles.toggleRow}>
        <input
          type="checkbox"
          checked={form.hasCaseStudy}
          onChange={(e) => set("hasCaseStudy")(e.target.checked)}
          className={styles.checkbox}
        />
        <span className={styles.label}>enable case study</span>
      </label>

      {form.hasCaseStudy && (
        <CaseStudyEditor
          caseStudy={form.caseStudy}
          onChange={(cs) => set("caseStudy")(cs)}
        />
      )}

      <div className={styles.formActions}>
        <button type="button" className={styles.saveBtn} onClick={handleSave}>
          {entry ? "update" : "create"}
        </button>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          cancel
        </button>
      </div>
    </div>
  );
}

function EntryItem({
  entry,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}) {
  return (
    <div className={styles.entryItem}>
      <div className={styles.entryInfo}>
        <span className={styles.entryKind}>{entry.kind}</span>
        <span className={styles.entryTitle}>{entry.title}</span>
        {entry.caseStudy && <span className={styles.caseStudyBadge}>cs</span>}
      </div>
      <div className={styles.entryActions}>
        <button
          type="button"
          className={styles.actionBtn}
          onClick={() => onMoveUp(entry)}
          disabled={isFirst}
          title="move up"
        >
          ↑
        </button>
        <button
          type="button"
          className={styles.actionBtn}
          onClick={() => onMoveDown(entry)}
          disabled={isLast}
          title="move down"
        >
          ↓
        </button>
        <button
          type="button"
          className={styles.actionBtn}
          onClick={() => onEdit(entry)}
        >
          edit
        </button>
        <button
          type="button"
          className={styles.actionBtnDanger}
          onClick={() => onDelete(entry)}
        >
          delete
        </button>
      </div>
    </div>
  );
}

function ContactForm({ contact, onSave }) {
  const [form, setForm] = useState({
    ...contact,
    socials: contact.socials.map((s) => ({ ...s })),
  });
  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }));

  const updateSocial = (index, key, val) => {
    setForm((prev) => ({
      ...prev,
      socials: prev.socials.map((s, i) =>
        i === index ? { ...s, [key]: val } : s,
      ),
    }));
  };

  const addSocial = () => {
    setForm((prev) => ({
      ...prev,
      socials: [...prev.socials, { id: "", label: "", href: "", icon: "" }],
    }));
  };

  const removeSocial = (index) => {
    setForm((prev) => ({
      ...prev,
      socials: prev.socials.filter((_, i) => i !== index),
    }));
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>$ contact --edit</h2>
      <div className={styles.form}>
        <TextInput label="name" value={form.name} onChange={set("name")} />
        <TextInput label="role" value={form.role} onChange={set("role")} />
        <TextInput label="email" value={form.email} onChange={set("email")} />

        <div className={styles.subsection}>
          <span className={styles.label}>socials</span>
          {form.socials.map((social, i) => (
            <div key={i} className={styles.socialRow}>
              <input
                className={styles.input}
                type="text"
                placeholder="id"
                value={social.id}
                onChange={(e) => updateSocial(i, "id", e.target.value)}
              />
              <input
                className={styles.input}
                type="text"
                placeholder="label"
                value={social.label}
                onChange={(e) => updateSocial(i, "label", e.target.value)}
              />
              <SocialIconPicker
                value={social.icon || ""}
                onChange={(val) => updateSocial(i, "icon", val)}
              />
              <input
                className={styles.input}
                type="text"
                placeholder="href"
                value={social.href}
                onChange={(e) => updateSocial(i, "href", e.target.value)}
              />
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeSocial(i)}
              >
                ×
              </button>
            </div>
          ))}
          <button type="button" className={styles.addBtn} onClick={addSocial}>
            + add social
          </button>
        </div>

        <button
          type="button"
          className={styles.saveBtn}
          onClick={() => onSave(form)}
        >
          save
        </button>
      </div>
    </section>
  );
}

function NavLinksEditor({ links, onChange, label }) {
  const updateLink = (index, key, val) => {
    onChange(links.map((l, i) => (i === index ? { ...l, [key]: val } : l)));
  };

  const addLink = () => {
    onChange([...links, { id: "", label: "" }]);
  };

  const removeLink = (index) => {
    onChange(links.filter((_, i) => i !== index));
  };

  if (!links || !Array.isArray(links)) return null;

  return (
    <div className={styles.subsection}>
      <span className={styles.label}>{label}</span>
      {links.map((link, i) => (
        <div key={i} className={styles.socialRow}>
          <input
            className={styles.input}
            type="text"
            placeholder="id"
            value={link.id}
            onChange={(e) => updateLink(i, "id", e.target.value)}
          />
          <input
            className={styles.input}
            type="text"
            placeholder={
              label === "footer nav links" ? "label (capitals)" : "label"
            }
            value={link.label}
            onChange={(e) => updateLink(i, "label", e.target.value)}
          />
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => removeLink(i)}
          >
            ×
          </button>
        </div>
      ))}
      <button type="button" className={styles.addBtn} onClick={addLink}>
        + add link
      </button>
    </div>
  );
}

function InterestTagsEditor({ tags, onChange }) {
  const [inputValue, setInputValue] = useState("");

  if (!tags || !Array.isArray(tags)) return null;

  const handleAdd = () => {
    if (inputValue.trim()) {
      onChange([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemove = (index) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.subsection}>
      <span className={styles.label}>interest tags</span>
      <div className={styles.socialRow}>
        <input
          className={styles.input}
          type="text"
          placeholder="add tag"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <button type="button" className={styles.actionBtn} onClick={handleAdd}>
          add
        </button>
      </div>
      <div className={styles.socialRow}>
        {tags.map((tag, i) => (
          <span key={i} className={styles.entryKind}>
            {tag}
          </span>
        ))}
      </div>
      {tags.map((tag, i) => (
        <button
          key={i}
          type="button"
          className={styles.removeBtn}
          onClick={() => handleRemove(i)}
        >
          ×
        </button>
      ))}
    </div>
  );
}

function SettingsForm({ settings, onSave }) {
  const [form, setForm] = useState({
    navLinks: settings.navLinks || [],
    copyright: {
      year: settings.copyright?.year || "",
      name: settings.copyright?.name || "",
      credit: settings.copyright?.credit || "",
    },
    works: {
      heading: settings.works?.heading || "",
      subtext: settings.works?.subtext || "",
      eyebrow: settings.works?.eyebrow || "",
    },
    contactForm: {
      headline: settings.contactForm?.headline || "",
      subhead: settings.contactForm?.subhead || "",
      title: settings.contactForm?.title || "",
      subtitle: settings.contactForm?.subtitle || "",
      eyebrow: settings.contactForm?.eyebrow || "",
      interestTags: settings.contactForm?.interestTags || [],
    },
  });

  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }));

  const updateNavLinks = (links) => set("navLinks")(links);

  const updateCopyright = (key, val) => {
    set("copyright")({ ...form.copyright, [key]: val });
  };

  const updateWorks = (key, val) => {
    set("works")({ ...form.works, [key]: val });
  };

  const updateContactForm = (key, val) => {
    set("contactForm")({ ...form.contactForm, [key]: val });
  };

  const handleSave = () => {
    onSave({
      navLinks: form.navLinks,
      copyright: {
        year: form.copyright.year,
        name: form.copyright.name,
        credit: form.copyright.credit,
      },
      works: {
        heading: form.works.heading,
        subtext: form.works.subtext,
        eyebrow: form.works.eyebrow,
      },
      contactForm: {
        headline: form.contactForm.headline,
        subhead: form.contactForm.subhead,
        title: form.contactForm.title,
        subtitle: form.contactForm.subtitle,
        eyebrow: form.contactForm.eyebrow,
        interestTags: form.contactForm.interestTags,
      },
    });
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>$ settings --edit</h2>
      <div className={styles.form}>
        <div className={styles.subsection}>
          <span className={styles.label}>
            navigation links (top bar & footer)
          </span>
          <NavLinksEditor
            links={form.navLinks}
            onChange={updateNavLinks}
            label="nav links"
          />
        </div>

        <div className={styles.subsection}>
          <span className={styles.label}>copyright</span>
          <TextInput
            label="year"
            value={form.copyright.year}
            onChange={(v) => updateCopyright("year", v)}
            placeholder="2026"
          />
          <TextInput
            label="name"
            value={form.copyright.name}
            onChange={(v) => updateCopyright("name", v)}
            placeholder="Damilare Ogo-Oluwade"
          />
          <TextInput
            label="credit"
            value={form.copyright.credit}
            onChange={(v) => updateCopyright("credit", v)}
            placeholder="designed & built by me"
          />
        </div>

        <div className={styles.subsection}>
          <span className={styles.label}>works section</span>
          <TextInput
            label="eyebrow"
            value={form.works.eyebrow}
            onChange={(v) => updateWorks("eyebrow", v)}
            placeholder="// Works"
          />
          <TextInput
            label="heading"
            value={form.works.heading}
            onChange={(v) => updateWorks("heading", v)}
            placeholder="Selected Work"
          />
          <TextInput
            label="subtext"
            value={form.works.subtext}
            onChange={(v) => updateWorks("subtext", v)}
            multiline
          />
        </div>

        <div className={styles.subsection}>
          <span className={styles.label}>contact form</span>
          <TextInput
            label="eyebrow"
            value={form.contactForm.eyebrow}
            onChange={(v) => updateContactForm("eyebrow", v)}
            placeholder="// Contact"
          />
          <TextInput
            label="headline"
            value={form.contactForm.headline}
            onChange={(v) => updateContactForm("headline", v)}
            placeholder="Have a project?"
          />
          <TextInput
            label="subhead"
            value={form.contactForm.subhead}
            onChange={(v) => updateContactForm("subhead", v)}
            multiline
          />
          <TextInput
            label="title"
            value={form.contactForm.title}
            onChange={(v) => updateContactForm("title", v)}
            placeholder="Start a project"
          />
          <TextInput
            label="subtitle"
            value={form.contactForm.subtitle}
            onChange={(v) => updateContactForm("subtitle", v)}
            placeholder="Fill in the form below..."
          />
        </div>

        <InterestTagsEditor
          tags={form.contactForm.interestTags}
          onChange={(tags) => updateContactForm("interestTags", tags)}
        />

        <button type="button" className={styles.saveBtn} onClick={handleSave}>
          save
        </button>
      </div>
    </section>
  );
}

function ConsolePage() {
  const {
    hero,
    contact,
    about,
    skills,
    settings,
    featuredEntries,
    setHero,
    setContact,
    setAbout,
    setSkills,
    setSettings,
    addEntry,
    updateEntry,
    deleteEntry,
    reorderEntries,
  } = usePortfolioData();
  const { showToast } = useToast();
  const [editingEntry, setEditingEntry] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);

  const allEntries = featuredEntries;

  const handleDeleteEntry = (entry) => {
    deleteEntry(entry.id);
    showToast(`deleted "${entry.title}"`, {
      onUndo: () => {
        addEntry(entry);
      },
    });
  };

  const handleMoveEntry = (entry, direction) => {
    const currentIndex = allEntries.findIndex((e) => e.id === entry.id);
    if (currentIndex === -1) return;
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= allEntries.length) return;

    const sorted = [...allEntries];
    const [removed] = sorted.splice(currentIndex, 1);
    sorted.splice(newIndex, 0, removed);

    const newOrder = sorted.map((e) => e.id);
    reorderEntries(newOrder);
    showToast(`moved "${entry.title}" ${direction === "up" ? "up" : "down"}`);
  };

  const handleSaveEntry = (form) => {
    if (editingEntry) {
      updateEntry(editingEntry.id, form);
      showToast(`updated "${form.title}"`);
    } else {
      addEntry(form);
      showToast(`created "${form.title}"`);
    }
    setEditingEntry(null);
    setShowNewForm(false);
  };

  return (
    <>
      <TopBar navLinks={settings?.navLinks} />
      <main className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>console</h1>
          <p className={styles.subtitle}>manage your portfolio content</p>
        </header>

        <HeroForm
          hero={hero}
          onSave={(data) => {
            setHero(data);
            showToast("hero updated");
          }}
        />
        <AboutForm
          about={about}
          onSave={(data) => {
            setAbout(data);
            showToast("about updated");
          }}
        />
        <SkillsForm
          skills={skills}
          onSave={(data) => {
            setSkills(data);
            showToast("skills updated");
          }}
        />

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>$ entries --list</h2>

          {allEntries.map((entry, index) => (
            <EntryItem
              key={entry.id}
              entry={entry}
              onEdit={setEditingEntry}
              onDelete={handleDeleteEntry}
              onMoveUp={(e) => handleMoveEntry(e, "up")}
              onMoveDown={(e) => handleMoveEntry(e, "down")}
              isFirst={index === 0}
              isLast={index === allEntries.length - 1}
            />
          ))}

          {(showNewForm || editingEntry) && (
            <EntryForm
              entry={editingEntry}
              onSave={handleSaveEntry}
              onCancel={() => {
                setEditingEntry(null);
                setShowNewForm(false);
              }}
            />
          )}

          {!showNewForm && !editingEntry && (
            <button
              type="button"
              className={styles.addEntryBtn}
              onClick={() => setShowNewForm(true)}
            >
              + new entry
            </button>
          )}
        </section>

        <ContactForm
          contact={contact}
          onSave={(data) => {
            setContact(data);
            showToast("contact updated");
          }}
        />

        <SettingsForm
          settings={settings}
          onSave={(data) => {
            setSettings(data);
            showToast("settings updated");
          }}
        />

        <footer className={styles.footer}>
          <Link to="/" className={styles.backLink}>
            ← back to main
          </Link>
        </footer>
      </main>
    </>
  );
}

export default ConsolePage;
