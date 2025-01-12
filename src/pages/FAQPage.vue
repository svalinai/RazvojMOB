<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">{{ $t("faq") }}</div>
        <div class="text-subtitle2 q-mb-md">{{ $t("faqP") }}</div>
      </q-card-section>

      <!-- FAQ Section -->
      <q-card-section>
        <q-expansion-item
          :label="$t('faq1')"
          icon="play_circle"
          :default-opened="true"
        >
          <div>{{ $t("faq1P") }}</div>
        </q-expansion-item>

        <q-expansion-item
          :label="$t('faq2')"
          icon="devices"
          :default-opened="false"
        >
          <div>{{ $t("faq2P") }}</div>
        </q-expansion-item>

        <q-expansion-item
          :label="$t('faq3')"
          icon="shopping_cart"
          :default-opened="false"
        >
          <div>{{ $t("faq3P") }}</div>
        </q-expansion-item>

        <q-expansion-item
          :label="$t('faq4')"
          icon="group"
          :default-opened="false"
        >
          <div>{{ $t("faq4P") }}</div>
        </q-expansion-item>

        <q-expansion-item
          :label="$t('faq5')"
          icon="person_add"
          :default-opened="false"
        >
          <div>{{ $t("faq5P") }}</div>
        </q-expansion-item>

        <q-expansion-item
          :label="$t('faq6')"
          icon="edit"
          :default-opened="false"
        >
          <div>{{ $t("faq6P") }}</div>
        </q-expansion-item>

        <q-expansion-item
          :label="$t('faq7')"
          icon="bug_report"
          :default-opened="false"
        >
          <div>{{ $t("faq7P") }}</div>
        </q-expansion-item>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "FaqPage",
};
</script>

<style scoped>
.q-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
}
</style>
