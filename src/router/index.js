import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import UsersList from '../components/UsersList.vue';
import ToDoList from '../App.vue';
import AdminForm from '../components/AdminForm.vue';


const routes = [
  { path: '/', name: 'home', component: ToDoList, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: LoginForm },
  { path: '/register', name: 'register', component: RegisterForm },
  { path: '/users', name: 'users', component: UsersList, meta: { requiresAuth: true } },
  { path: '/admin', name: 'admin', component: AdminForm, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log('Redirecting to /register');
    next('/register');
  } else if (isAuthenticated && (to.path === '/login' || to.path === '/register')) {
    next('/');
  } else {
    next();
  }
});

export default router;
