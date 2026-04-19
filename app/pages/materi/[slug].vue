<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-6">
    <!-- Header dengan tombol kembali -->
    <div class="mb-6 sm:mb-8">
      <NuxtLink to="/" class="text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-2 transition text-sm sm:text-base">
        <span>←</span> Kembali ke Daftar Materi
      </NuxtLink>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="text-center py-16 sm:py-20">
      <p class="text-gray-400 text-lg sm:text-xl">Memuat materi...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-16 sm:py-20">
      <p class="text-red-400 text-lg sm:text-xl">{{ error.statusMessage || 'Materi tidak ditemukan' }}</p>
      <NuxtLink to="/" class="mt-4 inline-block text-blue-400 hover:text-blue-300 hover:underline transition text-sm sm:text-base">
        Kembali ke Beranda
      </NuxtLink>
    </div>

    <!-- Content -->
    <article v-else-if="materi" class="bg-gray-800 border border-gray-700 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
      <header class="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-700">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 sm:mb-4">{{ materi.title }}</h1>
        <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-gray-400 text-xs sm:text-sm">
          <span>Oleh: <strong class="text-gray-300">{{ materi.author?.username || 'Admin' }}</strong></span>
          <span class="hidden sm:inline">•</span>
          <span>{{ new Date(materi.createdat).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) }}</span>
        </div>
      </header>

      <div
        class="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none"
        v-html="renderedContent"
        @click="handleMateriContentClick"
      ></div>
    </article>

    <!-- Admin Actions -->
    <div v-if="materi && isAdmin" class="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
      <NuxtLink :to="`/admin/edit/${materi.id}`" class="bg-amber-600 hover:bg-amber-500 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition text-center text-sm sm:text-base">
        Edit Materi
      </NuxtLink>
      <button @click="handleDelete" class="bg-red-600 hover:bg-red-500 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition text-sm sm:text-base">
        Hapus Materi
      </button>
    </div>
  </div>
</template>

<script setup>
import { renderMateriMarkdown } from '~/utils/renderMateriMarkdown'

const toast = useToast()
const route = useRoute()
const slug = computed(() => {
  const p = route.params.slug
  return (Array.isArray(p) ? p[0] : p) ?? ''
})

// Fetch materi berdasarkan slug
const { data: materi, pending, error } = await useFetch(
  computed(() => `/api/materi/${slug.value}`)
)

// Render markdown ke HTML (blok kode: syntax highlight + tombol salin)
const renderedContent = computed(() => {
  if (materi.value?.content) {
    return renderMateriMarkdown(materi.value.content)
  }
  return ''
})

function handleMateriContentClick(e) {
  const target = e.target
  if (!target || typeof target.closest !== 'function') return
  const btn = target.closest('[data-copy-code]')
  if (!btn) return
  e.preventDefault()
  const block = btn.closest('.materi-code-block')
  const pre = block?.querySelector('pre')
  const text = pre?.innerText ?? ''
  if (!text.trim()) {
    toast.error('Tidak ada kode untuk disalin.')
    return
  }
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success('Kode disalin ke clipboard.')
      const prev = btn.textContent
      btn.textContent = 'Disalin!'
      btn.disabled = true
      window.setTimeout(() => {
        btn.textContent = prev
        btn.disabled = false
      }, 2000)
    })
    .catch(() => {
      toast.error('Gagal menyalin kode.')
    })
}

// Cek status admin via API
const { data: authData } = await useFetch('/api/auth/me')
const isAdmin = computed(() => authData.value?.authenticated === true)

// Handler delete
const handleDelete = async () => {
  if (confirm('Yakin mau hapus materi ini?')) {
    try {
      await $fetch(`/api/materi/${materi.value.id}`, { method: 'DELETE' })
      toast.success('Materi berhasil dihapus!')
      navigateTo('/')
    } catch (e) {
      toast.error('Gagal menghapus materi')
    }
  }
}
</script>
