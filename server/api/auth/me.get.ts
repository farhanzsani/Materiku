// server/api/auth/me.get.ts
// Endpoint untuk mengecek status login user

export default defineEventHandler(async (event) => {
    const userId = getCookie(event, 'auth_token')

    if (!userId) {
        return { authenticated: false }
    }

    return { authenticated: true, userId }
})
