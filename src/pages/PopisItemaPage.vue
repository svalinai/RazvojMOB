<template>
  <q-page padding>
    <div class="text-center">
      <h1 class="text-h5 q-mb-lg">{{ $t("predmetiVrh") }}</h1>
    </div>

    <q-card class="q-pa-md bg-primary text-white shadow-5">
      <q-card-section>
        <div class="text-h6">{{ $t("predmeti") }}</div>
        <p class="text-subtitle2">
          {{ $t("predmetiP") }}
        </p>
      </q-card-section>
    </q-card>

    <q-space class="q-mt-md" />

    <div class="q-gutter-md row">
      <q-card
        v-for="item in items"
        :key="item.id_itema"
        class="col-xs-12 col-sm-6 col-md-4"
        bordered
      >
        <q-card-section>
          <div class="text-h6">{{ item.ime_itema }}</div>
          <p class="text-subtitle2 text-primary">
            Vrijednost: {{ item.vrijednost_itema }} kn
          </p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            label="Detalji"
            color="secondary"
            flat
            @click="showDetails(item)"
          />
        </q-card-actions>
      </q-card>
    </div>

    <q-banner v-if="items.length === 0" color="warning" class="q-mt-md">
      <q-icon name="warning" />
      Trenutno nema dostupnih predmeta za prikaz.
    </q-banner>

    <!-- Modalni dijalog za prikaz opisa predmeta -->
    <q-dialog v-model="dialogOpen">
      <q-card style="max-width: 500px">
        <q-card-section>
          <div class="text-h6">{{ selectedItem?.ime_itema }}</div>
          <p class="text-body2 q-mt-md">{{ selectedItem?.opis_itema }}</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Zatvori" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  name: "ItemListPage",
  data() {
    return {
      items: [], // Popis predmeta
      dialogOpen: false, // Kontrola za dijalog
      selectedItem: null, // Odabrani predmet
    };
  },
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get(
          "http://192.168.1.144:4444/api/predmeti"
        );
        this.items = response.data; // Pretpostavka: API vraća JSON s popisom predmeta
      } catch (error) {
        console.error("Greška prilikom dohvaćanja predmeta:", error);
      }
    },
    showDetails(item) {
      this.selectedItem = item; // Postavi odabrani predmet
      this.dialogOpen = true; // Otvori dijalog
    },
  },
  mounted() {
    this.fetchItems();
  },
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
.q-card {
  transition: transform 0.3s;
}
.q-card:hover {
  transform: scale(1.05);
}
</style>
