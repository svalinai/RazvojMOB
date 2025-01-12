const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },

      { path: "o_nama", component: () => import("pages/OnamaPage.vue") },
      { path: "lokacija", component: () => import("pages/LokacijaPage.vue") },
      { path: "login", component: () => import("pages/LoginPage.vue") },
      {
        path: "registracija",
        component: () => import("pages/RegisterPage.vue"),
      },
      {
        path: "settings",
        component: () => import("src/pages/PostavkePage.vue"),
      },
      {
        path: "recenzije",
        component: () => import("src/pages/RecenzijePage.vue"),
      },
      {
        path: "popis_itema",
        component: () => import("pages/PopisItemaPage.vue"),
      }, // New route

      { path: "faq", component: () => import("pages/FAQPage.vue") },
      { path: "o_igri", component: () => import("pages/OigriPage.vue") },
      { path: "kontakt", component: () => import("pages/KontaktPage.vue") },
    ],
  },

  {
    path: "/korisnik",
    component: () => import("layouts/KorisnikLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPageKorisnik.vue") },

      { path: "o_nama", component: () => import("pages/OnamaPage.vue") },
      { path: "lokacija", component: () => import("pages/LokacijaPage.vue") },

      {
        path: "settings",
        component: () => import("src/pages/PostavkePage.vue"),
      },
      {
        path: "recenzije",
        component: () => import("src/pages/RecenzijePage.vue"),
      },
      {
        path: "popis_itema",
        component: () => import("pages/PopisItemaPage.vue"),
      }, // New route

      { path: "faq", component: () => import("pages/FAQPage.vue") },
      { path: "o_igri", component: () => import("pages/OigriPage.vue") },
      { path: "kontakt", component: () => import("pages/KontaktPage.vue") },

      { path: "apipage", component: () => import("pages/ApiPage.vue") },
    ],
  },

  {
    path: "/:catchAll(.)",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
