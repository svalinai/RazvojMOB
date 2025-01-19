<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <!-- Game Info Section -->
      <q-card-section>
        <div class="text-h6">{{ $t("gameInfo.title") }}</div>
        <div class="text-subtitle2 q-mb-md">
          {{ $t("gameInfo.subtitle") }}
        </div>
        <div>
          {{ $t("gameInfo.description") }}
        </div>
      </q-card-section>

      <!-- Game Story Section -->
      <q-card-section>
        <div class="text-h6 q-mb-md">{{ $t("gameStory.title") }}</div>
        <div class="story-content">
          <h2>{{ $t("gameStory.title") }}</h2>
          <p class="story-intro">
            {{ $t("gameStory.introduction") }}
          </p>

          <div class="story-body">
            <h3>{{ $t("gameStory.journeyStart.title") }}</h3>
            <p>
              {{ $t("gameStory.journeyStart.text") }}
            </p>

            <h3>{{ $t("gameStory.magicWish.title") }}</h3>
            <p>
              {{ $t("gameStory.magicWish.text") }}
            </p>

            <h3>{{ $t("gameStory.worldsAndApocalypses.title") }}</h3>
            <p>
              {{ $t("gameStory.worldsAndApocalypses.text") }}
            </p>

            <h3>{{ $t("gameStory.finalAdventure.title") }}</h3>
            <p>
              {{ $t("gameStory.finalAdventure.text") }}
            </p>
          </div>
        </div>
      </q-card-section>

      <!-- Game Features Section -->
      <q-card-section>
        <div class="text-h6 q-mb-md">{{ $t("gameFeatures.title") }}</div>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>{{
                $t("gameFeatures.worldExploration.title")
              }}</q-item-label>
              <q-item-label caption>{{
                $t("gameFeatures.worldExploration.description")
              }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>{{
                $t("gameFeatures.multiplayer.title")
              }}</q-item-label>
              <q-item-label caption>{{
                $t("gameFeatures.multiplayer.description")
              }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>{{
                $t("gameFeatures.characterCustomization.title")
              }}</q-item-label>
              <q-item-label caption>{{
                $t("gameFeatures.characterCustomization.description")
              }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>{{ $t("gameFeatures.combat.title") }}</q-item-label>
              <q-item-label caption>{{
                $t("gameFeatures.combat.description")
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <!-- Game Characters Section -->
      <q-card-section>
        <div class="text-h6 q-mb-md">{{ $t("gameCharacters.title") }}</div>
        <q-list bordered>
          <q-item>
            <q-item-section>
              <q-item-label>{{ $t("gameCharacters.hero.title") }}</q-item-label>
              <q-item-label caption>{{
                $t("gameCharacters.hero.description")
              }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>{{
                $t("gameCharacters.rival.title")
              }}</q-item-label>
              <q-item-label caption>{{
                $t("gameCharacters.rival.description")
              }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>{{
                $t("gameCharacters.mentor.title")
              }}</q-item-label>
              <q-item-label caption>{{
                $t("gameCharacters.mentor.description")
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <!-- Screenshots and Trailer -->
      <q-card-section>
        <div class="text-h6 q-mb-md">Screenshots i Trailer</div>
        <img
          src="src/assets/ter1.jpeg"
          alt="Kemal"
          class="q-mb-md"
          style="width: 100%; height: auto"
        />
        <img
          src="src/assets/ter2.png"
          alt="Kiki"
          class="q-mb-md"
          style="width: 100%; height: auto"
        />
        <img
          src="src/assets/ter3.jpeg"
          alt="Tayk"
          class="q-mb-md"
          style="width: 100%; height: auto"
        />
      </q-card-section>

      <!-- YouTube Button -->
      <q-card-section>
        <div class="text-h6 q-mb-md">WorldAdventure Official Trailer</div>
        <q-btn
          label="Youtube"
          color="accent"
          @click="goToYouTube"
          icon="videocam"
        />
      </q-card-section>

      <!-- Purchase and Download Links -->
      <q-card-section>
        <div class="text-h6 q-mb-md">
          {{ $t("downloadSection.title") }}
        </div>
        <q-btn
          :label="$t('downloadSection.steamButton')"
          color="primary"
          @click="goToSteam"
          class="q-mb-md"
        />
        <q-btn
          :label="$t('downloadSection.epicGamesButton')"
          color="secondary"
          @click="goToEpicGames"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  methods: {
    goToSteam() {
      window.open("https://store.steampowered.com", "_blank");
    },
    goToEpicGames() {
      window.open("https://www.epicgames.com/store", "_blank");
    },
    goToYouTube() {
      window.open(
        "https://www.youtube.com/watch?v=lEy-OHjuX24&ab_channel=ellenelita",
        "_blank"
      ); // Open the YouTube page
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

.q-card {
  max-width: 900px;
  margin: auto;
  background-color: #fff;
}

.story-content h2 {
  font-size: 2em;
  color: #3d5afe;
}

.story-intro {
  font-size: 1.2em;
  margin: 20px 0;
}

.story-body h3 {
  font-size: 1.5em;
  color: #6200ea;
}

.story-body p {
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 20px;
}
</style>
