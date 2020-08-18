<template>
  <div class="w-1/5 h-80 p-2 text-center shadow-md mb-10 rounded-lg hover:bg-white_active cursor-pointer">
    <h3 class="text-info">SKU : {{productData.sku}}</h3>
    <img
      class="my-3"
      src="https://pht.qoo-static.com/-tinv3wt-7QR6cNYu3fLw5ySktJ0Mb5iydk5QIAPphFkvBuE-xwFuxsy57IGY5lVSQM=w300"
     alt="image"/>
    <h3 class="text-info">{{productData.brand}}</h3>
    <h3>{{productData.title}}</h3>
    <h1>{{productData.price}}</h1>
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
};
</script>