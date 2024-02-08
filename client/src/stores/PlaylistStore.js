import {defineStore} from "pinia";
import axios from "axios";
import VueCookies from "vue-cookies";
import router from "@/router";

export const usePlaylistStore = defineStore( 'playlist', {
  state: () => ({
    playlist: {},
    ownPlaylist: true,
    isModalShowed: false,
    empty: "",
    songs: [],
    searchText: "",
    modalErr: "",
    activePlayer: false,
    playerAudio: null,
    delConfirm: false,
    shareModal: false,
  }),
  actions: {
    async getPlaylist(id) {
        try {
            const req = await axios.get(`/playlists/${id}`, {
                headers: {
                    Authorization: `Bearer ${VueCookies.get('token')}`
                }
            });
            this.playlist = req.data;
        } catch (e) {
            this.ownPlaylist = false;
            console.log(e);
        }
    },
    renderModal(){
          this.isModalShowed = true;
      },
    async searchSong(){
          if(this.searchText) {
              const res = await axios.get(`/songs/search?search=${this.searchText}`)
              this.songs = []
              this.empty = ""
              this.songs = res.data
              if(res.data.length===0){
                  this.empty = "Unable to find anything. Нічого не знайдено"
              }
          }
      },
    async addSongToPlaylist(selectedSong){
        try {
            const res = await axios.put(`/playlists/${this.playlist._id}/${selectedSong}`, {}, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${VueCookies.get('token')}`
                }
            });

            this.isModalShowed = false;
            router.go(0);

        } catch (e) {
            this.modalErr = "Error. Помилка"
        }
      },
    async playSong (audio) {
      this.activePlayer = true;
      this.playerAudio = `http://localhost:3000/${audio}`;
      console.log("play song");
  },
      async delPlaylist () {
        const res = await axios.delete(`/playlists/${this.playlist._id}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${VueCookies.get('token')}`
            }
        });
        console.log(res);
        this.delConfirm = false;
        await router.push({name: 'UserPlaylists'})
      },
      async makePublic () {
        const res = await axios.patch(`/playlists/${this.playlist._id}`, {}, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${VueCookies.get('token')}`
            }
        });
        console.log(res);
        this.playlist.public = true;
      }
  }
})