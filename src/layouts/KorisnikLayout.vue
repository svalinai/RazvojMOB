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
        <q-item v-for="link in linksList" :key="link.title" clickable>
          <router-link :to="link.path">
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <!-- Koristi t() za prevođenje link.title i link.caption -->
              <q-item-label>{{ $t(link.title) }}</q-item-label>
              <q-item-label caption>{{ $t(link.caption) }}</q-item-label>
            </q-item-section>
          </router-link>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Notify } from "quasar"; // Import Notify for network status notifications
import { RouterLink } from "vue-router";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n"; // Import `vue-i18n`

const $q = useQuasar();
const { t, locale } = useI18n(); // Use `t` and `locale` from `vue-i18n`

defineOptions({
  name: "KorisnikLayout",
});

// Definisanje rute za svaku stranicu, koristeći ključne nazive za prevod
const linksList = [
  { title: "home", caption: "indexPage", icon: "home", path: "/korisnik" },
  {
    title: "aboutUs",
    caption: "aboutUsPage",
    icon: "info",
    path: "/korisnik/o_nama",
  },
  {
    title: "location",
    caption: "locationPage",
    icon: "location_on",
    path: "/korisnik/lokacija",
  },
  {
    title: "funFact",
    caption: "apiPage",
    icon: "cloud",
    path: "/korisnik/apipage",
  },
  {
    title: "settings",
    caption: "settingsPage",
    icon: "settings",
    path: "/korisnik/settings",
  },
  {
    title: "reviews",
    caption: "reviewsPage",
    icon: "rate_review",
    path: "/korisnik/recenzije",
  },
  {
    title: "faq",
    caption: "faqPage",
    icon: "announcement",
    path: "/korisnik/faq",
  },
  {
    title: "itemList",
    caption: "itemListPage",
    icon: "list",
    path: "/korisnik/popis_itema",
  },
  {
    title: "gameInfo",
    caption: "gameInfoPage",
    icon: "videogame_asset",
    path: "/korisnik/o_igri",
  },
  {
    title: "contact",
    caption: "contactPage",
    icon: "call",
    path: "/korisnik/kontakt",
  },
  {
    title: "logout",
    caption: "logoutPage",
    icon: "exit_to_app",
    path: "/",
  },
];

const leftDrawerOpen = ref(false);

// Funkcija za prebacivanje stanja lijevog menija
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

// Funkcija za obavijesti o mrežnom statusu
const isOnline = ref(navigator.onLine); // Početni status mreže

function notifyNetworkStatus() {
  if (isOnline.value) {
    Notify.create({
      type: "positive",
      message: "Internet connection retrieved.",
      icon: "wifi",
      timeout: 2000, // Notifikacija nestaje nakon 2 sekunde
    });
  } else {
    Notify.create({
      type: "negative",
      message: "Internet connection lost.",
      icon: "wifi_off",
      timeout: 0, // Notifikacija ostaje dok korisnik ponovno ne bude online
      actions: [{ label: "OK", color: "white" }],
    });
  }
}

// Funkcija za rukovanje promjenama mrežnog statusa
function handleNetworkChange() {
  isOnline.value = navigator.onLine;
  notifyNetworkStatus();
}

// Postavljanje i uklanjanje event listenera
onMounted(() => {
  window.addEventListener("online", handleNetworkChange);
  window.addEventListener("offline", handleNetworkChange);
  notifyNetworkStatus();
});

onBeforeUnmount(() => {
  window.removeEventListener("online", handleNetworkChange);
  window.removeEventListener("offline", handleNetworkChange);
});
</script>

<style scoped>
/* Dodatni stilovi */
</style>
