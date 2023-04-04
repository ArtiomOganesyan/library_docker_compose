import { Sequelize } from 'sequelize-typescript'
import * as config from './database.json'
import * as path from 'path'
import * as dotenv from 'dotenv'
import { User } from '../models/user'

dotenv.config({ path: path.join(process.cwd(), '.env') })

const models = { User }

const env = process.env.NODE_ENV || 'development'

const sequelize = new Sequelize(process.env[config[env].use_env_variable])

sequelize.addModels(Object.values(models))

const connection = { sequelize, ...models }

export default connection
