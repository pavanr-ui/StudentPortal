<script setup>
defineProps({ label: String, value: String, change: String, tone: String, icon: String, note: String })
</script>
<template><article class="stat-card"><div class="stat-top"><span>{{ label }}</span><span class="stat-icon" :class="tone">{{ icon }}</span></div><div class="stat-value">{{ value }}</div><div class="stat-meta"><span class="trend">↗ {{ change }}</span><span>{{ note }}</span></div></article></template>
