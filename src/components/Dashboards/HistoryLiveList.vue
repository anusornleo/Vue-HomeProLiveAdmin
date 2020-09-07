<template>
  <div class="w-100 m-3 flex p-3 shadow-md rounded-lg bg-white">
    <img :src="data.thumbnail" alt="" class="w-26 h-26 rounded">
    <div class="ml-3 flex-1" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
      <div class="font-medium">{{ data.title }}</div>
      <div class="text-sm text-gray-500">{{ dateFormat(data.startTime) }}</div>
      <div>Status :
        <span v-if="data.onLive" class="text-red-500">Live</span>
        <span v-else>Ended</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as moment from "moment/moment";

export default {
  name: "HistoryLiveList",
  props: [
    "data"
  ],
  methods: {
    dateFormat(sec) {
      moment.locale("th");
      return moment(sec).format("LLL");
      // return sec;
    },
  },
  computed: {}
}
</script>

<style scoped>

</style>