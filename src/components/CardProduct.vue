<template>
  <div @click="addSelected()"
       :class="indexSelected?`bg-green-200 hover:bg-green-400`:`hover:bg-white_active`"
       class="w-1/5 p-2 text-center shadow-md pb-10 rounded-lg cursor-pointer">
    <h3 class="text-info">SKU : {{ productData.sku }}</h3>
    <img
        class="my-3"
        :src="productData.image"
        alt="image"/>
    <h3 class="text-info">{{ productData.brand }}</h3>
    <h3>{{ productData.title }}</h3>
    <h1>{{ productData.price }}</h1>
  </div>
</template>

<script>
export default {
  name: "CardProduct",
  props: ["productData"],
  data() {
    return {
      id_sku: null,
    };
  },
  methods: {
    addSelected() {
      if (this.indexSelected) {
        this.removeSelect()
      } else {
        this.$store.state.productSelected.push(this.productData)
      }

    },
    removeSelect() {
      let index = this.$store.state.productSelected.findIndex(item => item.sku === this.productData.sku)
      this.$store.state.productSelected.splice(index, 1)
    }
  },
  computed: {
    indexSelected() {
      // this.index = this.$store.state.productSelected.findIndex(item => item.sku === this.productData.sku)
      return this.$store.state.productSelected.findIndex(item => item.sku === this.productData.sku) !== -1
    }
  }
};
</script>