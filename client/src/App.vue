<template>
  <div id="nav">
    <Navbar />
  </div>
  <router-view/>
  <LangIcon />
</template>

<style lang="scss">

</style>
<script>
import Navbar from "@/components/ui/Navbar";
import LangIcon from "@/components/ui/LangIcon";
import i18n from "@/i18n";
import {getCookie} from "@/cookies/cookies";
import {onMounted} from "vue";
import VueCookies from "vue-cookies";

export default {
  components: {LangIcon, Navbar},
  setup() {


    onMounted(() => {
      if (getCookie("locale")) {
        i18n.global.locale.value = VueCookies.get("locale");
      }
    })


  }
}
</script>