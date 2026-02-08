<template>
  <div class="dark">
    <div class="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <main class="flex-1">
        <NuxtPage />
      </main>
      
      <!-- Footer -->
      <footer class="py-4 sm:py-6 border-t border-gray-800">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p class="text-gray-500 text-xs sm:text-sm">
            Made with ❤️ by 
            <a href="https://github.com/farhanzsani" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 transition">
              farhanzsani
            </a>
          </p>
        </div>
      </footer>
      
      <!-- Toast Container - Responsive positioning -->
      <div class="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 z-50 flex flex-col gap-2 sm:gap-3">
        <TransitionGroup name="toast">
          <div 
            v-for="toast in toasts" 
            :key="toast.id"
            :class="[
              'px-4 sm:px-5 py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg backdrop-blur-sm border flex items-center gap-2 sm:gap-3 sm:min-w-[300px] sm:max-w-[400px]',
              toast.type === 'success' ? 'bg-green-600/90 border-green-500 text-white' : '',
              toast.type === 'error' ? 'bg-red-600/90 border-red-500 text-white' : '',
              toast.type === 'info' ? 'bg-blue-600/90 border-blue-500 text-white' : '',
              toast.type === 'warning' ? 'bg-amber-600/90 border-amber-500 text-white' : ''
            ]"
          >
            <!-- Icon -->
            <div class="shrink-0">
              <!-- Success -->
              <svg v-if="toast.type === 'success'" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <!-- Error -->
              <svg v-else-if="toast.type === 'error'" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              <!-- Info -->
              <svg v-else-if="toast.type === 'info'" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <!-- Warning -->
              <svg v-else class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <!-- Message -->
            <p class="font-medium text-xs sm:text-sm">{{ toast.message }}</p>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
const { toasts } = useToast()
</script>

<style>
.toast-enter-active {
  animation: slideIn 0.3s ease-out;
}

.toast-leave-active {
  animation: slideOut 0.3s ease-in;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
</style>