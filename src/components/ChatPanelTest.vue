<template>
  <div class="w-full h-screen flex flex-col">
    <Loader v-if="isLoading"/>
    <!--    {{ this.scrollHeight }} \\ {{ this.totalChatHeight }} \\ {{ this.chatInnerHeight }}-->
    <div ref="chatContainer" id="chatPanel" v-on:scroll="onScroll" class=" flex-1 overflow-y-auto">
      <div id="chatInner">
        <Message v-for="message in chatMessage" :key="message.id" :message="message"/>
        <div v-if="isUserRead" class="text-right text-gray-500 text-sm">Read</div>
      </div>
    </div>
    <div class="h-16 w-full">
      <div class=" flex flex-wrap">
        <div class="mr-5" style="flex:1">
          <el-input placeholder="Sent Message" v-model="message"></el-input>
        </div>
        <button
            @click="sentMessage"
            class="bg-primary p-2 hover:bg-primary_active text-white font-bold h-10 rounded w-24"
            :class="{'bg-primary_active':message.length === 0}"
        >
          <span class="material-icons">send</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Message from '@/components/Message'
import firebase from 'firebase'
import Loader from "@/components/Loader";

const db = firebase.firestore()

export default {
  name: "ChatPanelTest",
  components: {
    Message,
    Loader
  },
  data() {
    return {
      content: '',
      chatMessage: [],
      currentRef: {},
      totalChatHeight: 0,
      loading: false,
      message: '',
      scrollHeight: 0,
      chatInnerHeight: 0,
      isLoading: false,
      isUserRead: false
    }
  },
  mounted() {
    this.loadChat()
    this.getReadState()
  },
  computed: {
    messages() {
      return this.chatMessage
    },
    // username() {
    //
    // }
    // onNewMessageAdd() {
    //   const that = this
    //   let onNewMessageAdded = function (snapshot, newMessage = true) {
    //     let message = snapshot.val()
    //   }
    // }
  },
  methods: {
    getReadState() {
      db.collection("Chatroom").doc(this.$store.state.selectChat)
          .onSnapshot(snapshot => {
            this.isUserRead = snapshot.data().isUserRead
            if (this.isUserRead) {
              this.scrollToEnd()
            }
          });
    },
    loadChat() {
      this.isLoading = true
      this.totalChatHeight = this.$refs.chatContainer.scrollHeight
      if (this.$store.state.selectChat !== null) {
        this.chatMessage = []
        this.currentRef = db.collection('Chatroom')
            .doc(this.$store.state.selectChat)
            .collection("ChatMessage")
            .orderBy('timeStamp')
            .onSnapshot(snapshot => snapshot.docChanges().forEach(change => {
              if (change.type === 'added') {
                if (change.newIndex === snapshot.docChanges().length - 1 || snapshot.docChanges().length === 1) {
                  db.collection('Chatroom')
                      .doc(this.$store.state.selectChat).update({
                    isAdminRead: true
                  }).then(() => {
                    this.isLoading = false
                  })
                }
                this.newMessageAdd(change.doc, true)
              }
            }))
      }
    },
    newMessageAdd(doc, isNew) {
      if (isNew) {
        this.chatMessage.push({
          message: doc.data().msg,
          username: doc.data().username,
          type: 'inchat',
          role: doc.data().role
        })
        // if (this.scrollHeight + this.totalChatHeight === this.chatInnerHeight) {
        this.scrollToEnd()
        // }
      }
    },
    onScroll() {
      this.$nextTick(() => {
        let container = this.$el.querySelector('#chatPanel')
        let chatInner = this.$el.querySelector('#chatInner')
        this.scrollHeight = container.scrollTop
        this.chatInnerHeight = chatInner.offsetHeight
      })
    },
    scrollToEnd() {
      this.$nextTick(() => {
        let container = this.$el.querySelector('#chatPanel')
        container.scrollTop = container.scrollHeight
      })
    },
    scrollTo() {
      this.$nextTick(() => {
        let currentHeight = this.$refs.chatContainer.scrollHeight
        let difference = currentHeight - this.totalChatHeight
        let container = this.$el.querySelector('#chatPanel')
        container.scrollTop = difference
      })
    },
    sentMessage() {
      if (this.message.length !== 0) {
        let sentTime = firebase.firestore.Timestamp.fromDate(new Date())
        db.collection('Chatroom')
            .doc(this.$store.state.selectChat)
            .update({
              isUserRead: false,
              lastMsg: this.message,
              timeStamp: sentTime
            })
            .then(() => {
              db.collection('Chatroom')
                  .doc(this.$store.state.selectChat)
                  .collection('ChatMessage')
                  .add({
                    msg: this.message,
                    role: 'admin',
                    timeStamp: sentTime,
                    username: 'admin'
                  })
              this.message = ''
            })
            .catch(e => {
              console.log(e)
            })
      }
    }

  },
  watch: {
    '$store.state.selectChat'() {
      this.currentRef()
      this.loadChat()
    }
  }
}
</script>

<style scoped>

</style>