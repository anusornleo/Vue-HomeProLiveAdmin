<template>
  <div @click="selectChat" class="flex items-center h-20 border-b-2 pl-3"
       :class="{'bg-gray-200':hilight,'font-extrabold':!data.isAdminRead}">
    <div class="flex-1" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
      <h1 class="text-md">{{ data.chatWith }}</h1>
      <h1 class="text-xs text-gray-500">{{ data.title }}</h1>
      <span>{{ data.lastMessage }}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: "ChatWithUserList",
  props: ["data"],
  components: {},
  methods: {
    selectChat() {
      this.$store.commit('setSelectChat', this.data.channelName + "" + this.data.chatWith)
    }
  },
  computed: {
    hilight() {
      // if (this.$store.state.selectChat === null) {
      //   this.$store.state.selectChat = this.data.channelName + this.data.chatWith
      //   return this.data.channelName + this.data.chatWith === this.$store.state.selectChat
      // }
      return this.data.channelName + this.data.chatWith === this.$store.state.selectChat
    }
  }
}
</script>

<style scoped>

</style>