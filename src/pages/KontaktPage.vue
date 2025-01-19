<template>
  <q-page padding>
    <h1>{{ $t("kontakt") }}</h1>
    <p>
      {{ $t("kontakt2") }}
    </p>

    <q-form @submit.prevent="openDialog">
      <q-input
        filled
        v-model="email"
        label="Email"
        type="email"
        :rules="[(val) => !!val || 'Email je obavezan']"
        required
      />

      <q-input
        filled
        v-model="message"
        :label="$t('kontaktPoruka')"
        type="textarea"
        :rules="[(val) => !!val || 'Poruka je obavezna']"
        required
        autogrow
      />

      <!-- Učitavanje slike putem Cloudinary widgeta -->
      <q-btn :label="$t('kontaktSlika')" @click="handleImageUpload" />

      <!-- Prikaz kamere -->
      <div v-if="cameraActive">
        <video
          ref="camera"
          autoplay
          playsinline
          style="width: 100%; border: 1px solid #ccc; margin-bottom: 10px"
        ></video>
        <q-btn color="primary" label="Snimite Fotografiju" @click="takePhoto" />
      </div>

      <!-- Prikaz slike ako je odabrana -->
      <div v-if="imageUrl" class="q-mt-md">
        <h6>{{ $t("kontaktPregled") }}</h6>
        <img
          :src="imageUrl"
          alt="Pregled slike"
          style="max-width: 100%; height: auto"
        />
      </div>

      <div>
        <q-btn
          :label="$t('kontaktSend')"
          type="submit"
          color="primary"
          class="q-mt-md"
        />
      </div>
    </q-form>

    <q-dialog v-model="dialogVisible" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ $t("kontaktPotvrda") }}</div>
          <div>{{ $t("kontaktPitanje") }}</div>
        </q-card-section>
        <q-card-actions>
          <q-btn
            :label="$t('kontaktOtkazi')"
            color="negative"
            @click="dialogVisible = false"
          />
          <q-btn
            :label="$t('kontaktSend')"
            color="positive"
            @click="handleSubmit"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import emailjs from "emailjs-com";

import { useI18n } from "vue-i18n"; // Import useI18n
const { t } = useI18n();

const $q = useQuasar();

// Podaci forme
const email = ref("");
const message = ref("");
const imageFile = ref("");
const imageUrl = ref("");
const cameraActive = ref(false);

const dialogVisible = ref(false);

// Funkcija za otvaranje dijaloga
const openDialog = () => {
  dialogVisible.value = true;
};

// Funkcija za otvaranje Cloudinary widgeta za upload slika
const handleImageUpload = () => {
  try {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dh6hoqek4", // Zamijeniti s Vašim cloud_name
        uploadPreset: "razvojMobilnih", // Zamijeniti s Vašim upload preset
        sources: ["local", "url", "camera"], // Omogućuje odabir sa kamere
        showAdvancedOptions: false,
        cropping: false,
        multiple: false,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          $q.notify({
            message: "Error.",
            color: "negative",
          });
          return;
        }

        if (result && result.event === "success") {
          imageUrl.value = result.info.secure_url; // URL slike sa Cloudinary-a
          console.log("Slika uspješno učitana:", imageUrl.value);
        }
      }
    );

    widget.open(); // Otvoriti widget
  } catch (err) {
    console.error("Greška prilikom inicijalizacije widgeta:", err);
    $q.notify({
      message: "Nemoguće otvoriti widget za upload slika.",
      color: "negative",
    });
  }
};

// Funkcija za snimanje fotografije s kamere
const takePhoto = () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = $refs.camera.videoWidth;
  canvas.height = $refs.camera.videoHeight;
  context.drawImage($refs.camera, 0, 0, canvas.width, canvas.height);

  imageUrl.value = canvas.toDataURL("image/png"); // Spremi sliku kao base64
  stopCamera(); // Zaustavi kameru nakon snimanja
};

// Funkcija za slanje forme
const handleSubmit = async () => {
  dialogVisible.value = true;

  // Provjera ispravnosti forme
  if (!email.value || !message.value) {
    $q.notify({
      type: "negative",
      message: "Molimo ispunite sve potrebne podatke.",
    });
    return;
  }

  if (!imageUrl.value) {
    $q.notify({
      type: "negative",
      message: t("kontaktFaliSlika"),
    });
    return;
  }

  console.log("Podaci za slanje:", {
    email: email.value,
    message: message.value,
    image: imageUrl.value,
  });

  // Send form data using an email API or backend service here.
  try {
    const response = await emailjs.send(
      "service_cd93ymt",
      "template_5w1nder",
      {
        email: email.value,
        message: message.value,
        image: imageUrl.value,
      },
      "BZElENdCZky6m3Jnn"
    );

    console.log("EmailJS Response:", response);
    $q.notify({ type: "positive", message: "Poruka je uspješno poslana!" });

    // Resetiraj formu nakon slanja
    email.value = "";
    message.value = "";
    imageFile.value = "";
    imageUrl.value = "";
  } catch (error) {
    console.error("Greška prilikom slanja emaila:", error);
    $q.notify({
      type: "negative",
      message: "Greška prilikom slanja poruke. Pokušajte ponovno.",
    });
  } finally {
    dialogVisible.value = false; // Zatvori dijalog nakon slanja
  }
};

// Učitaj Cloudinary widget prilikom montiranja komponente
onMounted(() => {
  try {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    script.onload = () => {
      console.log("Cloudinary script successfully loaded!");
    };
    document.body.appendChild(script);
  } catch (err) {
    console.error("Greška prilikom učitavanja Cloudinary skripte:", err);
    $q.notify({
      message: "Nemoguće učitati Cloudinary skriptu.",
      color: "negative",
    });
  }

  // Pokreni kameru prilikom učitavanja stranice
  startCamera();
});

// Funkcija za pokretanje kamere
const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    $refs.camera.srcObject = stream;
    cameraActive.value = true;
  } catch (error) {
    console.error("Greška pri pristupu kameri:", error);
    $q.notify({
      message: "Kamera nije dostupna.",
      color: "negative",
    });
  }
};

// Funkcija za zaustavljanje kamere
const stopCamera = () => {
  const stream = $refs.camera.srcObject;
  const tracks = stream ? stream.getTracks() : [];
  tracks.forEach((track) => track.stop());
  cameraActive.value = false;
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
