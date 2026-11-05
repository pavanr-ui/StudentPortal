<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
defineProps({ open: Boolean })
defineEmits(['navigate'])
const auth = useAuthStore()
const links = computed(() => {
  const role = auth.user?.role
  const base = [{ to: '/', label: 'Overview', icon: '▦' }]
  if (role === 'admin') base.push({ to: '/students', label: 'Students', icon: '♙' })
  if (['admin', 'teacher'].includes(role)) base.push({ to: '/attendance', label: 'Attendance', icon: '◷' }, { to: '/marks', label: 'Examinations', icon: '▤' })
  if (role === 'parent') base.push({ to: '/parent', label: 'My child', icon: '♡' })
  return base
})
</script>
<template>
  <aside class="sidebar" :class="{ 'sidebar-open': open }">
    <RouterLink to="/" class="brand" @click="$emit('navigate')"><span class="brand-mark"><span class="mark-monogram">Me</span></span><span><strong class="brand-name"><span>Me</span><span class="brand-star">Star</span></strong><small>ACADEMY</small></span></RouterLink>
    <div class="school-switch"><span class="school-badge"><span>Me</span></span><span class="school-name">MeStar Academy<small>Academic year 2024–25</small></span><span class="chevron">⌄</span></div>
    <p class="nav-label">MENU</p>
    <nav class="nav-list"><RouterLink v-for="link in links" :key="link.to" :to="link.to" class="nav-link" exact-active-class="active" @click="$emit('navigate')"><span class="nav-icon">{{ link.icon }}</span>{{ link.label }}<span v-if="link.label === 'Attendance'" class="nav-dot"></span></RouterLink></nav>
    <div class="sidebar-bottom"><div class="help-card"><span class="help-icon">✦</span><strong>Need a hand?</strong><p>Visit our help center for quick answers.</p><button>Visit help center <span>↗</span></button></div><div class="sidebar-foot"><span class="online-dot"></span> All systems operational <span class="foot-version">v2.4.0</span></div></div>
  </aside>
</template>
