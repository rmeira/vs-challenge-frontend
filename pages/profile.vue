<template>
  <v-main>
    <v-img
      :aspect-ratio="16 / 9"
      :src="cover"
      :height="180"
      gradient="to top right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)"
    >
      <v-container>
        <v-layout wrap class="pb-3 pt-3" align-center fill-height>
          <v-flex xs12 sm12>
            <v-list-item>
              <v-list-item-avatar size="80" class="elevation-2">
                <v-img :src="avatar" style="position: relative" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  class="display-1 font-weight-black white--text"
                  >{{ $auth.user.name }}</v-list-item-title
                >
                <v-list-item-subtitle class="white--text">{{
                  $auth.user.email
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-flex>
        </v-layout>
        <v-tabs background-color="transparent" dark>
          <v-tab nuxt to="/profile" exact>Perfil</v-tab>
          <v-tab nuxt to="/profile/password" exact>Senha</v-tab>
          <v-tab @click="$auth.logout()">Sair</v-tab>
        </v-tabs>
      </v-container>
    </v-img>
    <nuxt-child />
  </v-main>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

import avatar from "~/assets/images/avatar.png"
import cover from "~/assets/images/cover.jpg"

export default {
  head() {
    return {
      title: "Perfil",
    }
  },
  data() {
    return {
      avatar,
      cover,
    }
  },
}
</script>
