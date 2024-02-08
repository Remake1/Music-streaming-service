import {defineStore} from "pinia";
import axios from "axios";
import VueCookies from "vue-cookies";

export const useUserPlaylistsStore = defineStore('UserPlaylistsStore', {
    state: () => ({
        playlists: {},
        isReady: true
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
        }
    }
})