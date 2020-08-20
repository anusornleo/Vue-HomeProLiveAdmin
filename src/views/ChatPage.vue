<template>
  <div>
    <div v-if="hasChat" class="flex flex-wrap h-screen">
      <div class=" w-80 bg-green-200">
        <ChatWithUserList v-for="list in allUser" :data="list" :key="list.id"/>
      </div>
      <div class="flex-1 bg-red-200 pl-4">
        <ChatWithUserPanel/>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import firebase from "firebase";
import ChatWithUserList from "@/components/ChatWithUserList";
import ChatWithUserPanel from "@/components/ChatWithUserPanel";

const db = firebase.firestore();

export default {
  name: "ChatPage",
  components: {
    ChatWithUserList,
    ChatWithUserPanel
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
        .onSnapshot(snapshot => snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            let doc = change.doc
            if (this.$store.state.selectChat === null) {
              this.$store.commit('setSelectChat', doc.data().channelName + doc.data().chatWith)
            }
            this.allUser.push({
              chatWith: doc.data().chatWith,
              channelName: doc.data().channelName,
              title: doc.data().title
            })
          }
        }))

  }
}
</script>

<style scoped>

</style>