<template>
  <div @click="selectChat" class="flex items-center bg-gray-200 h-16 border-b-2"
       :class="{'bg-gray-400':hilight}">
    <div class="flex-1" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
      <h1>{{ data.chatWith }}</h1>
      <span>xxxmoxmomxo omdoxm opmdp
        pomdopmpmdpomdp omdpoc
      </span>
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