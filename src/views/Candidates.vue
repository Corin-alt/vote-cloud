<template>
  <div class="candidates">
    <h1>Liste des candidats</h1>
    <nav>
      <router-link to="/home">Acceuil</router-link> |
      <router-link to="/vote">Vote</router-link> |
      <router-link to="/results">Résultats</router-link>
    </nav>

    <ul v-if="candidates.length">
      <li v-for="candidate in candidates" :key="candidate.candidateID">
        <li>
          <strong>{{ candidate.firstname }} {{ candidate.name }}</strong>
          <p>{{ candidate.description }}</p>
        </li>
      </li>
    </ul>
    <p v-else-if="loading">Loading candidates...</p>
    <p v-else>No candidates found.</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Candidates",
  data() {
    return {
      candidates: [],
      loading: true,
      error: null
    };
  },
  mounted() {
    this.fetchCandidates();
  },
  methods: {
    async fetchCandidates() {
      try {
        const response = await axios.get('https://7nagspfib0.execute-api.eu-west-3.amazonaws.com/vote/candidats');
        console.log('API Response:', response.data);
        
        if (response.data.statusCode === 200) {
          this.candidates = Array.isArray(response.data.body) ? response.data.body : [];
        } else {
          this.error = "Error while fetching candidates";
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
        this.error = "An error occurred while loading candidates. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
    logout() {
      localStorage.removeItem('isAuthenticated');
      this.$router.push('/login');
    }
  }
};
</script>