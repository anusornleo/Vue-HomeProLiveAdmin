<template>
  <div class="text-4xl mt-3">{{ hour }}:{{ minute }}:{{ sec }}</div>
</template>

<script>
export default {
  name: "Timer",
  data() {
    return {
      second: 0,
    }
  },
  created() {
    // this.start()
  },
  methods: {},
  computed: {
    sec() {
      let sec = (this.$store.state.secondLive % 60).toString()
      return sec.length === 1 ? '0' + sec : sec
    },
    minute() {
      let minute = (Math.floor(this.$store.state.secondLive / 60) % 60).toString()
      return minute.length === 1 ? '0' + minute : minute
    },
    hour() {
      return Math.floor(this.$store.state.secondLive / 3600)
    }
  }
}
</script>

<style scoped>

</style>