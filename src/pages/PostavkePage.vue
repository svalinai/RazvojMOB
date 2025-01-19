<template>
  <q-page class="q-pa-md">
    <h1>{{ $t("settings") }}</h1>
    <q-card-section class="q-pt-none">
      <!-- Dark Mode Toggle -->
      <q-toggle
        v-model="darkMode"
        :label="$t('darkMode')"
        @update:model-value="changeDarkMode"
      />

      <!-- Language Selection -->
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
import { ref, onMounted, watch } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";

// Import Quasar
const $q = useQuasar();
const { t, locale } = useI18n(); // Get translations and current locale

// Dark Mode Logic
const getLocalStorage = (key, defaultValue) => {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem(key) || defaultValue;
  }
  return defaultValue;
};

// Initially set dark mode from localStorage or default to false (light mode)
const darkMode = ref(getLocalStorage("isDarkActive", "false") === "true");

const changeDarkMode = (newValue) => {
  // Set dark mode with Quasar's built-in dark method
  $q.dark.set(newValue);
  // Save dark mode state to localStorage
  localStorage.setItem("isDarkActive", newValue ? "true" : "false");
};

// Language handling
const languages = [
  { value: "en", label: "English" },
  { value: "hr", label: "Hrvatski" },
];

// Load language from localStorage or default to 'hr'
const currentLang = ref(getLocalStorage("language", "hr"));
locale.value = currentLang.value; // Set locale to currentLang

const changeLanguage = (value) => {
  // Change the locale language
  locale.value = value;
  // Store the language preference in localStorage
  localStorage.setItem("language", value);
};

// Watch for language changes and store in localStorage
watch(locale, (newLocale) => {
  console.log("Language changed to:", newLocale);
  localStorage.setItem("language", newLocale);
});

// Ensure the correct dark mode is set on page load
onMounted(() => {
  // Set initial dark mode
  $q.dark.set(darkMode.value);

  // Load saved language from localStorage or fallback to 'hr'
  const savedLanguage = getLocalStorage("language", "hr");
  locale.value = savedLanguage; // Set Vue I18n locale globally
  currentLang.value = savedLanguage; // Update local reactive value
});
</script>

<style scoped>
/* Style for the buttons */
.q-btn-group {
  display: flex;
  gap: 10px;
}

.q-btn-group .q-btn {
  flex: 1;
}
</style>
