// server/api/auth/logout.post.ts
// Endpoint untuk logout - menghapus cookie auth_token

export default defineEventHandler(async (event) => {
    // Hapus cookie auth_token dengan set maxAge ke 0
    deleteCookie(event, 'auth_token', {
        path: '/',
    })

    return { message: 'Logout berhasil!' }
})
