import {defineStore} from "pinia";
import axios from "axios";
import VueCookies from "vue-cookies";

export const useAuthStore = defineStore( 'auth', {
  state: () => ({
    user: {},
    token: '',
    isAuthenticated: false,
  }),
    actions: {
        async login(email, password) {
            const req = await axios.post('/auth/login', {
                email,
                password
            });
            this.token = req.data.token;
            this.isAuthenticated = true;
            VueCookies.set('token' , req.data.token);
        }
    }
})