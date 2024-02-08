import {defineStore} from "pinia";
import axios from "axios";
import VueCookies from "vue-cookies";
import router from "@/router";

export const modalStore = defineStore( 'modalStore', {
    state: () => ({
        playlists: {},
        isReady: true,
        modalErr: "",
    }),
    actions: {
        async fetchPlaylists() {
            this.isReady = false
            const req = await axios.get('/playlists', {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${VueCookies.get('token')}`
                }
            });
            this.playlists = req.data;
            this.isReady = true
        },
        async addSongToPlaylist(playlistId, songId) {
                try {
                    const res = await axios.put(`/playlists/${playlistId}/${songId}`, {}, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${VueCookies.get('token')}`
                        }
                    });

                    // this.isModalShowed = false;
                    // router.go(0);

                } catch (e) {
                    console.log(e);
                    this.modalErr = "Error. Помилка"
                }
        }
    }
})