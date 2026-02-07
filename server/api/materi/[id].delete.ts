// server/api/materi/[id].delete.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    // 1. CEK LOGIN
    const authorId = getCookie(event, 'auth_token')
    if (!authorId) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Harus login admin untuk menghapus materi!'
        })
    }

    const id = getRouterParam(event, 'id')

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID materi tidak ditemukan'
        })
    }

    try {
        // Cek apakah materi ada
        const existing = await prisma.materi.findUnique({
            where: { id }
        })

        if (!existing) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Materi tidak ditemukan'
            })
        }

        // Hapus materi
        await prisma.materi.delete({
            where: { id }
        })

        return { message: 'Materi berhasil dihapus!' }
    } catch (e: any) {
        if (e.statusCode) throw e
        throw createError({
            statusCode: 500,
            statusMessage: 'Gagal menghapus materi dari database'
        })
    }
})
