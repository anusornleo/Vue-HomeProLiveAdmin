<template>
  <div>
    <div class="flex flex-wrap items-start justify-between">
      <h1 class="text-3xl mb-6">Setting</h1>
    </div>

    <div>Current Email : {{ $store.state.currentAdmin || "Not Login" }}</div>
    <div v-if="$store.state.currentAdmin !== null" class="mt-10">
      <el-button @click="logout" type="danger">Logout</el-button>
    </div>
  </div>
</template>

<script>

import firebase from 'firebase'

export default {
  name: "Setting",
  methods: {
    // Sign out
    logout() {
      firebase.auth().signOut().then(() => {
        this.$store.commit("setCurrentAdmin", null)
        this.$router.push({path: '/login'})
      })
    }
  }
};
</script>