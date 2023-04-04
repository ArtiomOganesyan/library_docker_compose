import * as session from 'express-session'
import { createClient } from 'redis'
import RedisStore from 'connect-redis'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

console.log(process.env.REDIS_URL)

const redisClient = createClient({ url: process.env.REDIS_URL ?? 'redis://localhost:6379' })

redisClient.connect().catch(console.error)

const sessionMiddleware = session({
  name: 'libraryAuth',
  store: new RedisStore({ client: redisClient, prefix: 'libraryAuth' }),
  secret: process.env.SECRET || 'asdf234ragfbxcx2',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 5
  }
})

export default sessionMiddleware
