<template>
  <div class="h-24 bg-green-100 shadow-md rounded-md" style="width: 30rem">
    {{ typeof $store.state.recordedVideo }}
    <div v-if="$store.state.recordedVideo !== null">Can upload</div>
    <!--    <button @click="uploadVideo">Upload</button>-->
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "UploadYoutube",
  data() {
    return {}
  },
  created() {

  },
  methods: {
    uploadVideo() {
      this.$store.state.recordedVideo = null
      console.log("Uploaded Video")
      // let metadata = {
      //   snippet: {
      //     title: 'HomePro Live Test Demo 2',
      //     description: 'Test to upload HomePro Live in YouTube. It will show private for me.',
      //     tags: ['youtube-cors-upload', 'upload', 'homepro'],
      //     categoryId: 22
      //   },
      //   status: {
      //     uploadStatus: "uploaded",
      //     privacyStatus: "public",
      //     // publishAt: Date.now(),
      //     license: "creativeCommon",
      //     embeddable: true,
      //     publicStatsViewable: true,
      //     madeForKids: true,
      //   },
      // };
      // console.log(Object.keys(metadata).join(','))
      // console.log(metadata)
      // let uploader = new MediaUploader({
      //   baseUrl: 'https://www.googleapis.com/upload/youtube/v3/videos',
      //   file: this.$store.state.recordedVideo,
      //   token: this.$store.state.googleApiUserAuth.access_token,
      //   metadata: metadata,
      //   params: {
      //     part: Object.keys(metadata).join(',')
      //   },
      //   onError(data) {
      //     let message = data
      //     try {
      //       let errorResponse = JSON.parse(data);
      //       message = errorResponse.error.message;
      //     } finally {
      //       alert(data);
      //     }
      //   },
      //   onComplete(data) {
      //     let uploadResponse = JSON.parse(data);
      //     let videoId = uploadResponse.id;
      //     this.$store.state.recordedVideo = null
      //     alert("uuuuuu " + videoId)
      //   },
      //   onProgress(data) {
      //     let currentTime = Date.now();
      //     let bytesUploaded = data.loaded;
      //     let totalBytes = data.total;
      //     // The times are in millis, so we need to divide by 1000 to get seconds.
      //     let bytesPerSecond = bytesUploaded / ((currentTime) / 1000);
      //     let estimatedSecondsRemaining = (totalBytes - bytesUploaded) / bytesPerSecond;
      //     let percentageComplete = (bytesUploaded * 100) / totalBytes;
      //
      //     console.log(bytesPerSecond + "\n" + estimatedSecondsRemaining + "\n" + percentageComplete)
      //   }
      // })
      // uploader.upload();
    }
  },
  mounted() {
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'cors_upload.js')
    document.head.appendChild(recaptchaScript)
  },
  watch: {
    '$store.state.recordedVideo'(val) {
      if (val != null) {
        console.log("next to upload")
        this.uploadVideo()
      }
    }
  }
}
</script>

<style scoped>

</style>