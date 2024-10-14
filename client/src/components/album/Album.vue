<template>
  <router-link v-if="hasLink" :to="{ name: linkTo, params: { id: id }}">
    <div class="m-8 p-4 bg-song-gray rounded-lg hover:bg-song-gray-light single-card">
      <img class="object-cover h-56 w-56" :src="axios.defaults.baseURL+picture">
      <div class="flex">
        <div>
          <h4 class="mt-2 font-semibold text-xl">{{ name }}</h4>
        </div>
        <div v-if="isPrivate"><PlaylistLock /></div>
      </div>
      <p class="font-light">{{author}}</p>
      <p class="font-light text-sm">{{ songsC }} {{ songTool(songsC) }}</p>
  <!--    <p class="font-light text-gray-400 text-sm mt-1">Created by K1nzza</p>-->
    </div>
  </router-link>
  <div v-else>
    <div class="m-8 p-4 bg-song-gray rounded-lg hover:bg-song-gray-light single-card">
      <img class="object-cover h-56 w-56" :src="axios.defaults.baseURL+picture">
      <div class="flex">
        <div>
          <h4 class="mt-2 font-semibold text-xl">{{ name }}</h4>
        </div>
        <div v-if="isPrivate"><PlaylistLock /></div>
      </div>
      <p class="font-light">{{author}}</p>
      <p class="font-light text-sm">{{ songsC }} {{ songTool(songsC) }}</p>
      <!--    <p class="font-light text-gray-400 text-sm mt-1">Created by K1nzza</p>-->
    </div>
  </div>
</template>

<script>
import {songTool} from "@/stores/tools/songTool";
import PlaylistLock from "@/components/ui/PlaylistLock.vue";
import axios from "axios";


export default {
  name: "Album",
  components: {PlaylistLock},
  props: {
    name: String,
    author: {
      type: String,
      default: null
    },
    picture: String,
    id: String,
    songsC: Number,
    linkTo: {
      default: 'Album',
      type: String
    },
    isPrivate: {
      default: false,
      type: Boolean
    },
    hasLink: {
      default: true,
      type: Boolean
    }
  },
  setup(){
    return {songTool}
  }
}
</script>

<style scoped>

</style>