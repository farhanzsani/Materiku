<template>
  <div class="h-screen flex flex-col">
    <div class="p-4 bg-white border-b flex justify-between items-center">
      <input v-model="title" type="text" placeholder="Judul Materi..." class="text-xl font-bold outline-none w-full" />
      <button @click="simpanMateri" class="bg-green-600 text-white px-6 py-2 rounded-lg">Terbitkan</button>
    </div>

    <div class="flex-1 flex overflow-hidden">
      <textarea v-model="content" class="w-1/2 p-4 font-mono bg-gray-50 outline-none resize-none border-r" placeholder="Tulis Markdown di sini..."></textarea>
      <div class="w-1/2 p-4 overflow-y-auto prose max-w-none" v-html="renderMarkdown"></div>
    </div>
  </div>
</template>

<script setup>
import { marked } from 'marked'


definePageMeta({
  middleware: 'auth'
})

const title = ref('')
const content = ref('')

const renderMarkdown = computed(() => marked(content.value || ''))

const simpanMateri = async () => {
  try {
    await $fetch('/api/materi/create', {
      method: 'POST',
      body: { title: title.value, content: content.value }
    })
    alert('Materi tersimpan!')
    navigateTo('/')
  } catch (e) {
    alert('Gagal menyimpan materi')
  }
}
</script>