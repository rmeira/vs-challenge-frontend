export const state = () => {
  return {
    menu: [
      {
        icon: "mdi-home",
        name: "Home",
        route: "/",
        exact: true,
      },
      {
        icon: "mdi-account-group",
        name: "Usuários",
        route: "/users",
        exact: true,
      },
      {
        icon: "mdi-cup",
        name: "Produtos",
        route: "/products",
        exact: true,
      },
    ],
  }
}

export const getters = {
  menu: (state) => state.menu,
}
