<template>
  <div>
    <product />
  </div>
</template>

<script>
import Product from "@/components/Product.vue";
export default {
  name: "Productos",
  data() {
    return {
      productos: [],
      buscar: "",
    };
  },
  components: {
    Product,
  },
  mounted() {},
};
</script>
