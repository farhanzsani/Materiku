export default defineNuxtRouteMiddleware(async (to, from) => {
    // Cek auth via API (lebih reliable untuk httpOnly cookie)
    try {
        const { authenticated } = await $fetch('/api/auth/me')

        if (!authenticated) {
            return navigateTo('/login')
        }
    } catch (e) {
        return navigateTo('/login')
    }
})