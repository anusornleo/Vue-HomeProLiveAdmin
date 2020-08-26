<!--<template>-->
<!--  <div>-->
<!--    {{ this.$gapi.getUserData().accessToken }}-->
<!--    <button @click="login">Login</button>-->
<!--    <button @click="logout">Logout</button>-->
<!--    <button @click="uploadVideo">Upload</button>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--/* eslint-disable */-->

<!--export default {-->
<!--  name: "UploadYoutube",-->
<!--  data() {-->
<!--    return {}-->
<!--  },-->
<!--  created() {-->
<!--    // this.$getGapiClient().then((gapi) => {-->
<!--    //   // gapi.sheets.spreadsheet.get(...)-->
<!--    //   // ...-->
<!--    //   gapi.auth2.Basic-->
<!--    // })-->
<!--    // this.handleAuth();-->
<!--    console.log(this.$store.state.recordedVideo)-->
<!--    console.log(this.$gapi.getUserData())-->

<!--  },-->
<!--  methods: {-->
<!--    login() {-->
<!--      if (this.$gapi.isAuthenticated() !== true) {-->
<!--        this.$login()-->
<!--      }-->
<!--    },-->
<!--    logout() {-->
<!--      this.$gapi.logout()-->
<!--    },-->
<!--    uploadVideo() {-->
<!--      let metadata = {-->
<!--        snippet: {-->
<!--          title: 'testxxxxxrrrrr',-->
<!--          description: 'test',-->
<!--          tags: ['youtube-cors-upload'],-->
<!--          categoryId: 22-->
<!--        },-->
<!--        status: {-->
<!--          privacyStatus: 'private'-->
<!--        }-->
<!--      };-->
<!--      let uploader = new MediaUploader({-->
<!--        baseUrl: 'https://www.googleapis.com/upload/youtube/v3/videos',-->
<!--        file: this.$store.state.recordedVideo,-->
<!--        token: this.$gapi.getUserData().accessToken,-->
<!--        params: {-->
<!--          part: Object.keys(metadata).join(',')-->
<!--        },-->
<!--        onError(data) {-->
<!--          let message = data-->
<!--          try {-->
<!--            let errorResponse = JSON.parse(data);-->
<!--            message = errorResponse.error.message;-->
<!--          } finally {-->
<!--            alert(message);-->
<!--          }-->
<!--        },-->
<!--        onComplete(data) {-->
<!--          let uploadResponse = JSON.parse(data);-->
<!--          let videoId = uploadResponse.id;-->
<!--          alert("uuuuuu " + videoId)-->
<!--        }-->
<!--      })-->
<!--      uploader.upload();-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    let recaptchaScript = document.createElement('script')-->
<!--    recaptchaScript.setAttribute('src', 'cors_upload.js')-->
<!--    document.head.appendChild(recaptchaScript)-->
<!--  },-->
<!--  watch: {-->
<!--    '$store.state.recordedVideo'(val) {-->
<!--      console.log(val)-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->