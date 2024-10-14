<template>

  <div v-if="!store.ownPlaylist">
    <div class="flex items-center justify-center h-screen">
      <div id="logo">
        <svg width="200" height="200" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M68.64 13.3467C64.48 6.19667 45.6733 4.68 43.55 4.485L41.1667 4.33334V48.295C40.6158 47.8497 40.0288 47.4511 39.4117 47.1033C37.2354 46.008 34.8599 45.3646 32.4284 45.2119C29.9968 45.0592 27.5595 45.4005 25.2633 46.215C16.3367 49.0967 10.595 57.33 12.4583 64.5667C12.8736 66.0971 13.5997 67.5257 14.5912 68.7633C15.5828 70.0008 16.8186 71.0209 18.2217 71.76C20.627 73.0433 23.3172 73.6991 26.0433 73.6667C28.2371 73.6648 30.4166 73.3138 32.5 72.6267C40.5167 70.0483 45.9333 63.1583 45.63 56.55V18.395C47.7967 18.655 50.765 19.11 53.9067 19.7817C57.0166 20.2544 60.0046 21.3289 62.7033 22.945C64.87 24.375 63.5267 27.0617 63.4183 27.2783C62.3827 28.8508 61.1765 30.3041 59.8217 31.6117C59.4276 32.0024 59.1985 32.5295 59.1816 33.0842C59.1647 33.6389 59.3613 34.179 59.7309 34.593C60.1004 35.007 60.6148 35.2634 61.1678 35.3094C61.7209 35.3554 62.2705 35.1873 62.7033 34.84C63.1583 34.3417 74.75 23.8333 68.64 13.3467Z" fill="#FF0000"/>
        </svg>
      </div>
      <h1 class="text-6xl">{{ $t('notOwnPlaylist') }}</h1>
    </div>
  </div>

  <div class="flex flex-row flex-wrap" v-if="store.ownPlaylist">
    <div class="m-4">
      <img alt="album picture" class="object-cover rounded-lg h-56 w-56" :src="axios.defaults.baseURL+store.playlist.picture">
      <div class="flex">
        <p class="mt-2 text-lg font-semibold">{{store.playlist.name}}</p> <div v-if="!store.playlist.public" class="tooltip"><div class="tooltiptext">{{ $t('playlist-is-private') }}</div><PlaylistLock /></div>
      </div>
      <p class="text-lg">{{store.playlist.author}}</p>
      <p>{{store.playlist.songs.length}} {{ songTool(store.playlist.songs.length) }}</p>

      <button class="mt-2 add" @click="store.isModalShowed=true">
        <div class="flex">
          <svg width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h24v24h-24z" fill="#ffffff" opacity="0"/><g fill="#ffffff"><path d="m19.74 8.33-5.44-6a1 1 0 0 0 -.74-.33h-7a2.53 2.53 0 0 0 -2.56 2.5v15a2.53 2.53 0 0 0 2.56 2.5h10.88a2.53 2.53 0 0 0 2.56-2.5v-10.5a1 1 0 0 0 -.26-.67zm-5.74-3.33 2.74 3h-2a.79.79 0 0 1 -.74-.85zm3.44 15h-10.88a.53.53 0 0 1 -.56-.5v-15a.53.53 0 0 1 .56-.5h5.44v3.15a2.79 2.79 0 0 0 2.71 2.85h3.29v9.5a.53.53 0 0 1 -.56.5z"/><path d="m14 13h-1v-1a1 1 0 0 0 -2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0v-1h1a1 1 0 0 0 0-2z"/></g></svg>
          {{ $t('add-song') }}
        </div>
      </button>
      <br>
      <PlaylistShare />
      <br>
      <PlaylistConfirm />
    </div>
    <div class="m-4 flex-1">
      <InfoBar />
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

  <PlaylistModal />

  <Player
      v-if="store.activePlayer"
      :file="store.playerAudio"
  />

</template>

<script setup>

import {onBeforeMount} from "vue";
import {usePlaylistStore} from "@/stores/PlaylistStore";
import {useRoute} from "vue-router";
import Song from "@/components/song/Song";
import PlaylistModal from "@/components/ui/PlaylistModal";
import {songTool} from "@/stores/tools/songTool";
import Player from "@/components/player/Player";
import PlaylistConfirm from "@/components/ui/PlaylistConfirm";
import PlaylistShare from "@/components/ui/PlaylistShare";
import PlaylistLock from "@/components/ui/PlaylistLock.vue";
import {useLockHoverStore} from "@/stores/LockHoverStore";
import InfoBar from "@/components/ui/InfoBar.vue";
import axios from "axios";


const route = useRoute();
const store = usePlaylistStore();
const hoverStore = useLockHoverStore();

onBeforeMount(() => {
  store.getPlaylist(route.params.id);
});

</script>

<style scoped lang="scss">
.add{
  background-color: #1DB954;
  &:hover{
    background-color: rgba(102, 189, 133, 0.88);
  }
}
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
