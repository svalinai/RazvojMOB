<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>Quasar App</q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <!-- Left Drawer -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Essential Links</q-item-label>

        <!-- Dinamički generišemo linkove prema definisanim rutama -->
        <q-item
          v-for="link in linksList"
          :key="link.title"
          clickable
          @click="navigateTo(link.path)"
        >
          <router-link :to="link.path">
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t(link.title) }}</q-item-label>
              <q-item-label caption>{{ $t(link.caption) }}</q-item-label>
            </q-item-section>
          </router-link>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Main Page Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n"; // Import `vue-i18n`

const $q = useQuasar();
const { t, locale } = useI18n(); // Use `t` and `locale` from `vue-i18n`

defineOptions({
  name: "MainLayout",
});

// Dinamički sadržaj linkova
const linksList = [
  { title: "home", caption: "Index page", icon: "home", path: "/" },
  {
    title: "aboutUs",
    caption: "Informacije o nama",
    icon: "info",
    path: "/o_nama",
  },
  {
    title: "location",
    caption: "Naša lokacija",
    icon: "location_on",
    path: "/lokacija",
  },
  { title: "login", caption: "Prijavite se", icon: "login", path: "/login" },
  {
    title: "register",
    caption: "Kreirajte nalog",
    icon: "how_to_reg",
    path: "/registracija",
  },
  {
    title: "settings",
    caption: "Podesavanja",
    icon: "settings",
    path: "/settings",
  },
  {
    title: "faq",
    caption: "Cesto postavljena pitanja",
    icon: "announcement",
    path: "/faq",
  },
  {
    title: "gameInfo",
    caption: "Saznajte više o igri",
    icon: "videogame_asset",
    path: "/o_igri",
  },
  {
    title: "contact",
    caption: "Kontaktirajte nas",
    icon: "call",
    path: "/kontakt",
  },
];

const leftDrawerOpen = ref(false);

// Toggle Drawer
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

// Navigate on link click
function navigateTo(path) {
  this.$router.push(path);
}
</script>

<style scoped>
/* Add additional styles here */
</style>
