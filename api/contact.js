import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      interest TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      submitted_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { interest, name, email, message } = req.body

  if (!interest || !name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    await ensureTable()
    await sql`
      INSERT INTO contact_submissions (interest, name, email, message)
      VALUES (${interest}, ${name}, ${email}, ${message})
    `
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact form submission error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}