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
                <div class="text-h6">{{ decodeHtml(question.question) }}</div>

                <!-- Skriveni odgovor -->
                <div v-if="question.showAnswer" class="q-mt-md text-subtitle2">
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
  loading.value = true; // Postavljanje loading statusa
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&category=15&difficulty=medium"
    );
    const data = await response.json();

    if (data.response_code === 0) {
      // Dodajemo odgovore u pitanja
      questions.value = data.results.map((question) => ({
        ...question,
        showAnswer: false, // Postavljamo da odgovori nisu prikazani inicijalno
      }));
    } else {
      Notify.create({
        type: "negative",
        message: "Error fetching trivia questions. Please try again later.",
      });
    }
  } catch (error) {
    Notify.create({
      type: "negative",
      message: "Failed to fetch trivia questions.",
    });
  } finally {
    loading.value = false; // Završetak učitavanja
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
</style>
