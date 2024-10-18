<template>
  <!-- Main login container -->
  <div class="login">
    <h2>Login</h2>
    <!-- Login form with prevent default submit behavior -->
    <form @submit.prevent="login">
      <!-- Email input field -->
      <input v-model.trim="email" type="email" placeholder="Email address" required>
      <!-- Password input field -->
      <input v-model.trim="password" type="password" placeholder="Password" required>
      <!-- Submit button with dynamic text based on loading state -->
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Logging in...' : 'Log in' }}
      </button>
    </form>
    <!-- Error message display -->
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Connexion",
  data() {
    return {
      email: "",
      password: "",
      error: null,
      isLoading: false
    };
  },
  methods: {
    async login() {
      // Set loading state and clear previous errors
      this.isLoading = true;
      this.error = null;
      
      try {
        // Send login request to the API
        const response = await axios.post('https://7nagspfib0.execute-api.eu-west-3.amazonaws.com/vote/auth', {
          email: this.email,
          password: this.password
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const responseBody = response.data;

        // Check if login was successful
        if (response.status === 200) {
          await this.handleSuccessfulLogin(responseBody);
        } else {
          throw new Error(responseBody.message || 'Authentication failed');
        }
      } catch (error) {
        // Handle different types of errors
        if (error.response) {
          // Error response from server
          console.error('Error response:', error.response.data);
          const errorBody = typeof error.response.data === 'string' ? JSON.parse(error.response.data) : error.response.data;
          this.error = errorBody.message || "Authentication failed";
        } else if (error.request) {
          // No response received from server
          console.error('No response received:', error.request);
          this.error = "Unable to contact the server. Please try again later.";
        } else {
          // Error in setting up the request
          console.error('Error setting up request:', error.message);
          this.error = error.message || "An error occurred. Please try again.";
        }
      } finally {
        // Reset loading state
        this.isLoading = false;
      }
    },
    
    async handleSuccessfulLogin(data) {
      try {
        const userID = data.body.userID;
        const name = data.body.name;
        
        if (userID) {
          // Store user information in local storage
          this.setLocalStorage('userID', userID);
          this.setLocalStorage('name', name);
          this.setLocalStorage('isAuthenticated', 'true');
        } else {
          this.error = "Failed to retrieve user ID";
          return;
        }
        
        // Redirect user after successful login
        const redirectPath = this.$route.query.redirect || '/home';
        await this.$router.push(redirectPath);
      } catch (error) {
        console.error('Error during post-login process:', error);
        this.error = "Error finalizing login";
      }
    },
    
    setLocalStorage(key, value) {
      // Helper method to safely set items in local storage
      if (value !== undefined && value !== null) {
        localStorage.setItem(key, value);
      } else {
        console.warn(`Attempted to set ${key} in localStorage with undefined or null value`);
      }
    }
  }
};
</script>

<style scoped>
  /* Styles for the login form */
  .login {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  input {
    margin-bottom: 10px;
    padding: 8px;
  }

  button {
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }

  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  .error {
    color: red;
    margin-top: 10px;
  }
</style>