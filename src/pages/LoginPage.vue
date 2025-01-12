<template>
  <q-page class="flex flex-center">
    <q-card style="width: 400px">
      <q-card-section class="text-h6">Login</q-card-section>

      <q-form @submit="login" class="q-px-md q-py-md">
        <q-input
          v-model="username"
          label="Username"
          outlined
          autofocus
          required
        />
        <q-input
          v-model="password"
          label="Password"
          type="password"
          outlined
          required
        />
        <div class="q-mt-md">
          <q-btn type="submit" label="Login" color="primary" />
        </div>
      </q-form>

      <q-banner v-if="errorMessage" class="q-mt-md" color="negative">
        <span>{{ errorMessage }}</span>
      </q-banner>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://192.168.1.144:4444/api/login",
          {
            username: this.username,
            password: this.password,
          }
        );

        if (response.status === 200) {
          // Handle successful login (e.g., redirect to a dashboard)
          this.$router.push("/korisnik"); // Make sure to have a dashboard route
        }
      } catch (error) {
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.error || "An error occurred";
        } else {
          this.errorMessage = "Server error";
        }
      }
    },
  },
};
</script>

<style scoped>
.q-banner {
  margin-top: 20px;
}
</style>
