<template>
  <div class="w-1/3 overflow-y-auto bg-gray-200 rounded-lg">
    <HistoryLiveList v-for="historyLive in historyLives"
                     :key="historyLive.id"
                     :data="historyLive"
    />

  </div>
</template>

<script>
import firebase from 'firebase'
import HistoryLiveList from "@/components/Dashboards/HistoryLiveList";

const db = firebase.firestore()

export default {
  name: "HistoryLive",
  components: {
    HistoryLiveList
  },
  data() {
    return {
      historyLives: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      let _this = this
      db.collection("CurrentLive")
          .orderBy('startTime', 'desc')
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              _this.historyLives.push(doc.data())
            });
          });
      // db.collection("CurrentLive")
      //     .orderBy('startTime')
      //     .where("onLive", "==", false)
      //     .get()
      //     .then(data => {
      //       this.historyLives = data.docs
      //     })
      //     .catch()
    }
  }
}
</script>

<style scoped>

</style>