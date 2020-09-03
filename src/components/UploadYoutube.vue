<template>
  <div class="w-80 bg-white shadow-lg rounded-md fixed positionPanel p-3">
    <!--    <div v-if="$store.state.recordedVideo !== null">Can upload</div>-->
    <!--    <button @click="uploadVideo">Upload</button>-->
    <div>Upload Record to Youtube</div>
    <el-progress :percentage="percent"></el-progress>
    <i v-if="percent === 100" @click="close"
       class="el-icon-circle-close absolute bg-white p-1 rounded-full position-close shadow-md hover:bg-gray-300"></i>
  </div>
</template>

<script>
import * as firebase from 'firebase';
import 'firebase/firestore';

// const db = firebase.firestore
/* eslint-disable */

export default {
  name: "UploadYoutube",
  data() {
    return {
      percent: 0
    }
  },
  created() {
    // setTimeout(this.uploadVideo, 5000)
    // this.uploadVideo()
  },
  methods: {
    uploadVideo() {
      let _this = this
      // this.$store.state.recordedVideo = null
      console.log("Uploaded Video")
      let metadata = {
        snippet: {
          title: 'HomePro Live Test Demo 2',
          description: 'Test to upload HomePro Live in YouTube. It will show private for me.',
          tags: ['youtube-cors-upload', 'upload', 'homepro'],
          categoryId: 22
        },
        status: {
          uploadStatus: "uploaded",
          privacyStatus: "unlisted",
          license: "creativeCommon",
          embeddable: true,
          madeForKids: true,
        },
      };
      let uploader = new MediaUploader({
        baseUrl: 'https://www.googleapis.com/upload/youtube/v3/videos',
        file: _this.$store.state.recordedVideo,
        token: _this.$store.state.googleApiUserAuth.access_token,
        metadata: metadata,
        params: {
          part: Object.keys(metadata).join(',')
        },
        onError(data) {
          let message = data
          try {
            let errorResponse = JSON.parse(data);
            message = errorResponse.error.message;
          } finally {
            alert(data);
          }
        },
        onComplete(data) {
          let uploadResponse = JSON.parse(data);
          let videoId = uploadResponse.id;
          _this.updateFirebase(videoId)
        },
        onProgress(data) {
          let currentTime = Date.now();
          let bytesUploaded = data.loaded;
          let totalBytes = data.total;
          // The times are in millis, so we need to divide by 1000 to get seconds.
          let bytesPerSecond = bytesUploaded / ((currentTime) / 1000);
          let estimatedSecondsRemaining = (totalBytes - bytesUploaded) / bytesPerSecond;
          let percentageComplete = (bytesUploaded * 100) / totalBytes;
          _this.percent = percentageComplete

          console.log(percentageComplete + " " + _this.percent)

          // console.log(bytesPerSecond + "\n" + estimatedSecondsRemaining + "\n" + percentageComplete)
        }
      })
      uploader.upload();
    },
    updateFirebase(videoId) {
      firebase.firestore().collection('CurrentLive').doc(this.$store.state.currentOption.channel).update({
        youtubeID: videoId,
      })
    },
    close() {
      this.$store.state.recordedVideo = null
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
.positionPanel {
  z-index: 10;
  bottom: 32px;
  left: 105px;
}

.position-close {
  right: -8px;
  top: -8px;
}
</style>