<template>
  <div>

    <div class="flex flex-wrap items-start justify-between">
      <h1 class="text-3xl mb-6">Setting</h1>
    </div>

    <div class="text-xl">Upload to Youtube Account</div>
    <UploadAccount/>

    <div class="text-xl">Admin Account</div>
    <div>{{ $store.state.currentAdmin || "Not Login" }}</div>
    <div v-if="$store.state.currentAdmin !== null" class="mt-1">
      <el-button @click="logout" type="danger">Logout</el-button>
    </div>

    <!--    <UploadYoutube/>-->
  </div>
</template>

<script>

import firebase from 'firebase'
// import UploadYoutube from "@/components/UploadYoutube";
import UploadAccount from "@/components/UploadAccount";

export default {
  name: "Setting",
  components: {
    // UploadYoutube,
    UploadAccount
  },
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