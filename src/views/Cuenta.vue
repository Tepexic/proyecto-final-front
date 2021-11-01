<template>
  <div>
    <v-app-bar-title>Usuario</v-app-bar-title>
    <p>
      Actualmente tiene el rol de {{ user }}. Si desea cambiarlo, presione el
      boton de abajo:
    </p>
    <v-btn color="primary" @click="toggleRole">
      <v-icon left>mdi-account-switch</v-icon>
      Cambiar rol
    </v-btn>
  </div>
</template>

<script>
import account from "@/api/Account";
import withAsync from "@/helpers/withAsync";
import { roleData, setRole } from "@/services/tiendita.js";

export default {
  name: "Cuenta",
  computed: {
    ...roleData,
    user() {
      return this.userRole ? "administrador" : "cliente";
    },
  },
  methods: {
    async fetchUserRole() {
      const { error, data } = await withAsync(account.getUserRole, account);
      if (error) {
        console.error(error);
      } else {
        setRole(data.admin);
      }
    },
    async toggleRole() {
      const { error, data } = await withAsync(account.toggleUserRole, account);
      if (error) {
        console.error(error);
      } else {
        setRole(data.admin);
      }
    },
  },
};
</script>
