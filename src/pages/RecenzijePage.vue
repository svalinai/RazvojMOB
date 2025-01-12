<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Recenzije</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="dodajRecenziju">
          <q-input
            v-model="novaRecenzija.ime_korisnika"
            label="Ime korisnika"
            outlined
            dense
            required
          />
          <q-input
            v-model="novaRecenzija.tekst_recenzije"
            label="Tekst recenzije"
            type="textarea"
            outlined
            dense
            required
          />

          <!-- Dodaj fotoaparat -->
          <div class="q-mt-md">
            <video
              ref="camera"
              autoplay
              playsinline
              style="width: 100%; border: 1px solid #ccc; margin-bottom: 10px"
            ></video>
            <q-btn
              color="primary"
              label="Snimite Fotografiju"
              @click="takePhoto"
            />
          </div>

          <!-- Prikaz snimljene fotografije -->
          <div v-if="novaRecenzija.slika" class="photo-preview q-mt-md">
            <h6>Vaša fotografija:</h6>
            <img
              :src="novaRecenzija.slika"
              alt="Captured Photo"
              style="width: 100%; border: 1px solid #ccc"
            />
          </div>

          <q-btn
            type="submit"
            label="Dodaj recenziju"
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
      cameraStream: null,
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
          message:
            "Recenzija je uspešno poslata! Hvala što ste podelili svoje mišljenje.",
          icon: "check_circle",
          position: "top-right",
          timeout: 3000, // Obavijest nestaje nakon 3 sekunde
        });
      } catch (error) {
        console.error("Error adding recenzija:", error);

        // Show an error notification in case something went wrong
        this.$q.notify({
          color: "red",
          message:
            "Došlo je do greške prilikom slanja recenzije. Pokušajte ponovo.",
          icon: "error",
          position: "top-right",
          timeout: 3000,
        });
      }
    },

    // Start camera
    async startCamera() {
      try {
        this.cameraStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        this.$refs.camera.srcObject = this.cameraStream;
      } catch (error) {
        console.error("Greška pri pokretanju kamere:", error);
        alert("Kamera nije dostupna. Provjerite postavke uređaja.");
      }
    },

    // Stop camera
    stopCamera() {
      if (this.cameraStream) {
        const tracks = this.cameraStream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    },

    // Capture photo
    takePhoto() {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = this.$refs.camera.videoWidth;
      canvas.height = this.$refs.camera.videoHeight;
      context.drawImage(this.$refs.camera, 0, 0, canvas.width, canvas.height);

      this.novaRecenzija.slika = canvas.toDataURL("image/png");
    },
  },

  mounted() {
    // Fetch recenzije when the component is mounted
    this.fetchRecenzije();
    this.startCamera();
  },

  beforeUnmount() {
    this.stopCamera();
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
