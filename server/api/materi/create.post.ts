// server/api/materi/create.post.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  // 1. CEK LOGIN (Satpam Pintu Belakang)
  const authorId = getCookie(event, 'auth_token')
  if (!authorId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Harus login admin untuk menambah materi!'
    })
  }

  const body = await readBody(event)

  // 2. LOGIKA SLUG (Biar URL cantik)
  const slug = body.title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')

  try {
    // 3. SIMPAN KE DB
    const materi = await prisma.materi.create({
      data: {
        title: body.title,
        slug: slug,
        content: body.content,
        authorId: authorId // Menghubungkan materi dengan akun admin kamu
      }
    })
    return { message: 'Berhasil!', data: materi }
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Gagal simpan ke database'
    })
  }
})