<template>
    <form @submit.prevent="register" >
      <h1 class="text-2xl my-8">{{ $t('register-form.register') }}</h1>
      <label >{{ $t('register-form.username') }}</label>
      <input type="text" v-model="form.username" class="input" pattern="^[a-zA-Z0-9_-]{3,15}$" autofocus required title="Please enter from 3 to 15 characters. Будь ласка, введіть від 3 до 15 символів." />
      <label >{{ $t('register-form.email') }}</label>
      <input type="email" v-model="form.email" class="input" />
      <label >{{ $t('register-form.password') }}</label>
      <input type="password" v-model="form.password" pattern="^.{6,32}$" autofocus required title="Please enter from 6 characters. Будь ласка, введіть від 6 символів."/>

      {{ error }}
      <button>{{ $t('register-form.submit') }}</button>
    </form>
</template>

<script>
import {reactive, ref} from "vue";
import axios from "axios";
import router from "@/router";
import VueCookies from "vue-cookies";


export default {
  name: "Register",
  setup() {
    const isPending = ref(false);
    const form = reactive({
      email: '',
      username: '',
      password: ''
    })

    const error = ref('');

    const register = async () => {
      isPending.value = true;
      if (form.email && form.username && form.password) {
        try {
          const res = await axios.post('/auth/reg', form);
          // catch axios error

          console.log(res);
          isPending.value = false;
          VueCookies.set('token' , res.data.token);
          await router.push({path: '/', replace: true});
          await router.go(0);
        } catch (e) {
          isPending.value = false;
          console.log(e);
          error.value = e.response.data.message + ' ' + e.response.data[0];

        }
      } else {
        isPending.value = false;
        error.value = 'Fill all fields. Заповніть всі поля';
      }
    }

    return {
      form,
      register,
      error
    }
  },
}
</script>

<style scoped>
button:disabled,
button[disabled]{
   border: 1px solid #999999;
   background-color: #cccccc;
   color: #666666;
 }

</style>
