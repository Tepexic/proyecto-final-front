<template>
  <div>
    <v-row>
      <v-col>
        <v-app-bar-title class="text-h4">Centro de Ayuda</v-app-bar-title>
      </v-col>
    </v-row>
    <v-row class="pa-4">
      <v-col class="elevation-2 rounded pa-8 messages">
        <div v-for="m in $store.state.messages" :key="`messages-${m._id}`">
          <div class="d-flex align-center mt-2">
            <v-avatar size="50">
              <img :src="getAvatar(m.avatar)" />
            </v-avatar>
            <div class="ml-2">
              <h4 class="font-weight-bold">{{ m.author }}</h4>
              - {{ m.timestamp }}
              <p class="text-sm">{{ m.message }}</p>
            </div>
          </div>
          {{ m.text }}
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-4 pa-4">
      <v-form ref="form">
        <v-text-field
          label="Introduzca su mensaje"
          v-model="message"
        ></v-text-field>
        <v-btn class="px-4" @click="sendMessage">Enviar</v-btn>
      </v-form>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Ayuda",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    sendMessage() {
      console.log(this.message);
      this.$socket.emit("new-message", {
        author: this.$store.state.user.email,
        text: this.message,
        avatar: this.$store.state.user.avatar,
        timestamp: new Date().toLocaleString(),
      });
      this.message = "";
    },
    getAvatar(avatar) {
      return `${process.env.VUE_APP_BASE_URL.substring(
        0,
        process.env.VUE_APP_BASE_URL.length - 5
      )}${avatar}`;
    },
  },
};
</script>

<style scoped>
.messages {
  max-height: 400px;
  overflow: auto;
}
</style>
