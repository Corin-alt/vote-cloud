<template>
  <div class="home">
    <h1>Bienvenue sur l'application de vote</h1>
    <nav>
      <router-link to="/vote">Voter</router-link> |
      <router-link to="/candidates">Liste des candidats</router-link> |
      <router-link to="/results">Voir les résultats</router-link>
    </nav>
    <button @click="logout">Déconnexion</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('isAuthenticated');
      this.$router.push('/login');
    }
  }
};
</script>
