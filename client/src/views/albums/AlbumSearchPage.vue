<template>
  <div>
    <h1 class="text-2xl font-bold ml-2">{{ $t('album.search') }}</h1>
    <div class="flex m-4">
      <input type="text" v-model="searchText">
      <div class="mx-2">
        <button type="submit" @click="submitSearch">{{ $t('search') }}</button>
      </div>
    </div>

    <div v-if="albums" class="flex flex-wrap">
      {{empty}}
      <div v-for="album in albums" :key="album">
        <Album
            :name="album.name"
            :author="album.author"
            :picture="album.picture"
            :id="album._id"
            :songsC="album.songs.length"
        />
      </div>
    </div>

  </div>
</template>

<script>
import {ref} from "vue";
import axios from "axios";
import Album from "@/components/album/Album";

export default {
  components: {Album},
  setup(){
    const searchText = ref('');
    const albums = ref([]);
    const empty = ref('')

    const submitSearch = async () => {
      if(searchText.value) {
        const res = await axios.get(`/album/search?query=${searchText.value}`)
        albums.value = []
        empty.value = ""
        albums.value = res.data
        if(res.data.length===0){
          empty.value = "Unable to find anything. Нічого не знайдено"
        }
      }
    }


    return {
      searchText,
      submitSearch,
      albums,
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