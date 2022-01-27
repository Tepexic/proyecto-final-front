<template>
  <v-container fluid fill-height class="d-flex align-center">
    <v-row>
      <v-col cols="12" md="6" offset-md="3">
        <v-card class="elevation-12">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Login</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" @submit="login" v-model="valid" lazy-validation>
              <v-text-field
                v-model="form.email"
                label="Email"
                type="email"
                prepend-icon="mdi-email"
                :rules="[(v) => !!v || 'Email is required']"
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                label="Password"
                type="password"
                prepend-icon="mdi-lock"
                :rules="[(v) => !!v || 'Password is required']"
              ></v-text-field>
              <v-btn
                color="primary"
                block
                @click="login"
                :disabled="form.busy"
                class="mt-4"
              >
                Login
              </v-btn>
              <v-btn
                color="secondary"
                block
                @click="$router.push({ name: 'Registro' })"
                :disabled="form.busy"
                class="mt-4"
              >
                Registro
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import withAsync from "@/helpers/withAsync";
import Auth from "@/api/Auth";

export default {
  name: "Login",
  data() {
    return {
      valid: false,
      form: {
        email: "",
        password: "",
        busy: false,
      },
    };
  },
  methods: {
    async login() {
      await this.$refs.form.validate();
      if (this.valid) {
        this.form.busy = true;
        const { error } = withAsync(Auth.login, Auth, this.form);
        if (error) {
          console.error(error.message);
          // this.$toast.error(error.message);
        } else {
          this.$router.push("/");
        }
        this.form.busy = false;
      }
    },
  },
};
</script>
