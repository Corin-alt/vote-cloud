<template>
  <div class="results">
    <h2>Voting Results</h2>
    <!-- Loading message -->
    <div v-if="loading">Loading results...</div>
    <!-- Error message -->
    <div v-else-if="error" class="error">{{ error }}</div>
    <!-- Message when no votes have been cast -->
    <div v-else-if="totalVotes === 0">No votes have been cast yet.</div>
    <!-- List of results -->
    <ul v-else>
      <li v-for="result in results" :key="result.candidateID">
        {{ result.firstname }} {{ result.name }} - {{ result.voteCount }} votes ({{ result.percentage }}%)
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'Results',
  setup() {
    // Reactive references
    const results = ref([])
    const totalVotes = ref(0)
    const error = ref(null)
    const loading = ref(true)

    // Fetch voting results from API
    const fetchResults = async () => {
      try {
        const response = await axios.get('https://7nagspfib0.execute-api.eu-west-3.amazonaws.com/vote/result')
   
        const data = response.data
        if (data && data.body) {
          const bodyData = typeof data.body === 'string' ? JSON.parse(data.body) : data.body
          results.value = bodyData.results || []
          totalVotes.value = bodyData.totalVotes || 0
        } else {
          results.value = data.results || []
          totalVotes.value = data.totalVotes || 0
        }
      } catch (err) {
        console.error('Error loading results:', err)
        if (err.message.includes('CORS')) {
          error.value = 'CORS Error: Please configure CORS on your API Gateway to allow requests from your development server.'
        } else {
          error.value = 'An error occurred while loading the results. Please try again later.'
        }
      } finally {
        loading.value = false
      }
    }

    // Fetch results when component is mounted
    onMounted(fetchResults)

    return { results, totalVotes, error, loading }
  }
}
</script>

<style scoped>
.results {
  margin: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.error {
  color: red;
}
</style>