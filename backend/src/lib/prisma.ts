import { PrismaClient } from '@prisma/client'
import config from '../utils/config'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (config.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
