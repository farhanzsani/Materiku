<template>
  <div class="h-screen flex flex-col">
    <div class="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center gap-4">
      <NuxtLink to="/" class="text-gray-400 hover:text-gray-300 transition">← Kembali</NuxtLink>
      <input v-model="title" type="text" placeholder="Judul Materi..." class="text-xl font-bold outline-none flex-1 bg-transparent text-white placeholder-gray-500" />
      <button @click="simpanMateri" class="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-medium transition">Terbitkan</button>
    </div>

    <div class="flex-1 flex overflow-hidden">
      <textarea v-model="content" class="w-1/2 p-4 font-mono bg-gray-800 text-gray-100 outline-none resize-none border-r border-gray-700 placeholder-gray-500" placeholder="Tulis Markdown di sini..."></textarea>
      <div class="w-1/2 p-4 overflow-y-auto prose prose-invert max-w-none bg-gray-900" v-html="renderMarkdown"></div>
    </div>
  </div>
</template>

<script setup>
import { marked } from 'marked'

const toast = useToast()

definePageMeta({
  middleware: 'auth'
})

const title = ref('')
const content = ref('')

const renderMarkdown = computed(() => marked(content.value || ''))

const simpanMateri = async () => {
  if (!title.value.trim()) {
    toast.warning('Judul tidak boleh kosong!')
    return
  }
  
  try {
    await $fetch('/api/materi/create', {
      method: 'POST',
      body: { title: title.value, content: content.value }
    })
    toast.success('Materi berhasil diterbitkan!')
    navigateTo('/')
  } catch (e) {
    toast.error('Gagal menyimpan materi')
  }
}
</script>