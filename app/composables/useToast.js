// composables/useToast.js
// Composable untuk menampilkan toast notification

const toasts = ref([])

export const useToast = () => {
    const show = (message, type = 'info', duration = 3000) => {
        const id = Date.now()
        toasts.value.push({ id, message, type })

        setTimeout(() => {
            toasts.value = toasts.value.filter(t => t.id !== id)
        }, duration)
    }

    const success = (message) => show(message, 'success')
    const error = (message) => show(message, 'error')
    const info = (message) => show(message, 'info')
    const warning = (message) => show(message, 'warning')

    return {
        toasts,
        show,
        success,
        error,
        info,
        warning
    }
}
