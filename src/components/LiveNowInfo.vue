<template>
  <div class="mt-3">
    <h1 class="text-2xl">{{ $store.state.currentOption.title }}</h1>
    <Timer/>
  </div>
</template>

<script>
import Timer from "@/components/Timer";

export default {
  name: "LiveNowInfo",
  components: {
    Timer
  }
}
</script>

<style scoped>

</style>