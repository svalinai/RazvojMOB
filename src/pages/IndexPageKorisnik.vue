<template>
  <q-page class="flex flex-center" style="position: relative; height: 100vh">
    <!-- Slika -->
    <div class="background-container">
      <img
        alt="naslovna slika"
        src="~assets/ter4.png"
        class="background-image"
      />
    </div>

    <!-- Tekst uokviren u središtu slike -->
    <q-card class="text-center q-pa-md overlay-card">
      <q-card-section>
        <!-- Naslov -->
        <h2 class="welcome-title">{{ $t("welcomeToWorld") }}</h2>
        <!-- Popratni tekst -->
        <p class="welcome-text">
          {{ $t("welcomeToworldP") }}
        </p>
        <!-- Gumb za navigaciju -->
        <q-btn
          :label="$t('homeButton')"
          color="primary"
          class="q-mt-md start-button"
          @click="goToNextPage"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { useRouter } from "vue-router"; // Uvođenje Vue Routera

const router = useRouter();

// Funkcija za navigaciju na drugu stranicu
function goToNextPage() {
  router.push("/korisnik/o_igri"); // Putanja prema željenoj stranici
}
</script>

<style scoped>
/* Kontejner za pozadinsku sliku */
.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden; /* Izbjegava prelazak slike van granica */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Slika - centrirana i responsivna */
.background-image {
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  object-position: center; /* Centriranje slike */
  filter: brightness(0.8); /* Lagano zatamnjenje za bolju čitljivost teksta */
}

/* Kartica u središtu - poboljšana estetika */
.overlay-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 400px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); /* Veći sjena efekt */
  animation: fadeIn 0.8s ease-in-out;
}

/* Naslov */
.welcome-title {
  font-family: "Roboto", sans-serif;
  font-size: 2rem;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 12px;
}

/* Popratni tekst */
.welcome-text {
  font-size: 1.1rem;
  color: #424242;
  line-height: 1.5;
}

/* Gumb za početak */
.start-button {
  font-size: 1rem;
  font-weight: bold;
  width: 100%;
  padding: 10px;
  border-radius: 8px;
}

/* Animacija za karticu */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

/* Media queries za mobilne uređaje */
@media (max-width: 600px) {
  .overlay-card {
    width: 95%;
    padding: 16px;
  }

  .welcome-title {
    font-size: 1.6rem;
  }

  .welcome-text {
    font-size: 1rem;
  }

  .start-button {
    font-size: 0.9rem;
  }
}
</style>
