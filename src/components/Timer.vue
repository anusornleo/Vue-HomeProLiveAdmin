<template>
  <div>{{ hour }}:{{ minute }}:{{ sec }}</div>
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
      return this.$store.state.secondLive % 60
    },
    minute() {
      return Math.floor(this.$store.state.secondLive / 60) % 60
    },
    hour() {
      return Math.floor(this.$store.state.secondLive / 3600)
    }
  }
}
</script>

<style scoped>

</style>