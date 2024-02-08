<template>
<div>
  <h1 class="text-2xl font-bold ml-2">{{ $t('search-song') }}</h1>
  <div class="flex m-4">
    <input type="text" v-model="searchText">
    <div class="mx-2">
      <button type="submit" @click="submitSearch">{{ $t('search') }}</button>
    </div>
  </div>

  <div v-if="songs">
    {{empty}}
    <InfoBar v-if="songs.length>0" />
    <div v-for="song in songs" :key="song">
      <Song
          :name="song.name"
          :artist="song.artist"
          :picture="song.picture"
          :audio="song.audio"
          :id="song._id"
          :text="song.text"
      />
    </div>
  </div>

</div>
</template>

<script>
import {ref} from "vue";
import axios from "axios";
import Song from "@/components/song/Song";
import InfoBar from "@/components/ui/InfoBar.vue";

export default {
  name: "SearchSong",
  components: {InfoBar, Song},
  setup(){
    const searchText = ref('');
    const songs = ref([]);
    const empty = ref('')

    const submitSearch = async () => {
      if(searchText.value) {
        const res = await axios.get(`/songs/search?search=${searchText.value}`)
        songs.value = []
        empty.value = ""
        songs.value = res.data
        if(res.data.length===0){
          empty.value = "Unable to find anything. Нічого не знайдено"
        }
      }
    }


    return {
      searchText,
      submitSearch,
      songs,
      empty
    }
  }
}
</script>

<style scoped>
input[type=text] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid red;
}
button{
  background-color: #F26C6C;
}
</style>