<template>
  <v-app>
    <router-view></router-view>
    <v-snackbar v-model="showToast">
      {{ $store.state.toast.message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="showToast = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
    showToast: {
      get() {
        return this.$store.state.toast.show;
      },
      set(value) {
        this.$store.commit("setToastVisibility", value);
      },
    },
  },
};
</script>