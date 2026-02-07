import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Validasi input
    if (!body.username || !body.password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Username dan password harus diisi!'
        })
    }

    const user = await prisma.user.findUnique({
        where: { username: body.username }
    })

    if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'Username atau password salah!' })
    }

    const isMatch = await bcrypt.compare(body.password, user.password)

    if (!isMatch) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Username atau password salah!',
        })
    }

    setCookie(event, 'auth_token', user.id, {
        httpOnly: true,  // Lebih aman, cookie tidak bisa diakses via JavaScript
        maxAge: 60 * 60 * 24,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    })

    return { message: 'Login Berhasil!' }
})