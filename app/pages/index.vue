<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-4xl font-extrabold text-white">MateriKu</h1>
      
      <!-- Admin Actions -->
      <div v-if="isAdmin" class="flex items-center gap-3">
        <NuxtLink to="/admin/tambah" class="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-full font-medium transition">
          + Tambah Materi
        </NuxtLink>
        <button @click="handleLogout" class="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-full font-medium transition">
          Logout
        </button>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="mb-8">
      <div class="relative">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Cari materi..." 
          class="w-full p-4 pl-12 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <p v-if="searchQuery && filteredMateris.length === 0" class="text-gray-400 text-sm mt-2">
        Tidak ada materi yang cocok dengan "{{ searchQuery }}"
      </p>
      <p v-else-if="searchQuery" class="text-gray-400 text-sm mt-2">
        Menampilkan {{ filteredMateris.length }} hasil untuk "{{ searchQuery }}"
      </p>
    </div>

    <div v-if="filteredMateris && filteredMateris.length > 0" class="grid gap-6">
      <div v-for="item in filteredMateris" :key="item.id" class="p-6 bg-gray-800 border border-gray-700 rounded-2xl shadow-lg hover:shadow-xl hover:border-gray-600 transition flex justify-between items-center">
        
        <div class="flex-1">
          <NuxtLink :to="`/materi/${item.slug}`" class="text-2xl font-bold text-blue-400 hover:text-blue-300 hover:underline transition">
            {{ item.title }}
          </NuxtLink>
          <p class="text-gray-400 text-sm mt-1">Diterbitkan pada {{ new Date(item.createdAt).toLocaleDateString('id-ID') }}</p>
        </div>

        <div v-if="isAdmin" class="flex items-center gap-4 ml-4">
          <NuxtLink :to="`/admin/edit/${item.id}`" class="text-amber-400 font-semibold hover:text-amber-300 transition">
            Edit
          </NuxtLink>
          <button @click="confirmDelete(item.id)" class="text-red-400 font-semibold hover:text-red-300 transition">
            Hapus
          </button>
        </div>

      </div>
    </div>

    <div v-else-if="!searchQuery" class="text-center py-20 text-gray-500">
      <p class="text-xl">Belum ada materi nih. Yuk nulis!</p>
    </div>
  </div>
</template>

<script setup>
// Ambil data materi dari API
const { data: materis, refresh } = await useFetch('/api/materi')

// Search query
const searchQuery = ref('')

// Filter materi berdasarkan search query
const filteredMateris = computed(() => {
  if (!materis.value) return []
  if (!searchQuery.value.trim()) return materis.value
  
  const query = searchQuery.value.toLowerCase().trim()
  return materis.value.filter(item => 
    item.title.toLowerCase().includes(query)
  )
})

// Cek status login via API
const { data: authData, refresh: refreshAuth } = await useFetch('/api/auth/me')
const isAdmin = computed(() => authData.value?.authenticated === true)

// Fungsi Logout
const handleLogout = async () => {
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
    alert('Logout berhasil!')
    await refreshAuth()
    navigateTo('/')
  } catch (e) {
    alert('Gagal logout')
  }
}

// Fungsi Hapus
const confirmDelete = async (id) => {
  if (confirm('Yakin mau hapus materi ini?')) {
    try {
      await $fetch(`/api/materi/${id}`, { method: 'DELETE' })
      alert('Materi berhasil dihapus!')
      refresh()
    } catch (e) {
      alert('Gagal menghapus materi')
    }
  }
}
</script>