<template>
  <div class="flex flex-wrap">
    <div class="w-1/2 bg-red-300">
      <div class="bg-black w-full" style="height: 500px;">

      </div>
    </div>
    <div class="w-1/2 bg-green-300" style="height: 95vh">
      <!--      {{ dateFormat(startMilliSec) }}-->
      <!--      {{ dateFormat(loadedComment[0].timeStamp.toDate()) }}-->
      <!--      {{ dateFormat(loadedComment[1].timeStamp.toDate()) }}-->
      <!--      <div>{{ shownComment }}</div>-->
      <!--      <div>{{ loadedComment.length }}</div>-->
      <!--      <div>{{ countComment }}</div>-->
      <!--      <div>{{ loadedComment[this.countComment] }}</div>-->
      <!--      <button @click="stopTime">Stop</button>-->
      <!--      <button @click="startTimer">Resume</button>-->
      <!--      {{ dateFormat(loadedComment[1].timeStamp.toDate()) }}-->
      <div>{{ timer }}</div>
      <h1 class="text-xl mb-6 mt-2">Comments</h1>
      <div id="chat" class="w-full overflow-auto" style="height: 80vh;">
        <Message v-for="message in shownComment" :key="message.id" :message="message"/>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import * as moment from "moment/moment";
import Message from '../components/Message'

const db = firebase.firestore()
export default {
  name: "HistoryViewPage",
  components: {
    Message
  },
  data() {
    return {
      loadedComment: [],
      shownComment: [],
      startMilliSec: 0,
      milliSec: 0,
      countComment: 0,
      timer: 0
    }
  },
  created() {
    this.getLiveData()
    this.getCommentData()
  },
  methods: {
    startTimer() {
      this.interval = setInterval(() => {
        this.continueTime()
      }, 100)
    },
    continueTime() {
      this.startMilliSec += 100
      this.timer += 100
      this.compareTime(this.startMilliSec, this.dateFormat(this.loadedComment[this.countComment].timeStamp.toDate()))
    },
    compareTime(startMilli, messageMilli) {
      if (startMilli > messageMilli) {
        this.shownComment.push(
            {
              message: this.loadedComment[this.countComment].msg,
              username: this.loadedComment[this.countComment].username,
              type: 'inlive'
            }
        )
        this.countComment += 1
        if (this.countComment === this.loadedComment.length) {
          this.stopTime()
        }
      }
    },
    getLiveData() {
      db.collection("CurrentLive")
          .doc(this.$route.params.id)
          .get()
          .then(res => {
            this.startMilliSec = res.data().startTime
            console.log(res.data())
          })
          .catch(e => {
            console.log(e)
          })
    },
    getCommentData() {
      let _this = this
      db.collection('CurrentLive')
          .doc(this.$route.params.id)
          .collection('Chats')
          .orderBy("timeStamp")
          .get()
          .then(res => {
            res.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              // _this.historyLives.push(doc.data())
              console.log(doc.data())
              _this.loadedComment.push(doc.data())
            });
            this.startTimer()
          })
          .catch()
    },
    dateFormat(sec) {
      moment.locale("th");
      return moment(sec).valueOf();
      // return sec;
    },
    stopTime() {
      clearInterval(this.interval)
    }
  }
}
</script>

<style scoped>

</style>