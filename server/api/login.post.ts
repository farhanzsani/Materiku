import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // --- FORCE UPDATE (Jalankan sekali saja) ---
    // Kita paksa password admin di DB di-hash ulang pakai library yang sama
    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash('akuadmin', salt);
    
    await prisma.user.update({
        where: { username: 'admin' },
        data: { password: newHash }
    });
    console.log('--- DEBUG: Password Admin Berhasil Di-hash Ulang! ---');
    // --------------------------------------------

    const user = await prisma.user.findUnique({
        where: { username: body.username }
    })

    if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'User tidak ditemukan' })
    }

    const isMatch = await bcrypt.compare(body.password, user.password)
    console.log('Input:', body.password)
    console.log('DB Hash:', user.password)
    console.log('Apakah Cocok?:', isMatch)

    if (!isMatch) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Username atau password salah!',
        })
    }

    setCookie(event, 'auth_token', user.id, {
        httpOnly: false, // Set false agar bisa dicek manual di browser
    maxAge: 60 * 60 * 24,
    path: '/',       // WAJIB: Supaya bisa dibaca di semua halaman
    sameSite: 'lax',
    secure: false
    })

    return { message: 'Login Berhasil!' }
})