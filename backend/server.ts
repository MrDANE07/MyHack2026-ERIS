import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import matchRouter from './routes/match'
import createRelationshipRouter from './routes/createRelationship'
import extractSignalsRouter from './routes/extractSignals'
import updateLifecycleRouter from './routes/updateLifecycle'
import ecosystemStatsRouter from './routes/ecosystemStats'
import getRelationshipRouter from './routes/getRelationship'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}))

app.use(express.json())

app.use('/api/match', matchRouter)
app.use('/api/create-relationship', createRelationshipRouter)
app.use('/api/extract-signals', extractSignalsRouter)
app.use('/api/update-lifecycle', updateLifecycleRouter)
app.use('/api/ecosystem-stats', ecosystemStatsRouter)
app.use('/api/relationships', getRelationshipRouter)

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`ERIS Backend running on http://localhost:${PORT}`)
})
