<template>
  <div class="candidates">
    <h2>Liste des candidats</h2>
    <ul v-if="candidates.length">
      <li v-for="candidate in candidates" :key="candidate.candidatID">
        {{ candidate.prenom }} {{ candidate.nom }} - {{ candidate.description }}
      </li>
    </ul>
    <p v-else>Chargement des candidats...</p>
  </div>
</template>

<script>
export default {
  name: "Candidates",
  data() {
    return {
      candidates: []
    };
  },
  mounted() {
    this.fetchCandidates();
  },
  methods: {
    fetchCandidates() {
      setTimeout(() => {
        this.candidates = [
          { candidatID: 1, prenom: "John", nom: "Doe", description: "Experience in management" },
          { candidatID: 2, prenom: "Jane", nom: "Smith", description: "Expert in technology" }
        ];
      }, 2000); 
    }
  }
};
</script>