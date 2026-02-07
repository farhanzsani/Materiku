// server/api/materi/[slug].get.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug')

    if (!slug) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Slug tidak ditemukan'
        })
    }

    const materi = await prisma.materi.findUnique({
        where: { slug },
        include: {
            author: {
                select: {
                    username: true
                }
            }
        }
    })

    if (!materi) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Materi tidak ditemukan'
        })
    }

    return materi
})
