<template>
  <div class="d-flex flex-wrap">
    <product v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script>
import Product from "@/components/Product.vue";
import productos from "@/api/Productos";
import withAsync from "@/helpers/withAsync";

export default {
  name: "Productos",
  data() {
    return {
      products: [],
    };
  },
  components: {
    Product,
  },
  async mounted() {
    console.log("mounted");
    const { error, data } = await withAsync(productos.getProducts, productos);
    console.log(data);
    console.log(error);
    if (error) {
      console.error(error);
    } else {
      this.products = data;
    }
  },
};
</script>
