<template>
  <div >
    <form @submit.prevent="login" >
      <h1 class="text-2xl my-8">{{ $t('login-form.login') }}</h1>
      <div >
        <label >{{ $t('login-form.email') }}</label>
        <input type="text" v-model="email" class="input" />
      </div>
      <div >
        <label >{{ $t('login-form.password') }}</label>
        <input type="password" v-model="password" />
      </div>
      <h5 v-if="error" class="err">{{error}}</h5>
      <div class="field">
        <button :disabled="isPending">{{ $t('login-form.submit') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import router from "@/router";
import {useAuthStore} from "@/stores/AuthStore";
import {useI18n} from "vue-i18n";
import {getCookie} from "@/cookies/cookies";

export default {
  name: "Login",
  setup() {
    // const token = useCookies('token');
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const isPending = ref(false);

    const authStore = useAuthStore();
    const { _, locale } = useI18n({ useScope: 'global' })

    const login = async () => {
      isPending.value = true;
      try{
        await authStore.login(email.value, password.value);



        await router.push({path: '/', replace: true});
        await router.go(0);

      } catch(e) {
        console.log(e);
        isPending.value = false;
        error.value = e;
        if(e.response.status === 401){
          error.value = 'Invalid credentials. Помилкові дані';
        }

      }

    }

    return {
      email,
      password,
      login,
      error,
      isPending
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