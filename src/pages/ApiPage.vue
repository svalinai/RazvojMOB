<template>
  <q-page class="flex flex-center">
    <q-card class="my-card q-ma-md" style="width: 450px; max-width: 100%">
      <!-- Zaglavlje -->
      <q-card-section>
        <div class="text-h5 text-center text-accent">
          <q-icon name="help_outline" size="xl" />
          <div class="q-mt-xs">Fun Trivia - Can You Guess?</div>
        </div>
      </q-card-section>

      <!-- Prikazivanje pitanja -->
      <q-card-section class="q-pa-none">
        <div v-if="loading" class="q-pa-md text-center">
          <q-spinner color="accent" size="50px" />
          <div class="q-mt-md">Loading Fun Trivia...</div>
        </div>

        <q-list v-else>
          <q-item
            v-for="(question, index) in questions"
            :key="index"
            clickable
            @click="toggleAnswer(index)"
          >
            <q-item-section>
              <div class="q-pa-xs">
                <!-- Pitanje -->
                <div class="text-h6 text-primary">
                  {{ decodeHtml(question.question) }}
                </div>

                <!-- Skriveni odgovor -->
                <div
                  v-if="question.showAnswer"
                  class="q-mt-md text-subtitle2 text-success"
                >
                  <strong>Answer:</strong>
                  {{ decodeHtml(question.correct_answer) }}
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <!-- Prikazivanje akcija -->
      <q-card-actions align="center" class="q-pa-sm">
        <q-btn
          label="Get New Trivia"
          @click="fetchTriviaQuestions"
          color="accent"
          class="full-width"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { Notify } from "quasar";

const questions = ref([]);
const loading = ref(true);

// Funkcija za dekodiranje HTML entiteta
const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

// Funkcija za dohvat pitanja sa Open Trivia API
const fetchTriviaQuestions = async () => {
  loading.value = true; // Set loading state to true
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&category=15&difficulty=medium"
    );
    const data = await response.json();

    // Check for response code from API
    if (data.response_code === 0) {
      // Successfully received questions
      questions.value = data.results.map((question) => ({
        ...question,
        showAnswer: false, // Initially set answers hidden
      }));
    } else if (data.response_code === 1) {
      // No results found
      Notify.create({
        type: "negative",
        message: "No trivia questions found. Please try again later.",
      });
    } else if (data.response_code === 2) {
      // Invalid API key (if applicable)
      Notify.create({
        type: "negative",
        message: "Invalid API key. Please check your configuration.",
      });
    } else if (data.response_code === 3) {
      // Token not found or invalid (if using tokens)
      Notify.create({
        type: "negative",
        message: "Invalid or expired token. Please try again.",
      });
    } else if (data.response_code === 4) {
      // Too many requests (rate limit exceeded)
      Notify.create({
        type: "negative",
        message: "API rate limit exceeded. Please try again later.",
      });
    } else {
      // Unknown response code
      Notify.create({
        type: "negative",
        message: "An unknown error occurred. Please try again later.",
      });
    }
  } catch (error) {
    // General error handling (e.g., network issues)
    Notify.create({
      type: "negative",
      message:
        "Failed to fetch trivia questions. Please check your connection.",
    });
  } finally {
    loading.value = false; // End loading state
  }
};

// Funkcija za prebacivanje prikaza odgovora na pitanje
const toggleAnswer = (index) => {
  questions.value[index].showAnswer = !questions.value[index].showAnswer;
};

// Pozivanje funkcije kada je stranica učitana
fetchTriviaQuestions();
</script>

<style scoped>
.my-card {
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.text-accent {
  color: #e91e63 !important;
}

.q-btn {
  padding: 12px 24px;
  font-weight: bold;
}

.text-subtitle2 {
  color: #555;
}

.q-item {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}

.q-item-section {
  padding: 0 15px;
}

.q-mt-md {
  margin-top: 16px;
}

.q-pa-xs {
  padding: 8px;
}

.q-pa-sm {
  padding: 16px;
}

/* Custom Colors */
.text-primary {
  color: #1976d2; /* Primary Color */
}

.text-success {
  color: #4caf50; /* Success Color (Green) */
}

.text-h6 {
  font-size: 1.25rem;
}
</style>
