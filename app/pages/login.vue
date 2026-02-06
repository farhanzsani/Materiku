<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6">Admin Login</h2>
      
      <div class="space-y-4">
        <input v-model="form.username" type="text" placeholder="Username" class="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
        <input v-model="form.password" type="password" placeholder="Password" class="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
        
        <button @click="handleLogin" :disabled="loading" class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400">
          {{ loading ? 'Sabar...' : 'Masuk' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = ref({ username: '', password: '' })
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: form.value
    })
    alert('Login Berhasil!')
    // Setelah login, lempar ke halaman tambah materi
    navigateTo('/admin/tambah')
  } catch (err) {
    alert('Gagal login: Username/Password salah')
  } finally {
    loading.value = false
  }
}
</script>