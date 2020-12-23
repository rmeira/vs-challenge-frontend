<template>
  <v-main class="primary">
    <v-container fluid grid-list-md fill-height>
      <v-layout justify-center align-center>
        <v-flex xs12 sm12 md5 lg4>
          <v-card class="text-center">
            <v-card-title>
              <v-img :src="vsLogo" contain max-height="50"></v-img>
            </v-card-title>
            <v-card-text class="pa-6 text-center">
              <v-form
                ref="loginFormRef"
                v-model="loginFormValid"
                lazy-validation
                @submit.prevent="handleLogin"
              >
                <v-text-field
                  v-model="loginForm.email"
                  label="E-mail"
                  outlined
                  prepend-inner-icon="mdi-account"
                  :rules="rules.required"
                  autofocus
                >
                </v-text-field>
                <v-text-field
                  v-model="loginForm.password"
                  label="Senha"
                  outlined
                  :rules="rules.min8"
                  :append-icon="seePassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="seePassword ? 'text' : 'password'"
                  counter
                  @click:append="seePassword = !seePassword"
                  prepend-inner-icon="mdi-lock"
                >
                </v-text-field>
                <v-btn
                  type="submit"
                  color="primary"
                  block
                  height="48"
                  class="mt-6"
                >
                  Entrar
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import { mapActions } from "vuex"
import { validateMixin } from "~/mixins/validateMixin"

import vsLogo from "~/assets/images/vs-logo.png"

export default {
  layout: "simple",
  head() {
    return {
      title: "Login",
    }
  },
  data() {
    return {
      vsLogo,
      seePassword: false,
      loginFormValid: false,
      loginForm: {
        email: "admin@vschallenge.com.br",
        password: "password",
      },
    }
  },
  mixins: [validateMixin],
  methods: {
    async handleLogin() {
      if (this.$refs.loginFormRef.validate()) {
        try {
          await this.$nuxt.$loading.start()
          await this.$auth.loginWith("local", { data: this.loginForm })
        } catch (error) {
          await this.$nuxt.$loading.finish()
        }
      }
    },
  },
}
</script>
