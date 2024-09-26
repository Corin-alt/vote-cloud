<template>
  <div class="login">
    <h2>Connexion</h2>
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Nom d'utilisateur" required>
      <input v-model="password" type="password" placeholder="Mot de passe" required>
      <button type="submit">Se connecter</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: null,
    };
  },
  methods: {
    login() {
      if (this.username === "admin" && this.password === "admin") {
        localStorage.setItem('isAuthenticated', false);
        const redirectPath = this.$route.query.redirect || '/home';
        this.$router.push(redirectPath);
      } else {
        this.error = "Nom d'utilisateur ou mot de passe incorrect";
      }
    }
  }
};
</script>
