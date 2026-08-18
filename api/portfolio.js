import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS portfolio (
      id TEXT PRIMARY KEY DEFAULT 'main',
      data JSONB NOT NULL DEFAULT '{}',
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
}

export default async function handler(req, res) {
  try {
    await ensureTable()

    if (req.method === 'GET') {
      const rows = await sql`SELECT data FROM portfolio WHERE id = 'main'`
      const data = rows.length > 0 ? rows[0].data : null
      return res.status(200).json(data || {})
    }

    if (req.method === 'PUT') {
      const payload = req.body
      await sql`
        INSERT INTO portfolio (id, data, updated_at)
        VALUES ('main', ${JSON.stringify(payload)}, NOW())
        ON CONFLICT (id) DO UPDATE SET
          data = portfolio.data || ${JSON.stringify(payload)},
          updated_at = NOW()
      `
      return res.status(200).json({ ok: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error('Portfolio API error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
