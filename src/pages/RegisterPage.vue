<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-lg" style="max-width: 400px; margin: auto">
      <q-card-section>
        <div class="text-h6">Registracija</div>
      </q-card-section>

      <q-card-section>
        <q-input
          filled
          v-model="username"
          label="Korisničko ime"
          :rules="[(val) => !!val || 'Korisničko ime je obavezno']"
        />
        <q-input
          filled
          v-model="email"
          label="Email"
          type="email"
          :rules="[
            (val) => !!val || 'Email je obavezan',
            (val) => /.+@.+\..+/.test(val) || 'Neispravan email',
          ]"
        />
        <q-input
          filled
          v-model="password"
          label="Lozinka"
          type="password"
          :rules="[(val) => !!val || 'Lozinka je obavezna']"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="Registriraj se" @click="registerUser" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post(
          "http://192.168.1.144:4444/api/register", // URL za backend (promeni ako koristiš drugu IP adresu)
          {
            username: this.username,
            email: this.email,
            password: this.password,
          }
        );

        // Provera da li je registracija uspešna
        if (response.data.success) {
          // Prikazivanje zelene obavijesti o uspehu sa $q.notify
          this.$q.notify({
            color: "green",
            message: "Korisnik uspešno registrovan!", // Poruka o uspehu
            icon: "check_circle", // Ikona koja označava uspeh
            position: "top",
            timeout: 3000, // Nakon 3 sekunde notifikacija nestaje
          });

          // Resetovanje formi nakon prikaza obavesti
          this.username = "";
          this.email = "";
          this.password = "";
          if (response.status === 200) {
            // Handle successful login (e.g., redirect to a dashboard)
            this.$router.push("/login"); // Make sure to have a dashboard route
          }
        }
      } catch (error) {
        console.error("Greška prilikom registracije:", error);

        // Prikazivanje crvene obavijesti o grešci
        this.$q.notify({
          color: "red",
          message:
            "Došlo je do greške prilikom registracije. Pokušajte ponovo.",
          icon: "error",
          position: "top",
          timeout: 3000, // Nakon 3 sekunde notifikacija nestaje
        });
      }
    },
  },
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
