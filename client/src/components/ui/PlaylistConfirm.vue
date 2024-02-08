<script setup>
import {usePlaylistStore} from "@/stores/PlaylistStore";

const store = usePlaylistStore();
</script>

<template>
  <button class="mt-2" @click="store.delConfirm=!store.delConfirm">
    <div class="flex">
      <svg width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h24v24h-24z" fill="#fff" opacity="0"/><g fill="#fff"><path d="m21 6h-5v-1.67a2.42 2.42 0 0 0 -2.5-2.33h-3a2.42 2.42 0 0 0 -2.5 2.33v1.67h-5a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-11h1a1 1 0 0 0 0-2zm-11-1.67c0-.16.21-.33.5-.33h3c.29 0 .5.17.5.33v1.67h-4zm8 14.67a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1-1v-11h12z"/><path d="m9 17a1 1 0 0 0 1-1v-4a1 1 0 0 0 -2 0v4a1 1 0 0 0 1 1z"/><path d="m15 17a1 1 0 0 0 1-1v-4a1 1 0 0 0 -2 0v4a1 1 0 0 0 1 1z"/></g></svg>
      {{ $t('create-playlist.del') }}
    </div>
  </button>
  <div v-if="store.delConfirm" class="confirm">
    <div class="content p-4 border-b-song-gray border-8" style="background-color: rgba(0, 0, 0, 0.8);">
      <h2 class="text-2xl mb-2">{{ $t('playlist.confirm') }}</h2>
      <button @click="store.delPlaylist" class="mx-2">{{ $t('playlist.d-but') }}</button>
      <button @click="store.delConfirm=false" style="background-color: grey">{{ $t('playlist.c-but') }}</button>
    </div>
  </div>
</template>

<style scoped>
.confirm {
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
</style>