<template>
  <v-main>
    <AppPageHeader
      icon="mdi-account-group"
      title="Usuários"
      :breadcrumbs="[
        { text: 'Home', to: '/', exact: true },
        { text: 'Usuários', to: '/users', exact: true },
      ]"
    />
    <v-container grid-list-md fluid>
      <v-card class="mx-auto">
        <v-toolbar
          dark
          color="grey darken-2"
          flat
          extension-height="70"
          height="80"
        >
          <v-toolbar-title> Usuários cadastrados </v-toolbar-title>
          <v-spacer />
          <template v-slot:extension>
            <v-text-field
              label="Pesquisar"
              solo-inverted
              filled
              flat
              clearable
              prepend-inner-icon="mdi-account-search"
              v-model="userSearch"
              @keypress.enter.native="handleSearchUser"
              append-icon="mdi-magnify"
              @click:append="handleSearchUser"
              @click:clear="handleSearchUser"
              :loading="userSearchLoading"
            />
          </template>
        </v-toolbar>
        <template v-if="users.length >= 1">
          <v-list-item two-line v-for="(user, index) in users" :key="index">
            <v-list-item-content>
              <v-list-item-title v-text="user.name"></v-list-item-title>
              <v-list-item-subtitle v-text="user.email"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="caption">
              Atualizado há {{ formatDateDistance(user.updated_at) }}
            </v-list-item-action>
          </v-list-item>
          <v-card-actions class="d-flex justify-center pa-5">
            <v-btn
              :loading="userLoadMoreLoading"
              :disabled="userRequestPage === userRequestLastPage"
              @click="handleLoadMoreUsers"
            >
              Carregar mais usuários
            </v-btn>
          </v-card-actions>
        </template>
        <v-card-text v-else class="text-center pa-8">
          <h1 class="font-weight-thin">
            Não foi encontrado nenhum usuário para essa busca
          </h1>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import { dateMixin } from "~/mixins/dateMixin"
import User from "~/models/User"

export default {
  head() {
    return {
      title: "Usuários",
    }
  },
  data() {
    return {
      users: [],
      userSearch: "",
      userRequestPage: 1,
      userRequestLastPage: null,
      userRequestLimit: 5,
      userSearchLoading: false,
      userLoadMoreLoading: false,
    }
  },
  async fetch() {
    await this.handleGetUsers()
  },
  mixins: [dateMixin],
  methods: {
    async handleGetUsers() {
      const request = await User.page(this.userRequestPage)
        .where("name", this.userSearch)
        .limit(this.userRequestLimit)
        .get()
      this.userRequestPage = request.current_page
      this.userRequestLastPage = request.last_page
      this.users.push(...request.data)
    },
    async handleLoadMoreUsers() {
      this.userLoadMoreLoading = true
      this.userRequestPage++
      await this.handleGetUsers()
      this.userLoadMoreLoading = false
    },
    async handleSearchUser() {
      this.userSearchLoading = true
      this.userRequestPage = 1
      this.userRequestLastPage = null
      this.users = []
      await this.handleGetUsers()
      this.userSearchLoading = false
    },
  },
}
</script>
