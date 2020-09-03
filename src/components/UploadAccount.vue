<template>
  <div>
    <div v-if="$store.state.googleApiUserAuth != null" class="h-24 flex shadow-md rounded-md"
         style="width: 30rem">
      <div class="h-24 w-24 rounded-md flex items-center justify-center">
        <img :src="$store.state.googleApiUserProfile.image" alt="" class="rounded-full w-18"/>
      </div>
      <div class="flex-1 p-2 flex flex-wrap items-center">
        <div>{{ $store.state.googleApiUserProfile.name }}</div>
        <div>{{ $store.state.googleApiUserProfile.email }}</div>
      </div>
      <div class="flex items-center justify-center mr-5">
        <span @click="logout()" class="text-orange-500 font-bold cursor-pointer">Logout</span>
      </div>
    </div>
    <div v-else @click="login"
         class="h-24 flex shadow-md cursor-pointer rounded-md mt-5 flex items-center justify-center hover:bg-gray-100"
         style="width: 30rem">
      <div class="text-center">
        <div class="flex-1">Not Choose Account</div>
        <div>Click to Login</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadAccount",
  data() {
    return {
      dataAccount: {
        accessToken: null
      },
      isLogin: false
    }
  },
  created() {
    this.$gapi.isSignedIn()
        .then(result => {
          if (result) {
            this.$gapi.currentUser()
                .then(user => {
                  if (user) {
                    this.isLogin = true
                    let access_token = window.gapi.auth2.getAuthInstance().currentUser.le.wc;
                    this.$store.commit('setGoogleApiUserAuth', access_token)
                  } else {
                    console.log('No user is connected.')
                  }
                })
          }
        })

    // gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()

  },
  methods: {
    login() {
      this.$gapi.signIn()
          .then(user => {
            this.$store.commit('setGoogleApiUserProfile', user)
            this.isLogin = true
            let access_token = window.gapi.auth2.getAuthInstance().currentUser.le.wc;
            this.$store.commit('setGoogleApiUserAuth', access_token)
            console.log(window.gapi.auth2.getAuthInstance().currentUser)
          })
    },
    logout() {
      this.$gapi.signOut()
          .then(() => {
            this.isLogin = false
            this.$store.commit('setGoogleApiUserProfile', null)
            this.$store.commit('setGoogleApiUserAuth', null)
            let access_token = window.gapi.auth2.getAuthInstance().currentUser.le.wc.access_token;
            console.log(access_token)
          })
    }
  },
}
</script>

<style scoped>
</style>

<!--<template>-->
<!--  <div>-->
<!--    <button @click="login">Login</button>-->
<!--    <button @click="logout">Logout</button>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {}-->
<!--  },-->
<!--  methods: {-->
<!--    login() {-->
<!--      this.$gapi.signIn()-->
<!--          .then(user => {-->
<!--            console.log(user)-->
<!--            let access_token = window.gapi.auth2.getAuthInstance().currentUser.le.wc;-->
<!--            console.log(access_token)-->
<!--          })-->
<!--    },-->
<!--    logout() {-->
<!--      this.$gapi.signOut()-->
<!--          .then(() => {-->
<!--            console.log("c")-->
<!--            let access_token = window.gapi.auth2.getAuthInstance();-->
<!--            console.log(access_token)-->
<!--          })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->