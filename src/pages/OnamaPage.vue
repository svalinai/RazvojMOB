<template>
  <q-page padding>
    <!-- Main Card with the Image -->
    <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <!-- Image with full width and height of the screen -->
        <q-img
          src="https://acmi-website-media-prod.s3.amazonaws.com/media/images/landscape-minecraft-shaders-river-wallpaper.original.jpg"
          class="relative-position full-screen-img"
        >
          <!-- Overlay text for "O nama" -->
          <div class="overlay-title text-weight-bolder text-center q-pa-md">
            {{ $t("aboutUs") }}
          </div>

          <!-- Description text below "O nama" -->
          <div class="overlay-description text-center q-pa-md">
            {{ o_nama }}
          </div>
        </q-img>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      o_nama: this.$t("aboutUsP"),
    };
  },
};
</script>

<style scoped>
.my-card {
  max-width: 100%; /* Ensures that the card doesn't restrict the width */
  margin: 0; /* Remove margin to let the image take the full width */
  padding: 0; /* Remove unnecessary padding */
}

.relative-position {
  position: relative; /* Ensure positioning is correct for the overlay text */
}

.full-screen-img {
  width: 100%; /* Make the image take full width */
  height: 100vh; /* Make the image take full viewport height */
  object-fit: cover; /* Ensure the image covers the entire area without distortion */
}

.overlay-title {
  position: absolute; /* Positioning the "O nama" text over the image */
  top: 30%; /* Place it near the top of the image */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Adjust for exact centering */
  width: 100%; /* Ensure the text spans the entire width */
  color: white; /* White color for visibility */
  font-size: 2.5rem; /* Smanjivanje fonta naslova */
}

.overlay-description {
  position: absolute; /* Positioning the description text over the image */
  top: 50%; /* Place it below the title */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Adjust for exact centering */
  width: 90%; /* Allow some space on the sides */
  color: white; /* White color for visibility */
  font-size: 1.25rem; /* Smanjivanje fonta za opis */
  line-height: 1.6; /* Adjust line-height for better readability */
  padding: 0 16px; /* Padding for text spacing */
}

.q-pa-md {
  padding: 16px;
}
</style>
