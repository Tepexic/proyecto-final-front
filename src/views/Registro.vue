<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col cols="12" md="6" offset-md="3">
        <v-card class="elevation-12 pa-6">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Registro</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="form.name"
                label="Nombre"
                type="email"
                prepend-icon="mdi-account"
                :rules="[(v) => !!v || 'El nombre es requerido']"
              ></v-text-field>
              <v-text-field
                v-model="form.email"
                label="Email"
                type="email"
                prepend-icon="mdi-email"
                :rules="[(v) => !!v || 'El Email es requerido']"
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                label="Password"
                type="password"
                prepend-icon="mdi-lock"
                :rules="[(v) => !!v || 'La contraseña es requerida']"
              ></v-text-field>
              <v-text-field
                v-model="form.age"
                label="Edad"
                type="number"
                prepend-icon="mdi-calendar"
                :rules="[(v) => (!!v && v > 0) || 'La edad es requerida']"
              ></v-text-field>
              <v-row no-gutters>
                <v-col cols="3" class="d-flex items-center mr-2">
                  <v-icon left>mdi-phone</v-icon>
                  <v-select
                    v-model="selectedPhoneCode"
                    :items="phoneCodes"
                    item-text="name"
                    item-value="dial_code"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="form.phone"
                    label="Teléfono"
                    type="phone"
                    :rules="[(v) => !!v || 'El teléfono es requerido']"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-text-field
                v-model="form.address"
                label="Dirección"
                type="address"
                prepend-icon="mdi-home"
                :rules="[(v) => !!v || 'La dirección es requerida']"
              ></v-text-field>
              <v-checkbox
                v-model="form.isAdmin"
                label="Dar privilegios de administrador"
              ></v-checkbox>
              <v-file-input
                v-model="form.avatar"
                label="Avatar"
                accept="image/png, image/jpeg, image/bmp"
                prepend-icon="mdi-image"
                show-size
                :rules="[(v) => !!v || 'El avatar es requerido']"
              ></v-file-input>
              <v-btn
                color="primary"
                class="mt-4"
                block
                @click="signUp"
                :disabled="form.busy"
              >
                Registro
              </v-btn>
              <v-btn
                color="secondary"
                class="mt-4"
                block
                @click="$router.push({ name: 'Login' })"
                :disabled="form.busy"
              >
                Login
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { phoneCodes } from "@/constants/phoneCodes.js";

export default {
  name: "Registro",
  data() {
    return {
      valid: false,
      form: {
        name: "",
        address: "",
        age: "",
        phone: "",
        avatar: null,
        avatarUrl: "",
        email: "",
        password: "",
        isAdmin: false,
        busy: false,
      },
      phoneCodes: [...phoneCodes],
      selectedPhoneCode: phoneCodes[0],
    };
  },
  methods: {
    async signUp() {
      await this.$refs.form.validate();
      if (this.valid) {
        this.form.busy = true;
        this.form.avatarUrl = await this.$store.dispatch(
          "uploadAvatar",
          this.form.avatar
        );
        this.$store.dispatch("signup", {
          form: this.form,
          phoneCode: this.selectedPhoneCode,
        });
        this.form.busy = false;
      }
    },
  },
};
</script>