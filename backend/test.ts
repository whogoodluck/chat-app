// test.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:Sunny123!@localhost:5432/newdb'
    }
  }
})

async function main() {
  const users = await prisma.user.findMany()
  console.log('users', users)
  //   console.log('test')
}

main()
