<template>
  <div class="add-comment mb-4">
    <button v-if="!showForm" @click="showForm=!showForm">{{ $t('add-new-comment') }}</button>
    <form v-else @submit.prevent="commentSubmit">
      <h4>{{ $t('add-new-comment') }}</h4>
      <input v-model="username" disabled>
      <textarea :placeholder="$t('comment')" required v-model="text"></textarea>
      <button>{{ $t('add') }}</button>
    </form>
  </div>
</template>

<script>
import {ref} from "vue";
import {parseJwt} from "@/cookies/cookies";
import VueCookies from 'vue-cookies';
import axios from "axios";
import router from "@/router";

export default {
  name: "addComment",
  props: {
    songId: String
  },
  setup(props) {
    const showForm = ref(false);

    const username = ref(parseJwt(VueCookies.get('token')).name);
    const text = ref('');



    async function commentSubmit(){

      const res = await axios.post('/songs/comment', {
        username: username.value,
        text: text.value,
        songId: props.songId
      })
      console.log(res)
      await router.go(0);

    }



    return {showForm, parseJwt, VueCookies, username, text, commentSubmit};

  }
}
</script>

<style scoped>
.add-song{
  text-align: center;
  margin-top: 40px;
}
form{
  max-width: 100%;
  text-align: left;
}
</style>