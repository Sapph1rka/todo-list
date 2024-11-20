<template>
  <div class="login-form">
    <h1>Login</h1>
    <form @submit.prevent="loginUser">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p class="help-text">Don't have an account? <a @click.prevent="this.$router.replace('/');">Sign Up!</a></p>
  </div>
</template>

<script>
  import axios from 'axios';
  //import router from '../router/index';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/profile/register/', {
          username: this.username,
          password: this.password,
        });
        this.$router.push('/');
        alert(response.status);
        alert('Login successful');
        this.$router.push('/tasks');
      } catch (error) {
        alert('Invalid credentials');
        console.error(error);
      }
    },
  },
};
/*
const redirectToRegister = () => {
  router.replace('/register');
};


const handleLogin = () => {
  router.replace('/');
};
*/

</script>