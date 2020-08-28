<template>
  <div>
    <!--message in live page-->
    <div v-if="message.type === 'inlive'">
      <div class="bg-gray-300 inline-block px-3 py-1 rounded-lg mb-3" style="max-width: 90%">
        <span class="text-primary font-bold">{{ message.username }}</span> : {{ message.message }}
      </div>
      <div class="inline-block pt-0 h-full cursor-pointer" @click="setSelectMessage(message)">
        <span class="material-icons">reply</span>
      </div>
    </div>

    <!--message in chat from user-->
    <div v-if="message.type === 'inchat' && message.role === 'user'">
      <div class="bg-gray-300 inline-block px-3 py-1 rounded-lg mt-3" style="max-width: 500px">
        <span class="text-primary font-bold">{{ message.username }}</span> : {{ message.message }}
      </div>
      <div class="text-xs text-gray-500">{{ dateFormat(message.timeStamp.toDate()) }}</div>
    </div>

    <!--message in chat from admin-->
    <div v-if="message.type === 'inchat' && message.role === 'admin'">
      <div class="flex justify-end">
        <div class="bg-primary text-white inline-block px-3 py-1 rounded-lg mt-3" style="max-width: 500px">
          {{ message.message }}
        </div>
      </div>
      <div class="text-right text-xs text-gray-500">{{ dateFormat(message.timeStamp.toDate()) }}</div>
    </div>
  </div>

</template>

<script>
import * as moment from "moment/moment";

export default {
  name: "Message",
  props: ['message'],
  data() {
    return {}
  },
  methods: {
    dateFormat(sec) {
      moment.locale("th");
      return moment(sec).format("LLL");
      // return sec;
    },
    setSelectMessage(message) {
      this.$store.state.selectedMessage = message
    }
  }
}
</script>

<style scoped>

</style>