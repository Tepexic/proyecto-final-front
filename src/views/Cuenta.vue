<template>
  <div>
    <v-row>
      <v-col>
        <v-app-bar-title class="text-h4">Mi Cuenta</v-app-bar-title>
        <div class="pa-4 mt-6">
          <v-row class="d-flex align-items justify-start">
            <v-col cols="1">
              <v-avatar size="50">
                <img :src="$store.getters.getUserAvatar" />
              </v-avatar>
            </v-col>
            <v-col class="text-h5" align-self="center">
              {{ $store.state.user.name }}
            </v-col>
          </v-row>
          <v-row class="px-4">
            <strong>Email:</strong>&nbsp;{{ $store.state.user.email }}
          </v-row>
          <v-row class="px-4">
            <strong>Teléfono:</strong>&nbsp;{{ $store.state.user.phone }}
          </v-row>
          <v-row class="px-4">
            <strong>Edad:</strong>&nbsp;{{ $store.state.user.age }}
          </v-row>
          <v-row class="px-4">
            <strong>Dirección:</strong>&nbsp;{{ $store.state.user.address }}
          </v-row>
          <v-row class="px-4">
            <strong>Es Administrador:</strong>
            &nbsp;{{ $store.state.user.isAdmin ? "Sí" : "No" }}
          </v-row>
        </div>
      </v-col>
      <v-col>
        <v-app-bar-title class="text-h4 mt-10">
          Datos del administrador
        </v-app-bar-title>
        <v-form ref="form" v-model="form.valid" lazy-validation>
          <v-text-field
            v-model="form.email"
            label="Email"
            type="email"
            prepend-icon="mdi-email"
            :rules="[(v) => !!v || 'El Email es requerido']"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.phone"
            label="Teléfono"
            type="phone"
            prepend-icon="mdi-phone"
            :rules="[(v) => !!v || 'El teléfono es requerido']"
          ></v-text-field>
          <v-btn
            color="primary"
            class="mt-4"
            block
            @click="updateAdminData"
            :disabled="form.busy"
          >
            Actualizar
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Cuenta",
  data() {
    return {
      form: {
        email: "",
        phone: "",
        valid: false,
        busy: false,
      },
    };
  },
  async beforeMount() {
    await this.$store.dispatch("getUserData");
    await this.$store.dispatch("getAdminData");
    this.form.email = this.$store.state.admin.email;
    this.form.phone = this.$store.state.admin.phone;
  },
  methods: {
    async updateAdminData() {
      await this.$refs.form.validate();
      if (this.form.valid) {
        this.$store.dispatch("setAdminData", {
          email: this.form.email,
          phone: this.form.phone,
        });
      }
    },
  },
};
</script>
