<template>
  <div class="h-screen flex flex-col">
    <!-- Loading State -->
    <div v-if="pending" class="flex-1 flex items-center justify-center">
      <p class="text-gray-400 text-xl">Memuat materi...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex-1 flex items-center justify-center flex-col gap-4">
      <p class="text-red-400 text-xl">Materi tidak ditemukan</p>
      <NuxtLink to="/" class="text-blue-400 hover:text-blue-300 hover:underline transition">Kembali ke Beranda</NuxtLink>
    </div>

    <!-- Editor -->
    <template v-else>
      <div class="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center gap-4">
        <NuxtLink to="/" class="text-gray-400 hover:text-gray-300 transition">← Kembali</NuxtLink>
        <input v-model="title" type="text" placeholder="Judul Materi..." class="text-xl font-bold outline-none flex-1 bg-transparent text-white placeholder-gray-500" />
        <button @click="updateMateri" :disabled="loading" class="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition">
          {{ loading ? 'Menyimpan...' : 'Simpan Perubahan' }}
        </button>
      </div>

      <div class="flex-1 flex overflow-hidden">
        <textarea v-model="content" class="w-1/2 p-4 font-mono bg-gray-800 text-gray-100 outline-none resize-none border-r border-gray-700 placeholder-gray-500" placeholder="Tulis Markdown di sini..."></textarea>
        <div class="w-1/2 p-4 overflow-y-auto prose prose-invert max-w-none bg-gray-900" v-html="renderMarkdown"></div>
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
