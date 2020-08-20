<template>
  <div class="bg-primary w-20 h-screen fixed">
    <div v-for="menu in listMenu" :key="menu.id">
      <div
          :class="active(menu.href)?'bg-primary_active':'bg-primary'"
          class="w-20 h-20 bg-primary hover:bg-primary_select cursor-pointer"
          @click="goto(menu.href)"
      >

        <span class="absolute material-icons mt-5 text-center w-20 text-white">{{ menu.icon }}</span>
        <div v-if="menu.href === '/startlive' && $store.state.isLive"
             class="absolute w-20 text-center mt-12 text-white flex">
           <span
               class="ml-2 material-icons text-red-500">fiber_manual_record</span>
          <div>{{ menu.title }}</div>
        </div>
        <div v-else class="absolute w-20 text-center mt-12 text-white">{{ menu.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      listMenu: [
        {
          title: "Home",
          href: "/",
          icon: "home",
        },
        {
          title: "Live",
          href: "/startlive",
          icon: "live_tv",
        },
        {
          title: "Chat",
          href: "/chat",
          icon: "chat"
        },
        {
          title: "Setting",
          href: "/setting",
          icon: "settings",
        },
      ],
    };
  },
  methods: {
    goto(route) {
      if (this.$route.path !== route) {
        if (route === '/startlive') {
          if (this.$store.state.isLive === false) {
            this.$router.push({path: '/startlive'});
          } else {
            this.$router.push({path: '/live_now'});
          }
        } else {
          this.$router.push({path: route});
        }
      }
    },
    active(href) {
      if (href === '/startlive') {
        if (this.$route.path === '/live_now') {
          return true
        }
        return this.$route.path === href
      } else {
        return this.$route.path === href;
      }
    }
  },
};
</script>