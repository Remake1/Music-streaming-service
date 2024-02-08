<script setup>
import {usePlaylistStore} from "@/stores/PlaylistStore";

const store = usePlaylistStore();
</script>

<template>
  <button class="mt-2" @click="store.shareModal=!store.shareModal">
    <div class="flex">
      <svg width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h24v24h-24z" fill="#fff" opacity="0"/><path d="m18 15a3 3 0 0 0 -2.1.86l-7.9-3.52c0-.12 0-.22 0-.34s0-.22 0-.33l7.9-3.53a3 3 0 1 0 -.9-2.14v.34l-7.9 3.52a3 3 0 1 0 0 4.28l7.9 3.53v.33a3 3 0 1 0 3-3z" fill="#fff"/></svg>
      {{ $t('playlist.share') }}
    </div>
  </button>
  <div v-if="store.shareModal" class="modal">
    <div v-if="!store.playlist.public" class="p-4 border-b-song-gray border-8" style="background-color: rgba(0, 0, 0, 0.8);">
      <h2 class="text-2xl my-2">{{ $t('playlist.make-public') }}</h2>
      <button
        @click="store.makePublic"
      >
        {{ $t('playlist.p-but') }}
      </button>
      <button
        @click="store.shareModal=false"
        style="background-color: #8C8C8C">
        {{ $t('playlist.c-but') }}
      </button>
    </div>
    <div v-else class="p-4 border-b-song-gray border-8" style="background-color: rgba(0, 0, 0, 0.8);">
      <h2 class="text-2xl">{{ $t('playlist.link') }}</h2>
      <input style="width: 300px" type="text" readonly :value="`http://localhost:8080/playlists/v/${store.playlist._id}`">
      <button
        @click="store.shareModal=false"
        style="background-color: #8C8C8C">
        {{ $t('playlist.c-but') }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  button {
    margin: 0 10px 10px 0;
  }
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  background-color: cornflowerblue;
  &:hover {
    background-color: #a2bff3;
  }
}
</style>
