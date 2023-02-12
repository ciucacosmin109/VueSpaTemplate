export const sideBarRoutes = [
  {
    icon: "fas fa-home",
    text: "Home",
    route: {
      name: "home",
      params: undefined,
    },
    children: [],
  },
  {
    icon: "fas fa-adjust",
    text: "Vuetify demo",
    route: {
      name: "vuetifydemo",
      params: undefined,
    },
    children: [],
  },
  {
    icon: "fas fa-info-circle",
    text: "About",
    route: {
      name: "about",
      params: {
        param: "",
      },
    },
    children: [
      {
        icon: "fas fa-info-circle",
        text: "About/56",
        route: {
          name: "about",
          params: {
            param: "56",
          },
        },
      },
      {
        icon: "fas fa-info-circle",
        text: "About/89",
        route: {
          name: "about",
          params: {
            param: "89",
          },
        },
      },
    ],
  },
];
