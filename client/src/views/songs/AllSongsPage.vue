<template>
  <div class="home">
    <!-- Sort by newest -->
    <div class="line">
      <div class="flex flex-wrap">
        <div class="flex items-center mx-6 mt-2">
          <label for="newest">{{ $t('sort-old') }}</label>
          <input
              v-model="filters" value="old" @change="loadSongs(offset)"
              class="m-2" type="radio" id="newest" name="filter"
          />
        </div>
        <div class="flex items-center mx-6 mt-2">
          <label for="newest">{{ $t('sort-new') }}</label>
          <input
              v-model="filters" value="new" @change="loadSongs(offset)"
              class="m-2" type="radio" id="newest" name="filter"
          />
        </div>
        <div class="flex items-center mx-6 mt-2">
          <label for="newest">{{ $t('sort-aph') }}</label>
          <input
              v-model="filters" value="aph" @change="loadSongs(offset)"
              class="m-2" type="radio" id="newest" name="filter"
          />
        </div>
        <div class="flex items-center mx-6 m-2">
          <label for="newest">{{ $t('sort-art') }}</label>
          <input
              v-model="filters" value="art" @change="loadSongs(offset)"
              class="m-2" type="radio" id="newest" name="filter"
          />
        </div>
      </div>

      <div v-if="VueCookies.isKey('token')" class="flex items-center mx-6 my-1">
        <label for="newest">{{ $t('filter-my') }}</label>
        <input
            v-model="filters" value="usr" @change="loadMySongs"
            class="m-2" type="radio" id="newest" name="filter"
        />
      </div>
    </div>


    <InfoBar />

    <div v-if="!loading">
      <div v-for="song in songs" :key="song">
        <Song
            :name="song.name"
            :artist="song.artist"
            :picture="song.picture"
            :audio="song.audio"
            :id="song._id"
            :text="song.text"
            @click="playSong(song.audio)"
        />
      </div>
      <div v-if="activePlayer" class="player">
        <Player
            :file="playerAudio"
        />
      </div>
      <div v-if="filters!=='usr'" class="flex flex-row justify-center items-center my-12">
        <button @click="prevStep" :disabled="isInFirstPage" class="mx-2">&lt;</button>
        <button @click="nextStep" :disabled="!isInLastPage" class="mx-2">&gt;</button>
      </div>
    </div>
    <div v-else>
      <Loading />
    </div>

  </div>
</template>

<script>
import {computed, onMounted, reactive, ref} from "vue";
import axios from "axios";
import Song from "@/components/song/Song";
import Player from "@/components/player/Player";
import Loading from "@/components/ui/Loading";
import InfoBar from "@/components/ui/InfoBar";
import VueCookies from "vue-cookies";
import {parseJwt} from "@/cookies/cookies";

export default {
  name: 'Home',
  computed: {
    VueCookies() {
      return VueCookies
    }
  },
  components: {InfoBar, Loading, Song, Player},
  setup() {

    const songs = ref([]);
    const loading = ref(true);

    const filters = ref("old")

    const activePlayer = ref(false);
    const playerAudio = ref('');

    //player
    const playSong = async (audio) => {
      activePlayer.value = true;
      playerAudio.value = `${axios.defaults.baseURL+audio}`;
      console.log("play song");
    }
    //--------

    //Pagination
    let songCount = ref(0);
    const offset = ref(0);
    const numOfPages = ref(0);

    const isInFirstPage = computed(() => {
      return offset.value === 0;
    })

    const isInLastPage = computed(() => {
      return offset.value+10 < songCount.value;
    })
    //--------

    const nextStep = async () => {
      // let s = await axios.get('http://localhost:5000/songs/number');
        offset.value += 10;
        await loadSongs(offset.value)
    }
    const prevStep = async () => {
      if (offset.value > 0) {
        offset.value -= 10;
        await loadSongs(offset.value)
      }
    }

    const loadSongs = async (offset) => {
      const res = await axios.get(`/songs?offset=${offset}&filter=${filters.value}`); //get songs
      songs.value = []
      songs.value = res.data
    }

    async function loadMySongs(){
      const res = await axios.get(`/songs/user?id=${parseJwt(VueCookies.get('token')).id}`, {
        headers: {
          Authorization: `Bearer ${VueCookies.get("token")}`
        }
      }); //get songs

      songs.value = []
      songs.value = res.data
    }



    onMounted(async () => {
      const res2 = await axios.get('/songs/number'); //get amount of songs
      await loadSongs(0);

      songCount.value = res2.data;
      numOfPages.value=Math.ceil(songCount/10);

      loading.value = false;

      console.log(offset.value+10 > songCount.value)
      console.log(offset.value)
      console.log(songCount.value)

    })

    return {
      songs,
      playSong,
      activePlayer,
      playerAudio,
      loading,
      nextStep,
      prevStep,
      offset,
      isInFirstPage,
      isInLastPage,
      songCount,
      filters,
      loadSongs,
      loadMySongs
    }
  }
}
</script>

<style scoped>
button:disabled,
button[disabled] {
  background: #8C8C8C;
  cursor: not-allowed;
}
.line{
  border-bottom: 1px solid rgba(186, 186, 186, 0.5);
}
</style>
