// server/api/materi/[id].get.ts
// Endpoint ini bisa menerima ID (UUID) atau slug
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const param = getRouterParam(event, 'id')

    if (!param) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID atau slug materi tidak ditemukan'
        })
    }

    // Cek apakah param adalah UUID (format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(param)

    let materi

    if (isUUID) {
        // Cari berdasarkan ID
        materi = await prisma.materi.findUnique({
            where: { id: param },
            include: {
                author: {
                    select: {
                        username: true
                    }
                }
            }
        })
    } else {
        // Cari berdasarkan slug
        materi = await prisma.materi.findUnique({
            where: { slug: param },
            include: {
                author: {
                    select: {
                        username: true
                    }
                }
            }
        })
    }

    if (!materi) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Materi tidak ditemukan'
        })
    }

    return materi
})
