<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AppSidebar from '../components/AppSidebar.vue'
import AppHeader from '../components/AppHeader.vue'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const mobileOpen = ref(false)
const pageTitle = computed(() => ({ overview: 'Overview', students: 'Students', attendance: 'Attendance', marks: 'Examinations', parent: 'My child' }[route.name] || 'Overview'))
function logout() { auth.logout(); router.push('/login') }
</script>
<template>
  <div class="app-shell">
    <AppSidebar :open="mobileOpen" @navigate="mobileOpen = false" />
    <div class="main-area"><AppHeader :title="pageTitle" @menu="mobileOpen = !mobileOpen" @logout="logout" /><main class="page-content"><RouterView /></main><footer class="app-footer">© 2025 MeStar Academy <span>Made for brighter futures <i>✦</i></span></footer></div>
    <button v-if="mobileOpen" class="scrim" aria-label="Close navigation" @click="mobileOpen = false"></button>
  </div>
</template>
