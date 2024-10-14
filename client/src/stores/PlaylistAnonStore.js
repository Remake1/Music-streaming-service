import {defineStore} from "pinia";
import axios from "axios";
import VueCookies from "vue-cookies";

export const usePlaylistAnonStore = defineStore( 'playlistAnon', {
    state: () => ({
        playlist: {},
        activePlayer: false,
        playerAudio: null,
    }),
    actions: {
        async getPlaylist(id) {
            try {
                const req = await axios.get(`/playlists/anon/${id}`);
                this.playlist = req.data;
            } catch (e) {
                console.log(e);
            }
        },
        async playSong (audio) {
            this.activePlayer = true;
            this.playerAudio = axios.defaults.baseURL+audio;
            console.log("play song");
        },
    }
})