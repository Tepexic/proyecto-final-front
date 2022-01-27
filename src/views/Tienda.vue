<template>
  <v-app>
    <the-navbar></the-navbar>
    <v-main class="mt-4">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app> </v-footer>
  </v-app>
</template>

<script>
import TheNavbar from "@/components/TheNavbar.vue";
export default {
  name: "App",
  components: {
    TheNavbar,
  },
};
</script>

<style lang="scss"></style>
