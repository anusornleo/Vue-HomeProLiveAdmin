<template>
  <div id="app">
    <SideBar/>
    <Loader v-if="$store.state.isLoading"/>
    <LiveViewer v-if="$store.state.isLive" :endLive="false"/>
    <div class="pl-26 pr-6" :class="$route.path === '/chat'?'pt-0':'pt-4'">
      <router-view/>
    </div>
  </div>
</template>

<script>
import SideBar from "./components/SideBar";
import LiveViewer from "@/components/LiveViewer";
import Loader from "@/components/Loader";

export default {
  components: {
    SideBar,
    LiveViewer,
    Loader
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
