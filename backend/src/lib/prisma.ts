import { PrismaClient } from '@prisma/client'
// import config from '../utils/config'

// const DATABASE_URL = config.DATABASE_URL
// const DEV_DATABASE_URL = config.DEV_DATABASE_URL

// if (process.env.NODE_ENV === 'production' && !DATABASE_URL) {
//   throw new Error('⚠️ DATABASE_URL is not defined in environment variables')
// }

// if (process.env.NODE_ENV !== 'production' && !DEV_DATABASE_URL) {
//   throw new Error('⚠️ DEV_DATABASE_URL is not defined in environment variables')
// }

// const dbUrl = process.env.NODE_ENV === 'production' ? DATABASE_URL : DEV_DATABASE_URL

// export const prisma = new PrismaClient({
//   datasources: {
//     db: {
//       url: dbUrl
//     }
//   }
// })

export const prisma = new PrismaClient()
