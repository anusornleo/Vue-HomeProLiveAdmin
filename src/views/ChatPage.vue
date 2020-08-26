<template>
  <div>
    <div v-if="hasChat" class="flex flex-wrap h-screen">
      <div class=" w-80 overflow-y-auto border-r-2 border-gray-400">
        <ChatWithUserList v-for="list in allUser" :data="list" :key="list.id"/>
      </div>
      <div class="flex-1 pl-4">
        <ChatPanelTest/>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import firebase from "firebase";
import ChatWithUserList from "@/components/ChatWithUserList";
// import ChatWithUserPanel from "@/components/ChatWithUserPanel";
import ChatPanelTest from "@/components/ChatPanelTest";

const db = firebase.firestore();

export default {
  name: "ChatPage",
  components: {
    ChatWithUserList,
    ChatPanelTest
  },
  data() {
    return {
      hasChat: false,
      allUser: []
    }
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$alert('Please Login to Chat', 'You not have Permission', {
          confirmButtonText: 'OK',
          callback: () => {
            this.$router.replace("/")
          }
        });
      } else {
        this.hasChat = true
      }
    });
  },
  created() {
    db.collection('Chatroom')
        .orderBy('timeStamp')
        .onSnapshot(snapshot => snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            let doc = change.doc
            if (this.$store.state.selectChat === null) {
              this.$store.commit('setSelectChat', doc.data().channelName + doc.data().chatWith)
            }
            this.allUser.unshift({
              chatWith: doc.data().chatWith,
              channelName: doc.data().channelName,
              title: doc.data().title,
              lastMessage: doc.data().lastMsg,
              timeStamp: doc.data().timeStamp,
              id: doc.id,
              isAdminRead: doc.data().isAdminRead
            })
          } else if (change.type === 'modified') {
            let idDoc = change.doc.id
            let index = this.allUser.findIndex(x => x.id === idDoc);
            this.allUser[index].lastMessage = change.doc.data().lastMsg
            this.allUser[index].timeStamp = change.doc.data().timeStamp
            this.allUser[index].isAdminRead = change.doc.data().isAdminRead
            this.sortByTime(change.doc.data().isAdminRead)
          }
        }))
  },
  methods: {
    sortByTime() {
      this.allUser.sort((a, b) => (a.timeStamp < b.timeStamp) ? 1 : -1)
    }
  }
}
</script>

<style scoped>

</style>