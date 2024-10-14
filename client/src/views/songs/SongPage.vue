<template>
  <div class="song_details">

    <div class="song_info">
      <div class="cover">
        <img alt="song picture" :src="axios.defaults.baseURL+song.picture">
      </div>
      <h2>{{song.name}}</h2>
      <p class="user-name"> {{song.artist}} <br> {{ $t('create-song.song-author') }} {{userName}}</p>

      <button @click="activePlayer=true" class="p-2 mt-2 mx-2">{{ $t('create-song.play') }}</button>
      <button v-if="ownership" class="p-2 mt-2 mx-2" @click="deleteSong">{{ $t('create-song.delete') }}</button>
      <button v-if="authed" @click="showPlaylistModal=true" class="p-2 mt-2 mx-2">{{$t('playlist.add-to-playlist')}}</button>
    </div>

    <div class="song-list mb-8">
      <button class="switch" @click="tabs=true">{{ $t('create-song.song-text') }}</button>
      <button class="switch" @click="tabs=false">{{ $t('create-song.comments') }}</button>
        <div v-if="tabs">
          <p style="white-space: pre-line" class="text-xl">{{song.text}}</p>
        </div>


      <div v-if="!tabs">
        <addComment v-if="authed" :songId="$route.params.id"/>
        <div v-for="comment in song.comments" :key="comment" class="single-song">
          <div class="song-details">
            <h3>{{comment.username}}</h3>
            <p>{{comment.text}}</p>
          </div>
          <!--        <button v-if="ownership" @click="handleClick(comment.id)">Delete</button>-->
        </div>
      </div>
    </div>

  </div>

  <Player
      v-if="activePlayer"
    :file="axios.defaults.baseURL+song.audio"
  />

  <PlaylistModal
      v-if="showPlaylistModal"
      @showPlaylistModal="showPlaylistModal=false"
      :songId="$route.params.id"
  />

</template>

<script>
import {onMounted, ref} from "vue";
import axios from "axios";
import { useRoute } from 'vue-router';
import Player from "@/components/player/Player";
import addComment from "@/components/comment/addComment";
import VueCookies from "vue-cookies";
import {parseJwt} from "@/cookies/cookies";
import router from "@/router";
import PlaylistModal from "@/components/song/SongToPlaylistModal/PlaylistModal.vue";

export default {
  name: "OneSongPage",
  components: {PlaylistModal, Player, addComment},
  setup(){
    const tabs = ref(true)
    const song = ref({});
    const userName = ref('');
    const activePlayer = ref(false);
    const ownership = ref(false);
    const authed = ref(false);
    const showPlaylistModal = ref(false);

    const route = useRoute();

    async function deleteSong(){
      const res = await axios.delete(`/songs/${route.params.id}`, {
        headers: {
          Authorization: `Bearer ${VueCookies.get("token")}`
        }
      });
      console.log(res.data);
      await router.push("/songs");
    }

    async function addListen(){
      await axios.post(`/songs/listen/${route.params.id}`)
    }

    onMounted(async () => {
      const res = await axios.get(`/songs/${route.params.id}`);
      song.value = res.data;

      const res2 = await axios.get(`/users/${res.data.user}`);
      userName.value = res2.data.username;

      if(VueCookies.isKey('token')){
        if( parseJwt(VueCookies.get('token')).id === song.value.user){
          ownership.value = true;
        }
      }

      authed.value=VueCookies.isKey('token');
    })

    return {song, tabs, userName, activePlayer, ownership, deleteSong, authed, showPlaylistModal}
  }
}
</script>

<style scoped>
.song_details{
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
}
@media screen and (max-width: 768px) {
  .song_details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    padding: 0 20px;
  }
}
.cover{
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img{
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;

}
.song_info{
  text-align: center;
}
.song_info h2{
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.song_info p{
  margin-bottom: 20px;
}
.user-name{
  color: #8C8C8C;
}
.song_details h3{
  font-weight: 450;
}
.song-list h3{
  margin-bottom: 20px;
}
.single-song{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed #ff0000;
  margin-bottom: 20px;
  background: #F26C6C;
  padding: 20px;
  border-radius: 5px;
  margin-right: 1rem;
}
.switch{
  background: transparent;
  padding: 10px 20px;
  margin: 5px 20px 20px 5px;
  border-radius: 0;
  cursor: pointer;
  border-bottom: 2px solid #FF0000;
}
.switch:hover {
  color: white;
}
.switch:focus{
  border: 2px solid #FF0000;
}
</style>