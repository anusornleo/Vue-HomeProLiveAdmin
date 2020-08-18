<template>
  <div class="mx-auto bg-red-100" style="width: 32rem">
    <div class="mt-32 mb-6">
      <div class="mb-2">Email</div>
      <el-input placeholder="Please input" v-model="email"></el-input>
    </div>
    <div>
      <div class="mb-2">Password</div>
      <el-input placeholder="Please input" v-model="password" show-password></el-input>
    </div>
    <div class="w-32 mx-auto mt-8">
      <el-button type="primary" class="w-full" @click="register">Register</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      let data = {
        email: this.email,
        password: this.password
      }
      console.log(data)
    }
  }
}
</script>

<style scoped>

</style>