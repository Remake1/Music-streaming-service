<template>
  <button class="img bg-song-gray-light rounded-xl" @click="changeLang">
    <img src="../../assets/media/svg/language.svg" width="48">
  </button>
</template>

<script>
import i18n from "@/i18n";
import VueCookies from "vue-cookies";

export default {
  name: "LangIcon",
  setup(){
    const changeLang = () => {
      //change i18n lang
      if (i18n.global.locale.value === "en") {
        i18n.global.locale.value = "uk";
        VueCookies.set('locale' , 'uk');
      } else {
        i18n.global.locale.value = "en";
        VueCookies.set('locale' , 'en')
      }
    }

    return {
      changeLang
    }
  }
}
</script>

<style scoped>
.img{
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 1rem;
  cursor: pointer;
}
/*optimize fro mobile*/
@media screen and (max-width: 600px) {
  .img{
    margin-bottom: 5rem;
  }
}
</style>