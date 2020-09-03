<template>
  <div>
    <div class="flex flex-wrap justify-between">
      <h1 class="text-3xl mb-6">
        <span class="material-icons mr-3 cursor-pointer" @click="goBack">arrow_back</span>Find Product
      </h1>
      <div class="w-1/2 flex flex-wrap">
        <div class="mr-5" style="flex:4">
          <el-input placeholder="Find by SKU" v-model="findMessage"></el-input>
        </div>
        <button
            @click="findProduct()"
            class="bg-primary p-2 hover:bg-primary_active text-white font-bold h-10 rounded"
            style="flex:1"
        >
          <span class="material-icons">search</span>
        </button>
      </div>
    </div>
    <div class="flex flex-wrap">
      <CardProduct v-for="product in products" :key="product.id" :productData="product"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CardProduct from "../components/CardProduct";

export default {
  name: "FindProduct",
  components: {
    CardProduct,
  },
  data() {
    return {
      mockProduct: [
        {
          sku: 12324,
          image: "url",
          brand: "brand",
          title: "title",
          price: 12334,
        },
      ],
      findMessage: "",
      products: []
    };
  },
  created() {
    this.getProduct()
  },
  methods: {
    findProduct() {
      axios.post(`${this.$store.state.host}:3000/api/products/search/`, {
        text: this.findMessage
      })
          .then(res => {
            this.products = res.data
          })
          .catch()
    },
    getProduct() {
      axios.get(`${this.$store.state.host}:3000/api/products/`)
          .then(res => {
                this.products = res.data
              }
          ).catch()
    },
    goBack() {
      console.log("ddddd")
      this.$router.go(-1)
    }
  }
};
</script>