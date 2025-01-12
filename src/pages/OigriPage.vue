<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <!-- Game Info Section -->
      <q-card-section>
        <div class="text-h6">O igri: "Adventure Quest"</div>
        <div class="text-subtitle2 q-mb-md">
          Zabavi se u ovoj akcijskoj avanturi!
        </div>
        <div>
          "Adventure Quest" je akcijska igra otvorenog svijeta koja vam
          omogućava da istražujete fantastične prostore, borite se protiv
          čudovišta i razvijate svoj lik. Uživajte u uzbudljivim misijama,
          rješavanju zagonetki i suradnji s prijateljima u online multiplayeru!
        </div>
      </q-card-section>

      <!-- Game Story Section -->
      <q-card-section>
        <div class="text-h6 q-mb-md">Priča igre</div>
        <div class="story-content">
          <h2>Priča igre</h2>
          <p class="story-intro">
            Luka je običan mladić koji se osjeća izgubljeno u svakodnevnoj
            rutini. Njegov svijet je dosadan, bez smisla, a on vjeruje da je
            stvoren za nešto mnogo veće.
          </p>

          <div class="story-body">
            <h3>Početak putovanja</h3>
            <p>
              Luka nije mogao pronaći smisao u svom životu. Prolazio je kroz
              svaki dan, ali osjećao je da mu nešto nedostaje. Jednog dana, u
              potrazi za nečim uzbudljivim, odlučio je otići u šetnju po gradu,
              što ga je na kraju dovelo u staru knjižnicu. Tamo, slučajno,
              pronađe knjigu koja tvrdi da može ostvariti jednu želju – ako to
              dovoljno jako želi.
            </p>

            <h3>Magija želje</h3>
            <p>
              Luka, pun sumnje ali i nade, poželi da njegov život dobije smisao
              kakav nikada nije imao. I kao da prava magija djeluje, našao se na
              nepoznatom mjestu – između vremena i prostora. Na tom čudnom
              mjestu, mistično biće obećava da će mu pomoći u njegovoj potrazi
              za smislom.
            </p>

            <h3>Svjetovi i apokalipse</h3>
            <p>
              Luka saznaje da njegova nova misija nije obična – on mora putovati
              kroz različite svjetove, svaki s vlastitom apokalipsom. Svaki
              svijet je na rubu uništenja, i samo on može spasiti te svjetove
              koristeći svoju snagu, magiju ili mudrost. Svaki svijet nosi
              različite izazove, a Luka mora odabrati pravi put kako bi spasio
              svaki svijet od apokalipse.
            </p>

            <h3>Završna avantura</h3>
            <p>
              Luka postaje "World Adventurer" – junak koji putuje od svijeta do
              svijeta, boreći se protiv apokalipsa i spašavajući svjetove. Ali
              iza svakog spašenog svijeta, Luka se nada da će naći pravi smisao
              za svoj život. Iako njegova misija traje, svakim svijetom Luka
              dolazi bliže svojoj istinskoj sudbini.
            </p>
          </div>
        </div>
      </q-card-section>

      <!-- Game Features Section -->
      <q-card-section>
        <div class="text-h6 q-mb-md">Značajke igre</div>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>Otvoreni svijet</q-item-label>
              <q-item-label caption
                >Istražujte ogromne prostore, planine, šume, gradove i
                podzemlja.</q-item-label
              >
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Intenzivni multiplayer</q-item-label>
              <q-item-label caption
                >Igrajte s prijateljima ili se borite protiv drugih igrača širom
                svijeta.</q-item-label
              >
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Prilagodba likova</q-item-label>
              <q-item-label caption
                >Prilagodite izgled i vještine vašeg lika prema vlastitim
                željama.</q-item-label
              >
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Raznovrsne borbe</q-item-label>
              <q-item-label caption
                >Borite se s raznim čudovištima koristeći različite vještine i
                oružja.</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <!-- Game Characters Section -->
      <q-card-section>
        <div class="text-h6 q-mb-md">Likovi u igri</div>
        <q-list bordered>
          <q-item>
            <q-item-section>
              <q-item-label>Heroja</q-item-label>
              <q-item-label caption
                >Glavni lik igre koji kreće na uzbudljivu
                avanturu.</q-item-label
              >
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Rival</q-item-label>
              <q-item-label caption
                >Vaš glavni protivnik kojeg ćete morati svladati tijekom
                igre.</q-item-label
              >
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Mentor</q-item-label>
              <q-item-label caption
                >Iskusni borac koji vas vodi kroz igru i pomaže s novim
                vještinama.</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <!-- Screenshots and Trailer -->
      <q-card-section>
        <div class="text-h6 q-mb-md">Screenshots i Trailer</div>
        <img
          src="src/assets/kemal.jpg"
          alt="Kemal"
          class="q-mb-md"
          style="width: 100%; height: auto"
        />
        <img
          src="src/assets/kiki.jpg"
          alt="Kiki"
          class="q-mb-md"
          style="width: 100%; height: auto"
        />
        <img
          src="src/assets/tayk.jpg"
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
          Vaša priča počinje ovdje – preuzmite igru odmah!
        </div>
        <q-btn
          label="Kupite na Steam-u"
          color="primary"
          @click="goToSteam"
          class="q-mb-md"
        />
        <q-btn
          label="Preuzmite Epic Games"
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
