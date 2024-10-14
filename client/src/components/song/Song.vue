<template>
  <div class="m-4 p-2 bg-song-gray rounded-lg hover:bg-song-gray-light">
    <div class="flex justify-between items-center">
      <div>
        <div class="flex justify-between items-center">
          <div><img :src="axios.defaults.baseURL + picture" alt="song image" width="80" class="rounded-md"></div>
          <div>
            <router-link v-if="link" :to="{ name: 'Song', params: { id: id }}" class="text-xl ml-2">{{name}}</router-link>
            <div v-else class="text-xl ml-2">{{name}}</div>
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="ml-2 sm:mr-52">
          <p>{{artist}}</p>
        </div>
        <div>
          <p class="mr-2">{{duration}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import PlaylistLock from "@/components/ui/PlaylistLock.vue";
import axios from "axios";


export default {
  name: "Song",
  components: {PlaylistLock},
  props: {
    name: {
      type: String,
      required: true
    },
    artist: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      required: true
    },
    audio : {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    link: {
      type: Boolean,
      default: true
    },
    isPrivate: {
      type: Boolean,
      default: false
    }
  },


  setup(props) {

    // duration
    const secondsToMinutesAndSeconds = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const secondsLeft = seconds % 60;
      return `${minutes}:${secondsLeft}`;
    }

    const duration = ref('0:00');
    let curAudio = new Audio();
    curAudio.src = axios.defaults.baseURL+props.audio;
    curAudio.onloadedmetadata = () => {
      duration.value = String(secondsToMinutesAndSeconds(Math.floor(curAudio.duration)));
    }
    // duration

    return {
      duration,
    }
  }
}
</script>

<style scoped>





</style>