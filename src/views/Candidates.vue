<template>
  <div class="candidates">
    <h1>List of Candidates</h1>
    <!-- Navigation menu -->
    <nav>
      <router-link to="/home">Home</router-link> |
      <router-link to="/vote">Vote</router-link> |
      <router-link to="/results">Results</router-link>
    </nav>

    <!-- List of candidates -->
    <ul v-if="candidates.length">
      <li v-for="candidate in candidates" :key="candidate.candidateID">
        <strong>{{ candidate.firstname }} {{ candidate.name }}</strong>
        <p>{{ candidate.description }}</p>
      </li>
    </ul>
    <!-- Loading message -->
    <p v-else-if="loading">Loading candidates...</p>
    <!-- Message when no candidates are found -->
    <p v-else>No candidates found.</p>
    <!-- Error message display -->
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
    // Method to fetch candidates from the API
    async fetchCandidates() {
      try {
        const response = await axios.get('https://7nagspfib0.execute-api.eu-west-3.amazonaws.com/vote/candidats');
        if (response.data.statusCode === 200) {
          // Ensure candidates is always an array
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
    // Logout method
    logout() {
      localStorage.removeItem('isAuthenticated');
      this.$router.push('/login');
    }
  }
};
</script>