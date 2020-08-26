<template>
  <div>
    <div class="flex flex-wrap">
      <div id="define-width" ref="infoBox" class="w-1/2">
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
      <div class="h-12 w-1/2 pl-5" style="display: flex;flex-direction: column;height: 100%">
        <h1 class="text-xl mb-6 mt-2">Comments</h1>
        <div id="chat" class="w-full overflow-auto" style="height: 80vh;">
          <Message v-for="message in allMessage" :key="message.id" :message="message"/>
        </div>
        <div v-if="$store.state.selectedMessage !== null" class="h-16 w-full bg-blue-200">
          <div class=" flex flex-wrap">
            <div class="mr-5" style="flex:4">
              <el-input placeholder="Find by SKU" v-model="message"></el-input>
            </div>
            <button v-if="canSent"
                    @click="sentMessage"
                    class="bg-primary p-2 hover:bg-primary_active text-white font-bold h-10 rounded"
                    style="flex:1"
            >
              <span class="material-icons">send</span>
            </button>
            <button v-else
                    @click="cancelMessage"
                    class="bg-red-500 p-2 hover:bg-red-700 text-white font-bold h-10 rounded"
                    style="flex:1"
            >
              <span class="">Cancel</span>
            </button>
          </div>
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
      client: {}, // client setting obj
      allMessage: [],
      scrollPosition: 0, // position of scroll chat panel
      chatHeight: 0, // height of chat panel
      scrollHeight: 0, // scrollPosition + chatHeight
      endLive: false, // end live state
      sectionWidth: 0, // define width of video live,
      message: '',
      selectedMessage: null,
      infoLive: this.$store.state.currentOption // only chat in live
    }
  },
  created() {
    // load chat
    this.getChat()
  },
  methods: {
    async joinChanel() {

      // create client
      this.client = AgoraRTC.createClient({mode: 'live', codec: "h264"})
    },
    getChat() {
      // get chat in room from firebase
      db.collection('CurrentLive').doc(this.$store.state.currentOption.channel).collection('Chats').orderBy("timeStamp",).onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            let doc = change.doc;
            this.allMessage.push({
              message: doc.data().msg,
              username: doc.data().username,
              type: 'inlive'
            });
            // set timeout because data added before render finish
            setTimeout(this.scrollToEnd, 1000);
          }
        });
      });
    },

    sentMessage() {
      let timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
      db.collection("Chatroom").doc(this.infoLive.channel + this.$store.state.selectedMessage.username)
          .set({
            channelName: this.infoLive.channel,
            chatWith: this.$store.state.selectedMessage.username,
            title: this.infoLive.title,
            isUserRead: false,
            timeStamp: timeStamp,
            lastMsg: this.message
          }).then(() => {
            db.collection('Chatroom').doc(this.infoLive.channel + this.$store.state.selectedMessage.username).collection("ChatMessage")
                .add({
                  msg: this.message,
                  role: 'admin',
                  timeStamp: timeStamp,
                  username: this.$store.state.selectedMessage.username,

                }).then(() => {
              this.$store.state.selectedMessage = null
            })
                .catch(e => {
                  console.log(e)
                })
          }
      )
          .catch(e => {
            console.log(e)
          })
    },
    cancelMessage() {
      this.$store.state.selectedMessage = null
    },
    // score to bottom always
    scrollToEnd() {
      // get element chat panel
      let chat = this.$el.querySelector("#chat");
      this.chatHeight = chat.offsetHeight

      // check scroll of chat panel
      chat.addEventListener("scroll", this.handleScroll);

      // if admin scroll top. auto scroll is disable
      if (this.chatHeight + this.scrollPosition >= this.scrollHeight - 40) {
        chat.scrollTop = chat.scrollHeight;
      }
      this.scrollHeight = chat.scrollHeight
    },
    // get scroll fn
    handleScroll(e) {
      this.scrollPosition = e.target.scrollTop
    },
    // get width of visual parent of live viewer
    matchHeight() {
      this.sectionWidth = this.$refs.infoBox.clientWidth;
      this.$store.state.sectionLiveWidth = this.$refs.infoBox.clientWidth
    },
    // go in this method when click wnd live
    toEndLive() {
      this.$store.state.endLive = true // set endLive in vuex

      // change state isLive to false
      db.collection('CurrentLive').doc(this.$store.state.currentOption.channel).update({
        onLive: false,
      }).then(() => {
        this.$notify({
          title: 'Success',
          message: 'End Live Complete',
          type: 'success'
        });
        // this.$store.commit('setCurrentOption', null)
      }).catch(e => {
        this.$notify({
          title: 'Error',
          message: e,
          type: 'error'
        });
      })
    }
  },
  computed: {
    canSent() {
      return this.message.length > 0
    }
  },
  mounted() {
    this.matchHeight()
  },

}
</script>

<style scoped>

</style>