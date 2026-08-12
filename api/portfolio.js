import { kv } from '@vercel/kv'

const STORAGE_KEYS = {
  featured: 'jigz-featured-entries',
  archive: 'jigz-archive-entries',
  hero: 'jigz-hero',
  contact: 'jigz-contact',
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [featured, archive, hero, contact] = await Promise.all([
        kv.get(STORAGE_KEYS.featured),
        kv.get(STORAGE_KEYS.archive),
        kv.get(STORAGE_KEYS.hero),
        kv.get(STORAGE_KEYS.contact),
      ])
      return res.status(200).json({ featured, archive, hero, contact })
    } catch (err) {
      return res.status(500).json({ error: 'Failed to read portfolio data' })
    }
  }

  if (req.method === 'PUT') {
    try {
      const { featured, archive, hero, contact } = req.body

      const promises = []
      if (featured !== undefined) promises.push(kv.set(STORAGE_KEYS.featured, featured))
      if (archive !== undefined) promises.push(kv.set(STORAGE_KEYS.archive, archive))
      if (hero !== undefined) promises.push(kv.set(STORAGE_KEYS.hero, hero))
      if (contact !== undefined) promises.push(kv.set(STORAGE_KEYS.contact, contact))

      await Promise.all(promises)
      return res.status(200).json({ ok: true })
    } catch (err) {
      return res.status(500).json({ error: 'Failed to save portfolio data' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
