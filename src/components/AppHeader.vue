<script setup>
import { useAuthStore } from '../stores/auth'
defineProps({ title: String })
defineEmits(['menu', 'logout'])
const auth = useAuthStore()
</script>
<template>
  <header class="topbar"><div class="topbar-left"><button class="mobile-menu" aria-label="Open menu" @click="$emit('menu')">☰</button><span class="breadcrumb">Dashboard</span><span class="crumb-slash">/</span><strong>{{ title }}</strong></div><div class="topbar-right"><span class="term-pill"><span></span> Term 2, 2024–25 <i>⌄</i></span><button class="icon-button search-button" aria-label="Search">⌕</button><button class="icon-button notification-button" aria-label="Notifications">♧<b></b></button><span class="top-separator"></span><button class="profile-button" @click="$emit('logout')"><span class="avatar avatar-purple">{{ auth.user?.initials }}</span><span class="profile-copy"><strong>{{ auth.user?.name }}</strong><small>{{ auth.user?.title }}</small></span><span class="profile-chevron">⌄</span></button></div></header>
</template>
