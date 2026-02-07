// server/api/materi/index.get.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  // Ambil semua materi, urutkan dari yang terbaru
  const materis = await prisma.materi.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      createdAt: true,
      author: {
        select: {
          username: true
        }
      }
    }
  })
  
  return materis
})
