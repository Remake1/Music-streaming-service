<script setup>
import { modalStore } from './Store'
import Album from "@/components/album/Album.vue";
import {onMounted} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const props = defineProps({
  songId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['showPlaylistModal'])

function hide(){
  emit('showPlaylistModal');
}
async function add(id){
  await store.addSongToPlaylist(id, props.songId);
  emit('showPlaylistModal');
  await router.push({name: 'PlaylistPage', params: {id: id}});
}

const store = modalStore();

onMounted(async () => {
  await store.fetchPlaylists();
});

</script>

<template>
  <div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
    <div class="relative w-auto my-6 mx-auto max-w-6xl border-2 border-gray-50">
      <!--content-->
      <div class="modal border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-zinc-600 outline-none focus:outline-none">
        <!--header-->
        <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
          <h3 class="text-3xl font-semibold">
            {{ $t('playlist.add') }}
          </h3>
        </div>
        <!--body-->
        <div class="modal-body p-2">
          <div v-if="store.isReady">
            <div class="flex flex-wrap albums">
              <div v-for="playlist in store.playlists" :key="playlist">
                <Album
                    @click="add(playlist._id)"
                    :name="playlist.name"
                    :picture="playlist.picture"
                    :id="playlist._id"
                    :linkTo="'PlaylistPage'"
                    :isPrivate="!playlist.public"
                    :songsC="playlist.songs.length"
                    :hasLink="false"
                />
              </div>
            </div>
          </div>
        </div>

        <!--footer-->
        <div class="p-6 border-t border-solid border-blueGray-200 rounded-b">
          {{store.modalErr}}
          <div class="flex items-center justify-end">
            <button @click="hide" class="text-red-500 background-transparent font-bold uppercase px-6 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
              {{ $t('album.close') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-body{
  max-height: calc(100vh - 210px);
  overflow-y: auto;
  height: calc(100vh - 210px);
}
.modal{
  background-color: #282828;
}
button{
  background-color: #F26C6C;
  color: #fff;
}
</style>