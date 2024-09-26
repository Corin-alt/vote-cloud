import { createApp } from 'vue'
import App from './App.vue'
import { Amplify } from 'aws-amplify'
import awsconfig from '../amplify_outputs.json'
import router from './router/index.js'

Amplify.configure(awsconfig)

createApp(App)
  .use(router)
  .mount('#app')
