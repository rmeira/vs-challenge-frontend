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
  css: [
    "~/assets/css/main.css",
    "~/assets/css/toasted.css",
    "~/assets/css/sweetalert.css",
    "~/assets/css/scrollbar.css",
  ],

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
  plugins: [
    "~/plugins/vue-api-query",
    "~/plugins/vue-axios",
    { src: "~/plugins/vue-simple-alert", ssr: false },
    { src: "~/plugins/vuetify-money", ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ["@nuxtjs/vuetify"],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/dotenv",
    "@nuxtjs/auth",
    "@nuxtjs/toast",
  ],

  /**
   * Toast alert
   */
  toast: {
    position: "top-center",
    iconPack: "mdi",
    duration: 5000,
    action: {
      icon: "mdi-close",
      onClick: (e, toastObject) => {
        toastObject.goAway(0)
      },
    },
    register: [
      {
        name: "errorData",
        message:
          "Falha ao carregar o(s) registro(s), por favor tente novamente!",
        options: {
          type: "error",
        },
      },
      {
        name: "unauthorized",
        message: "Você não tem permissão para carregar os registros!",
        options: {
          type: "error",
        },
      },
      {
        name: "unauthenticated",
        message: "Sua sessão de acesso expirou, faça um novo login!",
        options: {
          type: "error",
        },
      },
      {
        name: "serverError",
        message: "Houve um erro no servidor, por favor contate o administrador",
        options: {
          type: "error",
        },
      },
      {
        name: "successStore",
        message: "Registro cadastrado com sucesso ;)",
        options: {
          type: "success",
        },
      },
      {
        name: "successUpdate",
        message: "Registro atualizado com sucesso ;)",
        options: {
          type: "success",
        },
      },
      {
        name: "successDelete",
        message: "Registro excluído com sucesso ;)",
        options: {
          type: "success",
        },
      },
      {
        name: "errorStore",
        message:
          "Ops, houve um erro ao cadastrar esse registro, tente novamente!",
        options: {
          type: "error",
        },
      },
      {
        name: "errorUpdate",
        message:
          "Ops, houve um erro ao atualizar esse registro, tente novamente!",
        options: {
          type: "error",
        },
      },
      {
        name: "errorDelete",
        message:
          "Ops, houve um erro ao excluir esse registro, tente novamente!",
        options: {
          type: "error",
        },
      },
      {
        name: "errorSearch",
        message: "Ops, não encontramos esse registro, tente novamente!",
        options: {
          type: "error",
        },
      },
    ],
  },

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
      light: {
        primary: "#f9b21a",
        accent: "#33333",
        secondary: "#d8a12d",
        success: "#43B581",
        warning: "#FAA61A",
      },
    },
  },

  /**
   * PWA configs
   */
  pwa: {
    manifest: {
      name: process.env.APP_TITLE,
      short_name: process.env.APP_TITLE,
      theme_color: "#f9b21a",
      background_color: "#fafafa",
      orientation: "portrait",
      lang: "pt-BR",
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    //
  },
}
