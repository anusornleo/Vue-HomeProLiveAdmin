<template>
  <div>
    <div v-if="canLive">
      <div class="flex flex-wrap items-start justify-between">
        <h1 class="text-3xl mb-6">Start to Live</h1>
        <div
            @click="goLiveNow"
            class="text-xl items-baseline cursor-pointer bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700 text-white"
        >
          Start Live
          <span class="material-icons" style="vertical-align: bottom;margin-bottom: 6px">live_tv</span>
        </div>
      </div>
      <div class="flex flex-row">
        <div class="w-1/3">
          <div id="pre-local-player" class="player w-full"></div>
        </div>
        <div class="w-2/3 flex flex-wrap content-between ml-10">
          <div class="w-1/4 text-xl">Title</div>
          <div class="w-3/4">
            <el-input placeholder="Please input" v-model="modelTitle"></el-input>
          </div>
          <div class="w-1/4 text-xl">Camera</div>
          <div class="w-3/4">
            <el-select v-model="currentCamera" placeholder="Select" style="width:100%">
              <el-option
                  v-for="camera in cameras"
                  :key="camera.id"
                  :label="camera.label"
                  :value="camera"
              ></el-option>
            </el-select>
          </div>
          <div class="w-1/4 text-xl">Microphone</div>
          <div class="w-3/4">
            <el-select v-model="currentMicrophone" placeholder="Select" style="width:100%">
              <el-option
                  v-for="microphone in microphones"
                  :key="microphone.id"
                  :label="microphone.label"
                  :value="microphone"
              ></el-option>
            </el-select>
            <div class="w-full h-10 mt-5">
              <el-progress :percentage="volumeTest" :color="customColorMethod" :show-text="false"></el-progress>
            </div>
          </div>

        </div>
      </div>
      <div class="flex flex-wrap items-center justify-between">
        <h1 class="text-3xl my-3">Product in Live (12)</h1>
        <div
            @click="goFindProduct"
            class="text-xl my-3 items-baseline cursor-pointer bg-green-400 px-5 py-2 rounded-full hover:bg-green-500 text-white"
        >Add +
        </div>
      </div>
      <div class="flex flex-wrap">
        <CardProduct v-for="product in mockProduct" :key="product.id" :productData="product"/>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
/* eslint-disable */
import {AGORA_APP_ID} from '@/config/agora.config'
import AgoraRTC from "agora-rtc-sdk-ng";
import CardProduct from "../components/CardProduct";
import firebase from "firebase";

const db = firebase.firestore();

export default {
  name: "StartLivePage",
  components: {
    CardProduct,
  },
  data() {
    return {
      mockProduct: [
        {
          sku: 12324,
          image: "url",
          brand: "brand",
          title: "title",
          price: 12334,
        },
      ],
      modelTitle: "",
      currentCamera: null,
      currentMicrophone: null,
      currentResolution: null,
      cameras: [],
      microphones: [],
      localTracks: {
        videoTrack: null,
        audioTrack: {
          getVolumeLevel: function () {
            return 0;
          },
        },
      },
      resolutions: [
        {
          label: "720x1280 15p",
        },
        {
          label: "720x1280 30p",
        },
      ],
      canLive: false
    };
  },
  async beforeCreate() {
    // check auth admin
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$alert('Please Login to Start Live', 'You not have Permission', {
          confirmButtonText: 'OK',
          callback: () => {
            this.$router.replace("/")
          }
        });
      } else {
        this.canLive = true
        this.prepareLive();
      }
    });


  },
  methods: {
    // prepare camera and mic before start live
    async prepareLive() {
      this.cameras = await AgoraRTC.getCameras();
      this.microphones = await AgoraRTC.getMicrophones();

      [
        this.localTracks.audioTrack,
        this.localTracks.videoTrack,
      ] = await Promise.all([
        AgoraRTC.createMicrophoneAudioTrack(),
        AgoraRTC.createCameraVideoTrack(),
      ]);

      // play video in div by id
      this.localTracks.videoTrack.play("pre-local-player");

      // loop found camera in select
      this.cameras.length === 0
          ? (this.currentCamera = "No Camera")
          : (this.currentCamera = this.cameras[0]);

      // loop found mic in select
      this.microphones.length === 0
          ? (this.currentMicrophone = "No Microphone")
          : (this.currentMicrophone = this.microphones[0]);
    },

    // set mic color by volume
    customColorMethod(percentage) {
      if (percentage < 30) {
        return "#cbd5e0";
      } else if (percentage < 70) {
        return "#38a169";
      } else {
        return "#f56565";
      }
    },
    // start live now
    goLiveNow() {
      let channel = Date.now().toString() // define channel by datetime now

      // store current option in vuex
      this.$store.commit('setCurrentOption', {
        appId: AGORA_APP_ID,
        camera: this.currentCamera,
        microphone: this.currentMicrophone,
        channel: channel,
        title: this.modelTitle
      })
      this.$store.commit('setIsLive', true) // change live state

      // save live data in firebase
      db.collection("CurrentLive").doc(channel).set({
        startTime: Date.now(),
        channelName: channel,
        onLive: true,
        title: this.modelTitle
      }).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Start Live Success',
          type: 'success'
        });

        // change route to live_now page
        this.$router.push({path: 'live_now'})
      }).catch(e => {

        // notify if have error
        this.$notify({
          title: 'Error',
          message: e,
          type: 'error'
        });
      })
    },
    goFindProduct() {
      // this.getVideo()
      // console.log(this.localTracks.videoTrack._videoHeight)
      this.$router.push({path: "findproduct"});
    },
    getVideo() {
      let v = document.getElementsByTagName('video');
      v[0].addEventListener("loadedmetadata", function (e) {
        console.log('e = ' + e)
      }, false);
    }
  },
  computed: {
    volumeTest() {
      return this.localTracks.audioTrack.getVolumeLevel() * 100;
    },
  },
  watch: {
    currentCamera(camera) {
      this.currentCamera = camera
      this.localTracks.videoTrack.setDevice(camera.deviceId);
    },
    currentMicrophone(microphone) {
      this.currentMicrophone = microphone
      this.localTracks.audioTrack.setDevice(microphone.deviceId);
    },
  },
  destroyed() {
    this.localTracks.audioTrack.stop() // stop mic and video
    this.localTracks.videoTrack.stop()
    this.localTracks.audioTrack.close() // close mic and video
    this.localTracks.videoTrack.close()
    this.localTracks.audioTrack = undefined // undefine value
    this.localTracks.videoTrack = undefined
  }
};
</script>

<style scoped>
.player {
  height: 426px;
}

.el-select > .el-input {
  display: block;
  width: 500px;
}

.player >>> .agora_video_player {
  width: 426px;
  height: 426px;
  object-fit: contain !important;
}

.el-progress >>> .el-progress-bar__outer {
  height: 20px !important;
}
</style>