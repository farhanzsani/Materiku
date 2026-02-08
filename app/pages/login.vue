<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-8">
    <div class="w-full max-w-sm sm:max-w-md bg-gray-800 border border-gray-700 p-6 sm:p-8 rounded-xl shadow-xl">
      <h2 class="text-xl sm:text-2xl font-bold text-center text-white mb-6">Admin Login</h2>
      
      <div class="space-y-4">
        <input v-model="form.username" type="text" placeholder="Username" class="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base" />
        <input v-model="form.password" type="password" placeholder="Password" class="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base" @keyup.enter="handleLogin" />
        
        <button @click="handleLogin" :disabled="loading" class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-500 disabled:bg-gray-600 transition text-sm sm:text-base">
          {{ loading ? 'Sabar...' : 'Masuk' }}
        </button>
      </div>
      
      <NuxtLink to="/" class="block text-center text-gray-400 hover:text-gray-300 mt-4 text-xs sm:text-sm transition">
        ← Kembali ke Beranda
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const toast = useToast()
const form = ref({ username: '', password: '' })
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: form.value
    })
    toast.success('Login Berhasil!')
    navigateTo('/')
  } catch (err) {
    toast.error('Gagal login: Username/Password salah')
  } finally {
    loading.value = false
  }
}
</script>