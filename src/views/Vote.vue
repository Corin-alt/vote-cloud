<template>
  <div class="vote">
    <h2>Voter pour un candidat</h2>
    <form @submit.prevent="submitVote">
      <select v-model="selectedCandidate">
        <option v-for="candidate in candidates" :key="candidate.candidatID" :value="candidate.candidatID">
          {{ candidate.prenom }} {{ candidate.nom }}
        </option>
      </select>
      <button type="submit">Voter</button>
    </form>
    <p v-if="voteMessage">{{ voteMessage }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
// Importez ici votre service API ou utilisez Amplify directement

export default {
  name: 'Vote',
  setup() {
    const candidates = ref([])
    const selectedCandidate = ref('')
    const voteMessage = ref('')

    const fetchCandidates = async () => {
      try {
        candidates.value = [
          { candidatID: 1, prenom: 'John', nom: 'Doe' },
          { candidatID: 2, prenom: 'Jane', nom: 'Smith' }
        ]
      } catch (error) {
        console.error('Erreur lors du chargement des candidats:', error)
      }
    }

    const submitVote = async () => {
      if (!selectedCandidate.value) {
        voteMessage.value = 'Veuillez sélectionner un candidat.'
        return
      }

      try {
        // await API.post('votingApi', '/vote', { candidatID: selectedCandidate.value })
        voteMessage.value = 'Vote enregistré avec succès!'
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement du vote:', error)
        voteMessage.value = 'Une erreur est survenue lors de l\'enregistrement du vote.'
      }
    }

    onMounted(fetchCandidates)

    return { candidates, selectedCandidate, voteMessage, submitVote }
  }
}
</script>