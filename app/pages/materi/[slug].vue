<template>
  <div class="max-w-4xl mx-auto p-6">
    <!-- Header dengan tombol kembali -->
    <div class="mb-8">
      <NuxtLink to="/" class="text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-2 mb-4 transition">
        <span>←</span> Kembali ke Daftar Materi
      </NuxtLink>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="text-center py-20">
      <p class="text-gray-400 text-xl">Memuat materi...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20">
      <p class="text-red-400 text-xl">{{ error.statusMessage || 'Materi tidak ditemukan' }}</p>
      <NuxtLink to="/" class="mt-4 inline-block text-blue-400 hover:text-blue-300 hover:underline transition">
        Kembali ke Beranda
      </NuxtLink>
    </div>

    <!-- Content -->
    <article v-else-if="materi" class="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-8">
      <header class="mb-8 pb-6 border-b border-gray-700">
        <h1 class="text-4xl font-extrabold text-white mb-4">{{ materi.title }}</h1>
        <div class="flex items-center gap-4 text-gray-400 text-sm">
          <span>Oleh: <strong class="text-gray-300">{{ materi.author?.username || 'Admin' }}</strong></span>
          <span>•</span>
          <span>{{ new Date(materi.createdAt).toLocaleDateString('id-ID', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }) }}</span>
        </div>
      </header>

      <div class="prose prose-lg prose-invert max-w-none" v-html="renderedContent"></div>
    </article>

    <!-- Admin Actions -->
    <div v-if="materi && isAdmin" class="mt-6 flex gap-4">
      <NuxtLink :to="`/admin/edit/${materi.id}`" class="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2 rounded-lg font-medium transition">
        Edit Materi
      </NuxtLink>
      <button @click="handleDelete" class="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg font-medium transition">
        Hapus Materi
      </button>
    </div>
  </div>
</template>

<script setup>
import { marked } from 'marked'

const toast = useToast()
const route = useRoute()
const slug = route.params.slug

// Fetch materi berdasarkan slug
const { data: materi, pending, error } = await useFetch(`/api/materi/${slug}`)

// Render markdown ke HTML
const renderedContent = computed(() => {
  if (materi.value?.content) {
    return marked(materi.value.content)
  }
  return ''
})

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
