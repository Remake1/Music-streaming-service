import {defineStore} from "pinia";
import axios from "axios";
import VueCookies from "vue-cookies";
import router from "@/router";
import {store} from "core-js/internals/reflect-metadata";

export const usePlaylistCreateStore = defineStore("PlaylistCreate", {
    state: () => ({
        error: "",
        isPending: false,
        picture: null,
        pictureErr: "",
        name: ''
    }),
    actions: {
        async submitPlaylist(picture){
            if(this.name&&this.picture) {
                this.isPending = true
                try {
                    let formData = new FormData();

                    formData.append("name", this.name);
                    formData.append("picture", picture)

                    await axios.post('/playlists', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${VueCookies.get('token')}`
                        }
                    }).then(console.log).catch(console.log);

                    await router.push('/playlists');
                    this.isPending = false;
                } catch (err) {
                    this.isPending = false;
                    console.error(error.response.data);
                }
            } else this.pictureErr = "Заповніть усі поля. Fill in all fields."
        },
    }
})