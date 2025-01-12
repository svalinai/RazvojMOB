<template>
  <q-page class="q-pa-md">
    <h1>{{ $t("settings") }}</h1>
    <q-card-section class="q-pt-none">
      <!-- Tamni način -->
      <q-toggle
        v-model="darkMode"
        :label="$t('darkMode')"
        @update:model-value="changeDarkMode"
      />

      <!-- Odabir jezika s dugmadi -->
      <div class="q-mt-md">
        <div>{{ $t("language") }}:</div>
        <q-btn-group flat>
          <q-btn
            v-for="language in languages"
            :key="language.value"
            :label="language.label"
            :color="locale === language.value ? 'primary' : 'secondary'"
            @click="changeLanguage(language.value)"
          />
        </q-btn-group>
      </div>
    </q-card-section>
  </q-page>
</template>

<script setup>
import { ref, watch } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";

const $q = useQuasar();
const { t, locale } = useI18n(); // Ispravno korištenje vue-i18n

// Provjera dostupnosti localStorage
const getLocalStorage = (key, defaultValue) => {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem(key) || defaultValue;
  }
  return defaultValue;
};

// Dark mode logic
const darkMode = ref(getLocalStorage("isDarkActive", "false") === "true");
const changeDarkMode = (newValue) => {
  // Kada se mijenja stanje tamnog načina, aktiviraj ga
  $q.dark.set(newValue);
  $q.localStorage.set("isDarkActive", newValue ? "true" : "false");
};

// Language handling
const currentLang = ref(getLocalStorage("language", "hr"));
const languages = [
  { value: "en", label: "English" },
  { value: "hr", label: "Hrvatski" },
];

// Promjena jezika
const changeLanguage = (value) => {
  locale.value = value; // Ispravno mijenjamo jezik putem locale
  localStorage.setItem("language", value); // Sprema u localStorage
};

// Watch for language changes and update localStorage
watch(locale, (newLocale) => {
  console.log("Language changed to:", newLocale);
  localStorage.setItem("language", newLocale);
});
</script>

<style scoped>
/* Stilovi za dugmadi */
.q-btn-group {
  display: flex;
  gap: 10px;
}

.q-btn-group .q-btn {
  flex: 1;
}
</style>
