<script setup>
import {useUserPlaylistsStore} from "@/stores/UserPlaylistsStore";
import {onMounted} from "vue";
import Album from "@/components/album/Album";
import {useRouter} from "vue-router";

const store = useUserPlaylistsStore()
const router = useRouter()

//create button
const createLink = async () => {
  await router.push('/playlists/create')
}

onMounted(() => {
  store.fetchPlaylists()
})

</script>

<template>

  <button @click="createLink" class="ml-4 mt-4">
    <div class="flex">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 12 12" width="24"><path d="m5.89822944 2.00684662.10177056-.00684662c.37969577 0 .69349096.28215388.74315338.64822944l.00684662.10177056v2.499l2.5.001c.37969577 0 .69349096.28215388.74315338.64822944l.00684662.10177056c0 .37969577-.28215388.69349096-.64822944.74315338l-.10177056.00684662-2.5-.001v2.501c0 .37969577-.28215388.69349096-.64822944.74315338l-.10177056.00684662c-.37969577 0-.69349096-.28215388-.74315338-.64822944l-.00684662-.10177056v-2.501l-2.5.001c-.37969577 0-.69349096-.28215388-.74315338-.64822944l-.00684662-.10177056c0-.37969577.28215388-.69349096.64822944-.74315338l.10177056-.00684662 2.5-.001v-2.499c0-.37969577.28215388-.69349096.64822944-.74315338l.10177056-.00684662z" fill="#fff"/></svg>
      </div>
      <div>
        {{ $t('create-playlist.create-playlist') }}
      </div>
    </div>
  </button>

  <div v-if="store.isReady">
    <div class="flex flex-wrap justify-center">
      <div v-for="playlist in store.playlists" :key="playlist">
        <Album
            :name="playlist.name"
            :picture="playlist.picture"
            :id="playlist._id"
            :linkTo="'PlaylistPage'"
            :isPrivate="!playlist.public"
            :songsC="playlist.songs.length"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <Loading />
  </div>
</template>