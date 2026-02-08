<template>
  <div class="h-screen flex flex-col">
    <!-- Loading State -->
    <div v-if="pending" class="flex-1 flex items-center justify-center">
      <p class="text-gray-400 text-lg sm:text-xl">Memuat materi...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex-1 flex items-center justify-center flex-col gap-4 px-4">
      <p class="text-red-400 text-lg sm:text-xl text-center">Materi tidak ditemukan</p>
      <NuxtLink to="/" class="text-blue-400 hover:text-blue-300 hover:underline transition text-sm sm:text-base">Kembali ke Beranda</NuxtLink>
    </div>

    <!-- Editor -->
    <template v-else>
      <!-- Header -->
      <div class="p-3 sm:p-4 bg-gray-800 border-b border-gray-700 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <div class="flex items-center gap-3 sm:gap-4 flex-1">
          <NuxtLink to="/" class="text-gray-400 hover:text-gray-300 transition text-sm sm:text-base shrink-0">← Kembali</NuxtLink>
          <input v-model="title" type="text" placeholder="Judul Materi..." class="text-lg sm:text-xl font-bold outline-none flex-1 bg-transparent text-white placeholder-gray-500 min-w-0" />
        </div>
        <button @click="updateMateri" :disabled="loading" class="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition text-sm sm:text-base w-full sm:w-auto">
          {{ loading ? 'Menyimpan...' : 'Simpan Perubahan' }}
        </button>
      </div>

      <!-- Editor - Stack on mobile, side-by-side on desktop -->
      <div class="flex-1 flex flex-col md:flex-row overflow-hidden">
        <textarea v-model="content" class="w-full md:w-1/2 p-3 sm:p-4 font-mono text-sm bg-gray-800 text-gray-100 outline-none resize-none border-b md:border-b-0 md:border-r border-gray-700 placeholder-gray-500 min-h-[200px] md:min-h-0" placeholder="Tulis Markdown di sini..."></textarea>
        <div class="w-full md:w-1/2 p-3 sm:p-4 overflow-y-auto prose prose-sm sm:prose-base prose-invert max-w-none bg-gray-900 min-h-[200px] md:min-h-0" v-html="renderMarkdown"></div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { marked } from 'marked'

const toast = useToast()

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const materiId = route.params.id

// Fetch data materi yang akan diedit
const { data: materi, pending, error } = await useFetch(`/api/materi/${materiId}`)

// State untuk form
const title = ref('')
const content = ref('')
const loading = ref(false)

// Set initial values setelah data dimuat
watchEffect(() => {
  if (materi.value) {
    title.value = materi.value.title || ''
    content.value = materi.value.content || ''
  }
})

// Render markdown preview
const renderMarkdown = computed(() => marked(content.value || ''))

// Handler update
const updateMateri = async () => {
  if (!title.value.trim()) {
    toast.warning('Judul tidak boleh kosong!')
    return
  }

  loading.value = true
  try {
    await $fetch(`/api/materi/${materiId}`, {
      method: 'PUT',
      body: { 
        title: title.value, 
        content: content.value 
      }
    })
    toast.success('Materi berhasil diupdate!')
    navigateTo('/')
  } catch (e) {
    toast.error('Gagal mengupdate materi')
  } finally {
    loading.value = false
  }
}
</script>
