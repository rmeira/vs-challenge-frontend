require("dotenv").config()
import pt from "vuetify/es5/locale/pt"

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "%s | Veus",
    title: "Veus",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  /**
   * Environments variables
   */
  env: {
    storage: process.env.APP_STORAGE,
    environment: process.env.APP_ENVIRONMENT,
    version: process.env.npm_package_version,
    api: process.env.APP_API,
  },

  /**
   * Loading config component
   */
  loading: "~/components/AppLoading.vue",

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~/assets/css/main.css", "~/assets/css/scrollbar.css"],

  /**
   * Auth options
   */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: `${process.env.APP_API}/v1/auth/login`,
            method: "post",
            propertyName: "token",
          },
          logout: {
            url: `${process.env.APP_API}/v1/auth/logout`,
            method: "post",
          },
          user: {
            url: `${process.env.APP_API}/v1/profile`,
            method: "get",
            propertyName: false,
          },
          tokenRequired: false,
          tokenType: false,
        },
      },
    },
    redirect: {
      login: "/login",
      logout: "/login",
      callback: "/login",
      home: "/",
      user: "/profile",
    },
    plugins: ["~/plugins/auth-redirect.js"],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["~/plugins/vue-api-query", "~/plugins/vue-axios"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ["@nuxtjs/vuetify"],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/axios", "@nuxtjs/dotenv", "@nuxtjs/auth"],

  /**
   * Route middleware
   */
  router: {
    middleware: ["auth"],
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    lang: {
      locales: { pt },
      current: "pt",
    },
    theme: {
      dark: false,
      themes: {
        light: {
          primary: "#f9b21a",
          accent: "#333333",
          secondary: "#d8a12d",
          success: "#43B581",
          warning: "#FAA61A",
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    //
  },
}
