import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginPage from '../pages/LoginPage.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import OverviewPage from '../pages/OverviewPage.vue'
import StudentsPage from '../pages/StudentsPage.vue'
import AttendancePage from '../pages/AttendancePage.vue'
import MarksPage from '../pages/MarksPage.vue'
import ParentPage from '../pages/ParentPage.vue'

const routes = [
  { path: '/login', name: 'login', component: LoginPage, meta: { guest: true } },
  { path: '/', component: DashboardLayout, meta: { requiresAuth: true }, children: [
    { path: '', name: 'overview', component: OverviewPage },
    { path: 'students', name: 'students', component: StudentsPage, meta: { roles: ['admin'] } },
    { path: 'attendance', name: 'attendance', component: AttendancePage, meta: { roles: ['admin', 'teacher'] } },
    { path: 'marks', name: 'marks', component: MarksPage, meta: { roles: ['admin', 'teacher'] } },
    { path: 'parent', name: 'parent', component: ParentPage, meta: { roles: ['parent'] } },
  ] },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]
const router = createRouter({ history: createWebHistory(), routes })
router.beforeEach(to => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.user) return { name: 'login' }
  if (to.meta.guest && auth.user) return { name: 'overview' }
  if (to.meta.roles && !to.meta.roles.includes(auth.user?.role)) return { name: 'overview' }
})
export default router
