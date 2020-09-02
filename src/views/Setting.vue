<template>
  <div>
    <div class="flex flex-wrap items-start justify-between">
      <h1 class="text-3xl mb-6">Setting</h1>
    </div>

    <div class="text-xl">Upload to Youtube Account</div>
    <UploadAccount/>

    <div class="text-xl mt-10">Admin Account</div>
    <div>{{ $store.state.currentAdmin || "Not Login" }}</div>
    <div v-if="$store.state.currentAdmin !== null" class="mt-1">
      <el-button @click="logout" type="danger">Logout</el-button>
    </div>

    <div class="text-xl mt-10">Agora App ID</div>

    <input type='file' accept="image/jpeg" @change="previewImage"/>
    <!--    <img class="h-64" :src="imagePreview" alt="">-->
    <button @click="uploadImage">Upload</button>

    <h1>{{ $store.state.host }}</h1>

    <button @click="createUser">Create User</button>

    <div>User : {{ user }}</div>

    <!--    <UploadYoutube/>-->
  </div>
</template>

<script>

import firebase from 'firebase'
// import UploadYoutube from "@/components/UploadYoutube";
import UploadAccount from "@/components/UploadAccount";

const imageUpload = firebase.storage()

export default {
  name: "Setting",
  components: {
    // UploadYoutube,
    UploadAccount
  },
  data() {
    return {
      fileImage: null,
      imagePreview: null,
      user: null
    }
  },
  methods: {
    // Sign out
    logout() {
      firebase.auth().signOut().then(() => {
        this.$store.commit("setCurrentAdmin", null)
        this.$router.push({path: '/login'})
      })
    },
    previewImage(e) {
      this.fileImage = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.fileImage);
      reader.onload = e => {
        this.imagePreview = e.target.result;
        this.scrollToEnd()
        console.log(this.imagePreview);
      };
    },
    uploadImage() {
      let nameImage = Date.now()
      imageUpload.ref("test/" + nameImage + '.jpg').put(this.fileImage).then(
          () => {
            imageUpload.ref("test/" + nameImage + '.jpg').getDownloadURL()
                .then((url) => {
                  console.log(url)
                }).catch()
          })
    },
    createUser() {
      firebase.auth().signInWithCustomToken("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTU5ODk1MTM3MywiZXhwIjoxNTk4OTU0OTczLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay13OG52b0Bob21lcHJvbGl2ZS03OTNmMC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLXc4bnZvQGhvbWVwcm9saXZlLTc5M2YwLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiTkdIUFFUZjE5bWRYdnpTZDFUbEhLOFZkcFBYMiJ9.LXv3vnU8AR94q3Mjw15f_ZPfs4bSatnI2Eu0VCQZMMcsGbIMKeTviSwWnN6E9lIeXSGWo8mN4cTfROfsG_aKelpH8on9jkmvPZrSqKstMs4hJaT9KpW6B3k0bDDCORIWvd5T1nyAtwDKGwcvEjDfSFGFUTzCk3bm7X8J0TGwr-CVrqczXqxh_OE5nyFOwxqiJdsVKy4SHRzhk4ah84OCSU7UTc3I-VLb5xm-eD9yNmjGKwtDF8Fs_f_EBtPS45Y47crkkutPlKZrlN_M-Vjjw-00IFNLUHzJrZI5MrUiLTpGHju5qt4o27SHrw-jZeNuEBB_NW_us_vjJFpl_jEuFA")
          .then(res => {
            this.user = res
            console.log(res)
          })
    }
  }
};
</script>