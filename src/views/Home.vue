<template>
  <div class="home">
    <!-- Main title of the application with user's name -->
    <h1>Welcome {{ userName }}</h1>
    
    <!-- Navigation menu -->
    <nav>
      <!-- Router links to different sections of the application -->
      <router-link to="/vote">Vote</router-link> |
      <router-link to="/candidates">List of candidates</router-link> |
      <router-link to="/results">View results</router-link>
    </nav>
    
    <!-- Logout button -->
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: ''
    }
  },
  created() {
    // Retrieve the name from localStorage when the component is created
    this.userName = localStorage.getItem('name') || 'Guest';
  },
  methods: {
    // Logout method
    logout() {
      // Remove authentication status and name from local storage
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('name');
      // Redirect to login page
      this.$router.push('/login');
    }
  }
};
</script>