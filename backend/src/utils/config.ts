import { config } from 'dotenv'

config()

const PORT = process.env.PORT || 3002
const NODE_ENV = process.env.NODE_ENV

export default {
  PORT,
  NODE_ENV
}
