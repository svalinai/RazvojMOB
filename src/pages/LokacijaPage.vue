<template>
  <q-page>
    <div class="q-pa-md">
      <h1>{{ $t("location") }}</h1>
      <p>{{ $t("locationP") }}</p>
      <!-- Element for displaying the map -->
      <div
        ref="mapElement"
        style="height: 500px; width: 100%; border: 1px solid #ccc"
      >
        <!-- Loading indicator -->
        <div v-if="loading" class="loading-spinner">
          <q-spinner-dots />
          <p>Loading Map...</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";

// Reference for the map HTML element
const mapElement = ref(null);

// Loading state for the map
const loading = ref(true);

let map = null; // Google Map instance
let marker = null; // Marker for current location

const predefinedLocation = {
  lat: 45.338277,
  lng: 14.424203,
  title: "Veleučilište u Rijeci",
};

// Function to initialize the map
const initMap = (position) => {
  const options = {
    center: position,
    zoom: 14,
  };

  // Initialize the map
  map = new google.maps.Map(mapElement.value, options);

  // Add marker for the current user's location
  marker = new google.maps.Marker({
    position,
    map,
    title: "Current Location",
  });

  // Add another marker for the predefined location
  new google.maps.Marker({
    position: predefinedLocation,
    map,
    title: predefinedLocation.title,
  });

  // Once map is initialized, hide the loading indicator
  loading.value = false;
};

// Function to set the user's location using geolocation
const setUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        initMap(userPosition);
      },
      (error) => {
        console.error("Error fetching location:", error);
        // If getting the location fails, use the predefined location
        initMap(predefinedLocation);
      }
    );

    // Watch for changes in the user's position
    navigator.geolocation.watchPosition(
      (position) => {
        const userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // Update the map and marker with the new position
        if (map && marker) {
          map.setCenter(userPosition);
          marker.setPosition(userPosition);
        }
      },
      (error) => {
        console.error("Error tracking location:", error);
      },
      { enableHighAccuracy: true }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    initMap(predefinedLocation); // If geolocation is not supported, use the predefined location
  }
};

// Function to handle device orientation and adjust zoom
const initDeviceOrientation = () => {
  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", (event) => {
      const { gamma } = event;

      // Adjust zoom based on gamma (side tilt)
      if (map && gamma) {
        map.setZoom(14 + gamma / 30); // Adjust zoom based on gamma value
      }
    });
  } else {
    console.error("Device Orientation API not supported by this browser.");
  }
};

// Initialize the map when the component is mounted
onMounted(() => {
  // Check if the Google Maps API is already loaded to prevent duplicate loading
  if (!window.google || !window.google.maps) {
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=API GOOGLE KEY&callback=initMap";
    script.async = true;
    script.defer = true;

    // After the script loads, initialize user location and device orientation
    script.onload = () => {
      setUserLocation();
      initDeviceOrientation(); // Add device orientation handling
    };

    document.body.appendChild(script);
  } else {
    // If Google Maps is already loaded, just initialize
    setUserLocation();
    initDeviceOrientation();
  }
});
</script>

<style scoped>
h1 {
  color: #1976d2;
  text-align: center;
}

p {
  text-align: center;
  margin-bottom: 20px;
}

.loading-spinner {
  text-align: center;
  margin-top: 100px;
  color: #1976d2;
}
</style>
