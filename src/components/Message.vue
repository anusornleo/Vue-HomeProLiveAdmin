<template>
  <div>
    <div class="bg-gray-300 inline-block px-3 py-1 rounded-lg mb-3" style="max-width: 90%">
      <span class="text-primary font-bold">{{ message.username }}</span> : {{ message.message }}
    </div>
    <div class="inline-block pt-0 h-full">
      <span class="material-icons">reply</span>
    </div>
  </div>

</template>

<script>
export default {
  name: "Message",
  props: ['message'],
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>