<template>
  <div v-if="isReady">
    <div class="flex flex-wrap justify-center">
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
    <div class="flex flex-row justify-center items-center my-12">
      <button @click="prevStep" :disabled="isInFirstPage" class="mx-2">&lt;</button>
      <button @click="nextStep" :disabled="!isInLastPage" class="mx-2">&gt;</button>
    </div>
  </div>
  <div v-else>
    <Loading />
  </div>
</template>

<script>
import Album from "@/components/album/Album";
import {onMounted, ref, computed} from "vue";
import axios from "axios";
import Loading from "@/components/ui/Loading";

export default {
  name: "AllAlbums",
  components: {Album, Loading},
  setup(){

    const albumCount = ref(0)
    const numOfPages = ref(0)
    const offset = ref(0)

    const isReady = ref(false);
    const albums = ref([]);

    const loadAlbums = async (offset) => {
      const res = await axios.get(`/album?offset=${offset}&count=8`);
      albums.value = []
      albums.value = res.data
    }

    const isInFirstPage = computed(() => {
      return offset.value === 0;
    })

    const isInLastPage = computed(() => {
      return offset.value+10 < albumCount.value;
    })

    const nextStep = async () => {
      offset.value += 10;
      await loadAlbums(offset.value)
    }
    const prevStep = async () => {
      if (offset.value > 0) {
        offset.value -= 10
        await loadAlbums(offset.value)
      }
    }

    onMounted(async () =>{
      const res = await axios.get('/album/count');
      await loadAlbums(0)

      albumCount.value = res.data;
      numOfPages.value = Math.ceil(albumCount/10)

      isReady.value = true

    })

    return{
      albumCount,
      numOfPages,
      isReady,
      albums,
      offset,
      nextStep,
      prevStep,
      isInFirstPage,
      isInLastPage
    }
  }
}
</script>

<style scoped>
button:disabled{
  background: #8C8C8C;
  cursor: not-allowed;
}
</style>