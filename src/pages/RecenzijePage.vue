<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">{{ $t("recenzija") }}</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="dodajRecenziju">
          <q-input
            v-model="novaRecenzija.ime_korisnika"
            :label="$t('recenzijaIME')"
            outlined
            dense
            required
          />
          <q-input
            v-model="novaRecenzija.tekst_recenzije"
            :label="$t('recenzijaTEXT')"
            type="textarea"
            outlined
            dense
            required
          />

          <q-btn
            type="submit"
            :label="$t('recenzijaButton')"
            color="primary"
            class="q-mt-md"
          />
        </q-form>
      </q-card-section>

      <q-card-section>
        <q-list bordered>
          <q-item v-for="recenzija in recenzije" :key="recenzija.id_recenzije">
            <q-item-section>
              <div class="text-subtitle1">{{ recenzija.ime_korisnika }}</div>
              <div class="text-body2">{{ recenzija.tekst_recenzije }}</div>
              <div v-if="recenzija.slika" class="q-mt-md">
                <img
                  :src="recenzija.slika"
                  alt="Recenzija Slika"
                  style="width: 100%; border: 1px solid #ccc"
                />
              </div>
              <div class="text-caption text-grey">
                {{ recenzija.created_at }}
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      recenzije: [],
      novaRecenzija: {
        ime_korisnika: "",
        tekst_recenzije: "",
        slika: null,
      },
    };
  },
  methods: {
    // Fetch recenzije using GET request
    async fetchRecenzije() {
      try {
        const response = await axios.get("http://192.168.1.144:4444/recenzije");
        this.recenzije = response.data;
      } catch (error) {
        console.error("Error fetching recenzije:", error);
      }
    },

    // Add new recenzija using POST request
    async dodajRecenziju() {
      if (
        !this.novaRecenzija.ime_korisnika ||
        !this.novaRecenzija.tekst_recenzije
      ) {
        console.log("Polja ne smiju biti prazna!");
        return;
      }

      try {
        // Sending the new recenzija to the server
        await axios.post(
          "http://192.168.1.144:4444/recenzije",
          this.novaRecenzija
        );
        // Reset the form after successful post
        this.novaRecenzija = {
          ime_korisnika: "",
          tekst_recenzije: "",
          slika: null,
        };

        // Fetch updated list of recenzije
        this.fetchRecenzije();

        // Show a success notification to the user
        this.$q.notify({
          color: "green",
          message: this.$t("recenzijaDa"),
          icon: "check_circle",
          position: "top-right",
          timeout: 3000, // Obavijest nestaje nakon 3 sekunde
        });
      } catch (error) {
        console.error("Error adding recenzija:", error);

        // Show an error notification in case something went wrong
        this.$q.notify({
          color: "red",
          message: this.$t("recenzijaNe"),
          icon: "error",
          position: "top-right",
          timeout: 3000,
        });
      }
    },
  },

  mounted() {
    // Fetch recenzije when the component is mounted
    this.fetchRecenzije();
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  color: #1976d2;
}

.photo-preview {
  margin-top: 20px;
  text-align: center;
}
</style>
