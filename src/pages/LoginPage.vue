<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const email = ref('admin@mestar.edu')
const password = ref('admin123')
const showPassword = ref(false)
const formError = ref('')
function submit() {
  formError.value = ''
  if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) { formError.value = 'Enter a valid school email address.'; return }
  if (password.value.length < 6) { formError.value = 'Password must be at least 6 characters.'; return }
  if (auth.login(email.value, password.value)) router.push('/')
  else formError.value = auth.error
}
function fill(role) {
  const demo = { admin: ['admin@mestar.edu', 'admin123'], teacher: ['teacher@mestar.edu', 'teacher123'], parent: ['parent@mestar.edu', 'parent123'] }[role]
  email.value = demo[0]; password.value = demo[1]; formError.value = ''
}
</script>
<template>
  <div class="login-page"><section class="login-visual"><RouterLink to="/login" class="brand login-brand"><span class="brand-mark"><span class="mark-monogram">Me</span></span><span><strong class="brand-name"><span>Me</span><span class="brand-star">Star</span></strong><small>ACADEMY</small></span></RouterLink><div class="visual-copy"><span class="eyebrow light-eyebrow"><i></i> LEARNING, MADE VISIBLE</span><h1>Every student's<br />journey, <em>in focus.</em></h1><p>A thoughtful space for the people shaping tomorrow. Track progress, celebrate growth, and stay connected.</p><div class="visual-stats"><div><strong>1,248</strong><span>Students learning</span></div><i></i><div><strong>96.8%</strong><span>Attendance rate</span></div></div></div><div class="visual-art"><div class="art-orb orb-one"></div><div class="art-orb orb-two"></div><div class="art-book"><div class="book-page"></div><div class="book-page second"></div><span>✦</span></div><div class="art-stars">✦　·　✧<br />　·　✦　·</div></div><div class="login-visual-foot">MESTAR ACADEMY <span>EST. 1998</span></div></section>
    <section class="login-panel"><div class="login-form-wrap"><div class="welcome-mark">✦</div><p class="eyebrow">WELCOME BACK</p><h2>Sign in to your account</h2><p class="login-subtitle">Your classroom, all in one place.</p><form @submit.prevent="submit"><label for="email">School email</label><div class="input-wrap"><span class="input-icon">✉</span><input id="email" v-model="email" type="email" autocomplete="username" placeholder="you@mestar.edu" required /></div><label for="password">Password</label><div class="input-wrap"><span class="input-icon">♧</span><input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" autocomplete="current-password" placeholder="Enter your password" required minlength="6" /><button type="button" class="show-password" @click="showPassword = !showPassword">{{ showPassword ? 'Hide' : 'Show' }}</button></div><div v-if="formError" class="form-error" role="alert">{{ formError }}</div><div class="login-options"><label class="remember"><input type="checkbox" checked /> <span>Remember me</span></label><a href="#forgot" @click.prevent="formError = 'Please contact your school administrator to reset your password.'">Forgot password?</a></div><button class="primary-button login-submit" type="submit">Sign in <span>→</span></button></form><div class="demo-accounts"><div class="demo-title"><span>DEMO ACCOUNTS</span><i></i></div><div class="demo-buttons"><button @click="fill('admin')"><span class="demo-dot dot-admin"></span>Admin</button><button @click="fill('teacher')"><span class="demo-dot dot-teacher"></span>Teacher</button><button @click="fill('parent')"><span class="demo-dot dot-parent"></span>Parent</button></div><small>Select a role to fill its demo credentials.</small></div><div class="login-privacy">🔒 &nbsp;Your school data is protected and private.</div></div><footer class="login-foot">© 2025 MeStar Academy <span>Privacy&nbsp; · &nbsp;Support</span></footer></section></div>
</template>
