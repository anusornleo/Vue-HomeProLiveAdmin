<template>
  <div>
    <div id="pre-local-player" :style="'width:'+setWidth+'px;height:'+setHeight+'px'"
         class="player" :class="{ overlap: $route.path!=='/live_now' }">
    </div>
    <video id="myVideo" playsinline class="video-js vjs-default-skin" style="display: none">
      <p class="vjs-no-js">
        To view this video please enable JavaScript, or consider upgrading to a
        web browser that
        <a
            href="https://videojs.com/html5-video-support/"
            target="_blank"
        >supports HTML5 video.</a>
      </p>
    </video>

  </div>

</template>

<script>
/* eslint-disable */
import {AGORA_APP_ID} from '@/config/agora.config'
import AgoraRTC from "agora-rtc-sdk-ng";
import "video.js/dist/video-js.css";
import "videojs-record/dist/css/videojs.record.css";
import videojs from "video.js";

import "webrtc-adapter";
import RecordRTC from "recordrtc";

import Record from "videojs-record/dist/videojs.record.js";

export default {
  name: "LiveViewer",
  data() {
    return {
      client: {},
      localStream: {
        audioTrack: null,
        videoTrack: null
      },
      localTracks: {
        videoTrack: null,
        audioTrack: {
          getVolumeLevel: function () {
            return 0;
          },
        }
      },
      interval: null,
      player: "",
      isSaveDisabled: true,
      isStartRecording: false,
      videoWidth: 0,
      videoHeight: 0,
      options: {
        controls: true,
        bigPlayButton: false,
        controlBar: {
          deviceButton: false,
          recordToggle: false,
          pipToggle: false,
        },
        width: 100,
        height: 100,
        fluid: true,
        plugins: {
          record: {
            pip: false,
            audio: true,
            video: true,
            maxLength: 3000,
            debug: true,
          },
        },
      },
    }
  },
  async created() {
    this.client = AgoraRTC.createClient({mode: 'live', codec: "h264", role: 'host'})

    await this.client.join(AGORA_APP_ID, this.$store.state.currentOption.channel, null);

    [
      this.localTracks.audioTrack,
      this.localTracks.videoTrack,
    ] = await Promise.all([
      AgoraRTC.createMicrophoneAudioTrack(),
      AgoraRTC.createCameraVideoTrack(),
    ]);

    this.setCamera()

    this.localTracks.videoTrack.play("pre-local-player");

    await this.client.publish(Object.values(this.localTracks));

    this.startRecording()

    this.startTimer()

    setTimeout(this.getWidth, 100);

  },

  methods: {
    setCamera() {
      this.localTracks.videoTrack.setDevice(this.$store.state.currentOption.camera.deviceId);
      this.localTracks.audioTrack.setDevice(this.$store.state.currentOption.microphone.deviceId)
    },
    async leave() {
      this.localTracks.audioTrack.stop()
      this.localTracks.videoTrack.stop()
      this.localTracks.audioTrack.close()
      this.localTracks.videoTrack.close()
      this.localTracks.audioTrack = undefined
      this.localTracks.videoTrack = undefined

      await this.client.leave();
    },
    startRecording() {
      this.isStartRecording = true;
      this.player.record().getDevice();
    },
    stopRecord() {
      this.isStartRecording = false;
      this.player.record().stop();
      setTimeout(this.submitVideo, 1000);
      //   this.player.record().saveAs({ video: "my-video-file-name.webm" });
    },
    submitVideo() {
      // this.player.record().saveAs({video: "my-video-file-name.mp4"});
    },
    goHome() {
      this.$router.push({path: '/'})
    },
    getWidth() {
      this.videoWidth = this.localTracks.videoTrack._videoWidth
      this.videoHeight = this.localTracks.videoTrack._videoHeight
    },
    customColorMethod(percentage) {
      if (percentage < 30) {
        return "#cbd5e0";
      } else if (percentage < 70) {
        return "#38a169";
      } else {
        return "#f56565";
      }
    },
    startTimer() {
      this.$store.state.secondLive = 0
      this.interval = setInterval(() => {
        this.continueTime()
      }, 1000)
    },
    continueTime() {
      this.$store.state.secondLive += 1
    }
  },
  mounted() {
    this.player = videojs("myVideo", this.options, () => {
      // print version information at startup
      let msg =
          "Using video.js " +
          videojs.VERSION +
          " with videojs-record " +
          videojs.getPluginVersion("record") +
          " and recordrtc " +
          RecordRTC.version;
      videojs.log(msg);
    });
    // error handling
    this.player.on("deviceReady", () => {
      this.player.record().start();
      console.log("device ready:");
    });
    this.player.on("deviceError", () => {
      console.log("device error:", this.player.deviceErrorCode);
    });
    this.player.on("error", (element, error) => {
      console.error(error);
    });
    // user clicked the record button and started recording
    this.player.on("startRecord", () => {
      console.log("started recording!");
    });
    // user completed recording and stream is available
    this.player.on("finishRecord", () => {
      this.isSaveDisabled = false;
      console.log("finished recording: ", this.player.recordedData);
    });
  },
  computed: {
    endLive() {
      return this.$store.state.endLive
    },
    setWidth() {
      if (this.$route.path !== '/live_now') {
        return this.videoWidth / 4
      } else {
        return this.$store.state.sectionLiveWidth
      }
    },
    setHeight() {
      if (this.$route.path !== '/live_now') {
        return this.videoHeight / 4
      } else {
        return 460
      }
    },
    volumeTest() {
      return this.localTracks.audioTrack.getVolumeLevel() * 100;
    },
  },
  watch: {
    endLive(val) {
      if (val === true) {
        this.stopRecord()
        this.leave()
        this.$store.state.endLive = false
        this.$store.commit('setIsLive', false)
        clearInterval(this.interval)
      }
    }
  }
}
</script>

<style scoped>
.overlapPlayer {
  position: absolute;
  z-index: 10;
  right: 0;
  bottom: 0;
}

.onPagePlayer {
  position: absolute;
  top: 100px;
  left: 100px;
}

.player {
  height: 426px;
}

.player >>> .agora_video_player {
  width: 426px;
  height: 426px;
  object-fit: contain !important;
}


#pre-local-player {
  position: absolute;
  z-index: 10;
  top: 76px;
  left: 105px;
  transition: .3s;
  transform: translate(0%, 0%);
}

#pre-local-player.overlap {
  margin: -10px 0 0 -10px;
  position: fixed;
  z-index: 10;
  top: 100%;
  left: 100%;
  height: 200px;
  min-width: 200px;
  min-height: 200px;
  transform: translate(-100%, -100%);
}
</style>