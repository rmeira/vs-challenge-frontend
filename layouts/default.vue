<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="openSideBar"
      :mini-variant.sync="miniSidebar"
      app
    >
      <v-toolbar
        :class="miniSidebar ? 'padding-toolbar-content' : null"
        fixed
        height="64"
      >
        <v-img :src="vsIcon" v-if="miniSidebar" contain></v-img>
        <v-toolbar-title v-else class="subtitle-1 font-weight-medium ml-3">
          <v-img :src="vsLogo" contain></v-img>
        </v-toolbar-title>
      </v-toolbar>

      <v-list-item two-line :class="miniSidebar && 'px-2'">
        <v-list-item-avatar class="ml-0">
          <v-img
            :src="$auth.user.avatar ? storageFile($auth.user.avatar) : avatar"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ $auth.user.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ $auth.user.email }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
            icon
            @click.stop="miniSidebar = !miniSidebar"
            class="hidden-sm-and-down"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider />
      <v-list dense>
        <template v-for="(item, index) in menu">
          <v-list-item
            :key="index"
            :exact="item.exact"
            nuxt
            :to="item.route"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed app color="white" height="64">
      <v-app-bar-nav-icon
        @click="openSideBar = !openSideBar"
      ></v-app-bar-nav-icon>
      <v-spacer />
      <AppNavbarProfile />
    </v-app-bar>
    <nuxt-child />
    <AppFooter />
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

import avatar from "~/assets/images/avatar.png"
import vsLogo from "~/assets/images/vs-logo.png"
import vsIcon from "~/assets/images/vs-icon.png"

export default {
  data() {
    return {
      avatar,
      vsLogo,
      vsIcon,
      openSideBar: true,
      miniSidebar: false,
    }
  },
  computed: {
    ...mapGetters({
      menu: "app/menu",
    }),
  },
}
</script>

<style lang="scss">
.padding-toolbar-content .v-toolbar__content {
  padding: 4px 12px !important;
}
</style>
