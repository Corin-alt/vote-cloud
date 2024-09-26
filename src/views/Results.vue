<template>
  <div class="results">
    <h2>Résultats du vote</h2>
    <ul v-if="results.length">
      <li v-for="result in results" :key="result.candidatID">
        {{ result.prenom }} {{ result.nom }} - {{ result.nombreDeVotes }} votes ({{ result.pourcentage }}%)
      </li>
    </ul>
    <p v-else>Chargement des résultats...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'Results',
  setup() {
    const results = ref([])

    const fetchResults = async () => {
      try {
        results.value = [
          { candidatID: 1, prenom: 'John', nom: 'Doe', nombreDeVotes: 10, pourcentage: 50 },
          { candidatID: 2, prenom: 'Jane', nom: 'Smith', nombreDeVotes: 10, pourcentage: 50 }
        ]
      } catch (error) {
        console.error('Erreur lors du chargement des résultats:', error)
      }
    }

    onMounted(fetchResults)

    return { results }
  }
}
</script>