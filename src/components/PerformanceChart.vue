<script setup>
import { computed } from 'vue'
import { chartValues } from '../data/seed'

const points = computed(() => chartValues.map((value, index) => `${32 + index * 65},${170 - value * 1.37}`).join(' '))
const area = computed(() => `32,170 ${points.value} 487,170`)
</script>

<template>
  <div class="chart-wrap">
    <div class="chart-y-labels"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
    <svg class="performance-svg" viewBox="0 0 520 190" role="img" aria-label="Student performance trending upward over eight months">
      <defs>
        <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#8c7cf0" stop-opacity=".2" />
          <stop offset="100%" stop-color="#8c7cf0" stop-opacity="0" />
        </linearGradient>
      </defs>
      <line v-for="y in [33, 67, 101, 135, 170]" :key="y" x1="25" :y1="y" x2="500" :y2="y" class="chart-gridline" />
      <polygon :points="area" fill="url(#chartFill)" class="chart-area" />
      <polyline :points="points" pathLength="1" class="chart-line" />
      <circle v-for="(value, index) in chartValues" :key="index" :cx="32 + index * 65" :cy="170 - value * 1.37" r="4" class="chart-point" :style="{ animationDelay: `${450 + index * 75}ms` }" />
    </svg>
    <div class="chart-months"><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span></div>
  </div>
</template>
