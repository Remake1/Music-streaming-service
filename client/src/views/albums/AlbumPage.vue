<template>
  <div class="flex flex-row flex-wrap">
    <div class="m-4">
      <img alt="album picture" class="object-cover rounded-lg h-56 w-56" :src="`http://localhost:3000/${album.picture}`">
      <p class="mt-2 text-lg font-semibold">{{album.name}}</p>
      <p class="text-lg">{{album.author}}</p>
      <p style="color: #8C8C8C"><i>{{album.songs.length}}</i> {{ songTool(album.songs.length) }}</p>
      <p style="color: #8C8C8C">{{ $t("uploaded") }} <i>{{userName}}</i></p>
      <div v-if="ownership" class="flex flex-row justify-center items-center mt-4">
        <button class="mr-2" @click="renderModal" >{{ $t('album.put') }}</button>
        <button class="ml-2" @click="deletePlaylist">{{ $t('album.delete') }}</button>
      </div>
    </div>
    <div class="m-4 flex-1">
      <InfoBar />
      <div v-for="song in album.songs" :key="song">
        <Song
            :name="song.name"
            :artist="song.artist"
            :picture="song.picture"
            :audio="song.audio"
            :id="song._id"
            :text="song.text"
            @click="playSong(song.audio)"
        />
      </div>
      <span v-if="album.songs.length === 0">No Songs</span>
    </div>
  </div>

  <Modal
      :showModal="showModal"
      :songs="songs"
      :albumId="$route.params.id"
  />

  <Player
      v-if="activePlayer"
      :file="playerAudio"
  />
</template>

<script>
import Player from "@/components/player/Player";
import {onBeforeMount, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import axios from "axios";
import VueCookies from "vue-cookies";
import {parseJwt} from "@/cookies/cookies";
import Song from "@/components/song/Song";
import Modal from "@/components/ui/Modal";
import {songTool} from "@/stores/tools/songTool";
import InfoBar from "@/components/ui/InfoBar.vue";

export default {
  name: "AlbumPage",
  components: {Player, Song, Modal, InfoBar},
  setup(){
    const ownership = ref(false);
    const authed = ref(false);
    const userName = ref('');
    const userId = ref('')
    const album = ref({});

    const activePlayer = ref(false)
    const playerAudio = ref('')

    const showModal = ref(false)
    const songs = ref([])

    const route = useRoute();
    const router = useRouter()

    //player
    const playSong = async (audio) => {
      activePlayer.value = true;
      playerAudio.value = `http://localhost:3000/${audio}`;
      console.log("play song");
    }

    //Delete
    const deletePlaylist = async () => {
      await axios.delete(`/album/${route.params.id}`, {
        headers: {
          'Authorization': `Bearer ${VueCookies.get('token')}`
        }
      }).then(console.log).catch(console.log);
      await router.push(`/albums`)
    }

    //RenderModal
    const renderModal = async () => {
      const res = await axios.get(`/songs/user?id=${userId.value}`)
      songs.value = res.data;
      showModal.value = true
    }

    onBeforeMount(async () => {
      const res = await axios.get(`/album/${route.params.id}`)
      album.value = res.data;
      console.log(res.data)

      const res2 = await axios.get(`/users/${res.data.user}`);
      console.log(res2)
      userName.value = res2.data.username;
      userId.value = res2.data._id;

      if(VueCookies.isKey('token')){
        if( parseJwt(VueCookies.get('token')).id === album.value.user){
          ownership.value = true;
        }
      }

      authed.value=VueCookies.isKey('token');
    })

    return{
      ownership,
      authed,
      userName,
      album,
      activePlayer,
      playSong,
      playerAudio,
      deletePlaylist,
      showModal,
      songs,
      renderModal,
      songTool
    }
  }
}
</script>

<style scoped>

</style>