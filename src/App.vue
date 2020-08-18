<template>
  <div id="app">
    <SideBar/>
    <LiveViewer v-if="$store.state.isLive" :endLive="false"/>
    <div class="pt-4 pl-26 pr-6">
      <router-view/>
    </div>
  </div>
</template>

<script>
import SideBar from "./components/SideBar";
import LiveViewer from "@/components/LiveViewer";

export default {
  components: {
    SideBar,
    LiveViewer
  },
};
</script>

<style>
button.el-button.el-button--primary {
  outline: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
