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
      <div class="bg-gray-300 inline-block px-3 py-1 rounded-lg mb-3" style="max-width: 80%">
        <span class="text-primary font-bold">{{ message.username }}</span> : {{ message.message }}
      </div>
    </div>

    <!--message in chat from admin-->
    <div v-if="message.type === 'inchat' && message.role === 'admin'" class="flex justify-end">
      <div class="bg-primary text-white inline-block px-3 py-1 rounded-lg mb-3" style="max-width: 80%">
        {{ message.message }}
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Message",
  props: ['message'],
  data() {
    return {}
  },
  methods: {
    setSelectMessage(message) {
      this.$store.state.selectedMessage = message
    }
  }
}
</script>

<style scoped>

</style>