import * as cors from 'cors'

const origin = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002']

const allowedOrigin = process.env.ALLOWED_ORIGIN

if (allowedOrigin) {
  origin.push(...allowedOrigin.split(','))
}

const corsMiddleware = cors({
  origin,
  credentials: true
})

export default corsMiddleware
