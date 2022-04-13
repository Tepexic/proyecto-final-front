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
  mounted() {
    // client-side
    this.$socket.on("connect", () => {
      console.log(this.$socket.id);
    });
    this.$socket.on("disconnect", () => {
      console.log(this.$socket.id);
    });
    this.$socket.on("messages", (data) => {
      this.$store.commit("setMessages", data.data);
    });
  },
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