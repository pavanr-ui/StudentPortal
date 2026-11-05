import { defineStore } from 'pinia'
import { ref } from 'vue'
import { accounts } from '../data/seed'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(sessionStorage.getItem('school-demo-user') || 'null'))
  const error = ref('')
  function login(email, password) {
    const account = accounts.find(item => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password)
    if (!account) { error.value = 'Email or password is incorrect.'; return false }
    const { password: _secret, ...safeUser } = account
    user.value = safeUser
    sessionStorage.setItem('school-demo-user', JSON.stringify(safeUser))
    error.value = ''
    return true
  }
  function logout() { user.value = null; sessionStorage.removeItem('school-demo-user') }
  return { user, error, login, logout }
})
