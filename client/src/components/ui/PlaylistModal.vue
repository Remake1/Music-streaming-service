<template>
  <div v-if="store.isModalShowed" class="backdrop-blur-sm overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
    <div class="w-8/12 relative w-auto my-6 mx-auto max-w-6xl border-2 border-gray-50">
      <!--content-->
      <div class="modal border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-zinc-600 outline-none focus:outline-none">
        <!--header-->
        <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
          <h3 class="text-3xl font-semibold">
            {{ $t('playlistPut') }}
          </h3>
        </div>
        <!--body-->
        <div class="modal-body p-2">
          <p class="mt-2">{{ $t('search-song-mdl') }}</p>
          <div class="flex">
            <input type="text" v-model="store.searchText">
            <div class="mx-2">
              <button @click="store.searchSong">{{ $t('search') }}</button>
            </div>
          </div>

          <div v-if="store.songs">
            {{store.empty}}
            <InfoBar />
            <div v-for="song in store.songs" :key="song">
              <Song
                  :name="song.name"
                  :artist="song.artist"
                  :picture="song.picture"
                  :audio="song.audio"
                  :id="song._id"
                  :text="song.text"
                  :link="false"
                  @click="store.addSongToPlaylist(song._id)"
              />
            </div>
          </div>
        </div>

        <!--footer-->
        <div class="p-6 border-t border-solid border-blueGray-200 rounded-b">
          {{store.modalErr}}
          <div class="flex items-center justify-end">
            <button class="text-red-500 background-transparent font-bold uppercase px-6 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="store.isModalShowed=false">
              {{ $t('album.close') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="store.isModalShowed" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
</template>

<script setup>
import {usePlaylistStore} from "@/stores/PlaylistStore";
import Song from "@/components/song/Song";
import InfoBar from "@/components/ui/InfoBar.vue";

const store = usePlaylistStore();

</script>

<style scoped>
.modal-body{
  max-height: calc(100vh - 210px);
  overflow-y: auto;
  height: calc(100vh - 210px);
}
.modal{
  background-color: #282828;
}
</style>