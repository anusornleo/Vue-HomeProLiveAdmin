<template>
  <div>
    <div class="flex flex-wrap items-start justify-between">
      <h1 class="text-3xl mb-6">Home</h1>
    </div>
    <div class="flex" style="height: 88vh;">
      <HistoryLive/>
    </div>
  </div>
</template>

<script>
import HistoryLive from "@/components/Dashboards/HistoryLive";

export default {
  name: "Home",
  components: {
    HistoryLive
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
