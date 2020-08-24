<template>
  <div class="w-full h-screen flex flex-col">
    <div id="chat" class="bg-orange-200 flex-1 overflow-y-auto">
      <Message v-for="message in allMessage" :key="message.id" :message="message"/>
    </div>
    <div class="h-16 w-full bg-blue-200">
      <div class=" flex flex-wrap">
        <div class="mr-5" style="flex:4">
          <el-input placeholder="Find by SKU" v-model="message"></el-input>
        </div>
        <button
            @click="sentMessage"
            class="bg-primary p-2 hover:bg-primary_active text-white font-bold h-10 rounded"
            style="flex:1"
            :class="{'bg-primary_active':!canSent}"
        >
          <span class="material-icons">send</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Message from "@/components/Message";

const db = firebase.firestore()
export default {
  name: "ChatWithUserPanel",
  components: {
    Message
  },
  data() {
    return {
      message: '',
      allMessage: [],
      unsubscribe: null,
      scrollPosition: 0, // position of scroll chat panel
      chatHeight: 0, // height of chat panel
      scrollHeight: 0, // scrollPosition + chatHeight
    }
  },
  created() {
    this.getChatData(this.$store.state.selectChat)
    // db.collection('Chatroom').doc("1597735995654tester1").collection('ChatMessage')
    //     .onSnapshot(snapshot => snapshot.docChanges().forEach(change => {
    //       if (change.type === 'added') {
    //         let doc = change.doc
    //         this.allMessage.push({
    //           chatWith: doc.data().chatWith,
    //           channelName: doc.data().channelName,
    //           title: doc.data().title
    //         })
    //       }
    //     }))
  },
  methods: {
    getChatData(selectChat) {
      // setTimeout(this.scrollToEnd, 1000);
      this.unsubscribe = db.collection("Chatroom").doc(selectChat).collection('ChatMessage').orderBy("timeStamp",)
          .onSnapshot(
              snapshot => {
                snapshot.docChanges().forEach(change => {
                  if (change.type === 'added') {
                    let doc = change.doc
                    this.allMessage.push({
                      message: doc.data().msg,
                      username: doc.data().username,
                      type: 'inchat',
                      role: doc.data().role
                    })
                  }
                })
              })
    },
    scrollToEnd() {
      // get element chat panel
      let chat = this.$el.querySelector("#chat");
      this.chatHeight = chat.offsetHeight

      // check scroll of chat panel
      chat.addEventListener("scroll", this.handleScroll);

      console.log(this.chatHeight + this.scrollPosition >= this.scrollHeight - 40)
      console.log('chat height \t' + this.chatHeight + '\nscrollPosition \t' + this.scrollPosition + '\nscrollHeight \t' + this.scrollHeight)

      // if admin scroll top. auto scroll is disable
      if (this.chatHeight + this.scrollPosition >= this.scrollHeight - 40) {

        chat.scrollTop = chat.scrollHeight;
      }
      this.scrollHeight = chat.scrollHeight


    },
    handleScroll(e) {
      console.log("###################" + e.target.scrollTop)
      this.scrollPosition = e.target.scrollTop
    },
    sentMessage() {
      if (this.canSent) {
        db.collection("Chatroom").doc(this.$store.state.selectChat).collection('ChatMessage')
            .add({
              msg: this.message,
              role: 'admin',
              timeStamp: firebase.firestore.Timestamp.fromDate(new Date()),
              username: 'admin'
            }).then(() => {
          this.message = ''
        }).catch(e => {
          this.$notify({
            title: 'Error',
            message: e,
            type: 'error'
          });
        })
      }
    },
  },
  computed: {
    getSelectChat() {
      return this.$store.state.selectChat
    },
    canSent() {
      return this.message.length > 0
    }
  },
  watch: {
    getSelectChat(val) {
      this.allMessage = []
      this.message = ''
      this.unsubscribe()
      this.getChatData(val)
    }
  },
  destroyed() {
    let chat = this.$el.querySelector("#chat");
    // chat.removeEventListener('scroll', this.onScroll)
    console.log("destroy")
    chat.removeEventListener("scroll", this.handleScroll);

  },
}
</script>

<style scoped>

</style>