<script setup>
import {songTool} from "@/stores/tools/songTool";
import {usePlaylistAnonStore} from "@/stores/PlaylistAnonStore";
import Player from "@/components/player/Player";
import Song from "@/components/song/Song";
import {onBeforeMount} from "vue";
import {useRoute} from "vue-router/dist/vue-router";
import axios from "axios";

const store = usePlaylistAnonStore();
const route = useRoute();

onBeforeMount(() => {
  store.getPlaylist(route.params.id);
});

</script>

<template>
  <div v-if="store.playlist.public" class="flex flex-row flex-wrap">
    <div class="m-4">
      <img alt="album picture" class="object-cover rounded-lg h-56 w-56" :src="this.$baseUrl + store.playlist.picture">
      <p class="mt-2 text-lg font-semibold">{{store.playlist.name}}</p>
      <p class="text-lg">{{store.playlist.author}}</p>
      <p>{{store.playlist.songs.length}} {{ songTool(store.playlist.songs.length) }}</p>
    </div>
    <div class="m-4 flex-1">
      <div v-for="song in store.playlist.songs" :key="song">
        <Song
            :name="song.name"
            :artist="song.artist"
            :picture="song.picture"
            :audio="song.audio"
            :id="song._id"
            :text="song.text"
            @click="store.playSong(song.audio)"
        />
      </div>
      <span v-if="store.playlist.songs.length === 0">{{ $t('no-songs') }}</span>
    </div>
  </div>

  <div v-else>
    <p class="text-4xl">{{ $t('playlist-is-private') }}</p>
  </div>

  <Player
      v-if="store.activePlayer"
      :file="store.playerAudio"
  />
</template>