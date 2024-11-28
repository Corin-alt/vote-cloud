<template>
  <div class="vote">

    <!-- Navigation menu -->
    <nav>
      <router-link to="/home">Home</router-link> |
      <router-link to="/candidates">List of candidates</router-link>
    </nav>

    <h2>Vote for a Candidate</h2>
    <!-- Loading message -->
    <div v-if="loading">Loading candidates...</div>
    <!-- Voting form -->
    <form v-if="!hasVoted" @submit.prevent="submitVote">
      <select v-model="selectedCandidate">
        <option value="">Select a candidate</option>
        <option v-for="candidate in candidates" :key="candidate.candidateID" :value="candidate.candidateID">
          {{ candidate.firstname }} {{ candidate.name }}
        </option>
      </select>
      <button type="submit" :disabled="!selectedCandidate">Vote</button>
    </form>
    <!-- Message for users who have already voted -->
    <div v-else class="already-voted">
      <p class="error">You have already voted. Thank you for your participation!</p>
    </div>
    <!-- Display messages (error or success) -->
    <p v-if="message && !hasVoted" :class="{ 'error': isError, 'success': !isError }">{{ message }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'  // Import useRouter

export default {
  name: 'Vote',
  setup() {
    const router = useRouter()  // Initialize router
    const candidates = ref([])
    const selectedCandidate = ref('')
    const message = ref('')
    const isError = ref(false)
    const loading = ref(true)
    const hasVoted = ref(false)

    const fetchCandidates = async () => {
      try {
        const response = await axios.get('https://7nagspfib0.execute-api.eu-west-3.amazonaws.com/vote/candidats')
        const data = response.data
        candidates.value = Array.isArray(data) ? data :
                            (data.body ? (typeof data.body === 'string' ? JSON.parse(data.body) : data.body) : [])
      } catch (error) {
        console.error('Error loading candidates:', error)
        message.value = 'Error loading candidates.'
        isError.value = true
      } finally {
        loading.value = false
      }
    }

    const submitVote = async () => {
      if (!selectedCandidate.value) {
        message.value = 'Please select a candidate.'
        isError.value = true
        return
      }

      const userId = localStorage.getItem('userID')
      if (!userId) {
        message.value = 'You must be logged in to vote.'
        isError.value = true
        return
      }

      try {
        const response = await axios.post('https://7nagspfib0.execute-api.eu-west-3.amazonaws.com/vote/vote', {
          candidateID: selectedCandidate.value,
          userID: userId
        })

        const data = response.data

        if (response.status === 200) {
            message.value = 'Vote successfully recorded'
            isError.value = false
            hasVoted.value = true
            selectedCandidate.value = ''
            // Redirect to results page
            router.push('/results')
        } else {
          message.value = 'You have already voted. Thank you for your participation!'
            isError.value = true
            hasVoted.value = true
        }
      } catch (error) {
        console.error('Error recording vote:', error)
        message.value = 'An error occurred while recording the vote.'
        isError.value = true
      }
    }

    onMounted(async () => {
      await fetchCandidates()
    })

    return {
      candidates,
      selectedCandidate,
      message,
      isError,
      loading,
      hasVoted,
      submitVote
    }
  }
}
</script>

<style scoped>
.vote {
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
}

.vote h1 {
  color: var(--text-color);
  margin-bottom: 20px;
}

.vote nav {
  margin: 20px 0;
}

.vote nav a {
  color: var(--primary-color);
  text-decoration: none;
  margin: 0 10px;
  font-weight: bold;
}

.vote nav a:hover {
  color: #5dade2;
}

.vote form {
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: var(--card-background);
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.vote select {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  color: var(--text-color);
  border-radius: 4px;
}

.vote button {
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 4px;
}

.vote button:hover {
  background-color: #eb4d4b;
}

.error {
  color: #e74c3c;
  margin-top: 10px;
}

.success {
  color: #2ecc71;
  margin-top: 10px;
}

.already-voted {
  background-color: var(--card-background);
  padding: 15px;
  border-radius: 5px;
  text-align: center;
  margin-top: 20px;
}
</style>