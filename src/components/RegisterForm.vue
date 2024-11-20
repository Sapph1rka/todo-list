<template>
  <div class="register-form">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <p class="help-text">Already registered? <a @click.prevent="this.$router.push('/login');">Sign in!</a></p>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import '../assets/reglogstyles.css';
import axios from 'axios';
//import router from '../router/index';


export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/profile/register/', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        alert(response.status);
        this.$router.push('/login');
      } catch (error) {
        alert('Registration failed');
        console.error(error);
      }
    },
  },
};
/*
const redirectToLogin = () => {
  router.push('/login');
};

const handleRegister = () => {
  router.push('/login');
};
*/
</script>
