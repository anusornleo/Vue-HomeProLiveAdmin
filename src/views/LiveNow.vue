<template>
  <div>
    <div class="flex flex-wrap">
      <div id="define-width" ref="infoBox" class="bg-green-100 w-1/2">
        <div class="flex flex-wrap justify-between mb-4">
          <div style="flex:1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            <span class="text-3xl">{{ $store.state.currentOption.title }}</span>
          </div>
          <div
              @click="toEndLive()"
              style="height: 45px"
              class="text-xl items-baseline cursor-pointer bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700 text-white"
          >
            End Live
            <span class="material-icons" style="vertical-align: bottom;margin-bottom: 6px">live_tv</span>
          </div>
        </div>
        <div style="height:460px "></div>
        <LiveNowInfo/>
      </div>
      <div class="bg-red-100 h-12 w-1/2 pl-5">
        <h1 class="text-xl mb-6 mt-2">Comments</h1>
        <div id="chat" class="w-full overflow-auto" style="height: 80vh;">
          <Message v-for="message in allMessage" :key="message.id" :message="message"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AgoraRTC from "agora-rtc-sdk-ng";
import firebase from "firebase";
import Message from "@/components/Message";
import LiveNowInfo from "@/components/LiveNowInfo";
// import LiveViewer from "@/components/LiveViewer";

const db = firebase.firestore();

export default {
  name: "LiveNow",
  components: {
    Message,
    LiveNowInfo
    // LiveViewer
  },
  props: [],
  data() {
    return {
      client: {},
      allMessage: [],
      scrollPosition: 0, // position of scroll chat panel
      chatHeight: 0, // height of chat panel
      scrollHeight: 0, // scrollPosition + chatHeight
      endLive: false,
      sectionWidth: 0 // define width of video live
    }
  },
  created() {
    this.getChat()
  },
  methods: {
    async joinChanel() {
      this.client = AgoraRTC.createClient({mode: 'live', codec: "h264"})
    },
    getChat() {
      db.collection('CurrentLive').doc(this.$store.state.currentOption.channel).collection('Chats').orderBy("timeStamp",).onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            let doc = change.doc;
            this.allMessage.push({
              message: doc.data().msg,
              username: doc.data().username
            });
            setTimeout(this.scrollToEnd, 1000);
          }
        });
      });
    },
    scrollToEnd() {
      let chat = this.$el.querySelector("#chat");
      this.chatHeight = chat.offsetHeight
      chat.addEventListener("scroll", this.handleScroll);
      if (this.chatHeight + this.scrollPosition >= this.scrollHeight - 40) {
        chat.scrollTop = chat.scrollHeight;
      }
      this.scrollHeight = chat.scrollHeight
    },
    handleScroll(e) {
      this.scrollPosition = e.target.scrollTop
    },
    matchHeight() {
      this.sectionWidth = this.$refs.infoBox.clientWidth;
      this.$store.state.sectionLiveWidth = this.$refs.infoBox.clientWidth
    },
    toEndLive() {
      this.$store.state.endLive = true
      db.collection('CurrentLive').doc(this.$store.state.currentOption.channel).update({
        onLive: false,
      }).then(() => {
        this.$notify({
          title: 'Success',
          message: 'End Live Complete',
          type: 'success'
        });
        this.$store.commit('setCurrentOption', null)
      }).catch(e => {
        this.$notify({
          title: 'Error',
          message: e,
          type: 'error'
        });
      })
    }
  },
  mounted() {
    this.matchHeight()
  },

}
</script>

<style scoped>

</style>