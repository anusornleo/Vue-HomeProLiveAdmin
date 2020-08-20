<template>
  <div class="bg-orange-200 w-full h-screen flex flex-col">
    <div class="flex-1 overflow-y-auto">
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
      unsubscribe: null
    }
  },
  created() {
    console.log("1111")
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
    }
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
}
</script>

<style scoped>

</style>