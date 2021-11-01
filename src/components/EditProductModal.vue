<template>
  <v-row justify="center">
    <v-dialog :value="show" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">
            {{ product.id ? "Editar" : "Nuevo" }} Producto
          </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                v-model="product.nombre"
                label="Nombre*"
                :rules="rule"
                required
              ></v-text-field>
              <v-text-field
                v-model="product.descripcion"
                label="Descripción*"
                :rules="rule"
                required
              ></v-text-field>
              <v-text-field
                v-model="product.codigo"
                label="Código*"
                :rules="rule"
                required
              ></v-text-field>
              <v-text-field
                v-model="product.precio"
                label="Precio*"
                :rules="rule"
                required
              ></v-text-field>
              <v-text-field
                v-model="product.stock"
                label="Stock*"
                :rules="rule"
                required
              ></v-text-field>
              <v-text-field
                v-model="product.foto"
                label="URL de la foto*"
                :rules="rule"
                required
              ></v-text-field>
            </v-form>
            <v-img v-if="product.foto" :src="product.foto" max-height="150">
            </v-img>
          </v-container>
          <small>*campo requerido</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="$emit('cancel')">
            Cancelar
          </v-btn>
          <v-btn color="primary" text @click="save"> Guardar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
const defaultProduct = {
  id: null,
  nombre: "",
  descripcion: "",
  codigo: null,
  precio: null,
  foto: "",
  stock: null,
};

export default {
  name: "EditProductModal",
  data() {
    return {
      product: { ...defaultProduct },
      valid: true,
      rule: [(v) => !!v || "Este campo es requerido"],
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    currentProduct: {
      type: Object,
      default: () => ({ ...defaultProduct }),
    },
  },
  watch: {
    show(val) {
      if (val) {
        if (this.currentProduct) {
          this.product = this.currentProduct;
        } else {
          this.product = { ...defaultProduct };
        }
      }
    },
  },
  methods: {
    async save() {
      await this.$refs.form.validate();
      if (this.valid) {
        this.$emit("save", this.product);
        this.product = { ...defaultProduct };
      }
    },
  },
};
</script>
