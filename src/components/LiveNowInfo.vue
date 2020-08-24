<template>
  <div class="mt-3">
    <h1 class="text-2xl">{{ $store.state.currentOption.title }}</h1>
    <Timer/>
    {{ this.countUser }}
  </div>
</template>

<script>
import firebase from 'firebase'
import Timer from "@/components/Timer";

const db = firebase.firestore()

export default {
  name: "LiveNowInfo",
  components: {
    Timer
  },
  data() {
    return {
      countUser: 0
    }
  },
  created() {
    this.getViewerCount()
  },
  methods: {
    getViewerCount() {
      db.collection('CurrentLive').doc(this.$store.state.currentOption.channel).collection('Viewers').onSnapshot(snapshot => {
        console.log(snapshot.docChanges().length)
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            this.countUser += 1
          }
          if (change.type === "modified") {
            console.log("Modified: ", change.doc.data());
          }
          if (change.type === "removed") {
            this.countUser -= 1
          }
        })
      });
    }
  }
}
</script>

<style scoped>

</style>