<template>
  <div>
    <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-6xl border-4 border-gray-50">
        <!--content-->
        <div class="modal border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-zinc-600 outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              {{ $t('album.put') }}
            </h3>
          </div>
          <!--body-->
          <div class="modal-body">
            <div v-for="song in songs" :key="song">
              <Song
                  :name="song.name"
                  :artist="song.artist"
                  :picture="song.picture"
                  :audio="song.audio"
                  :id="song._id"
                  :text="song.text"
                  :link="false"
                  @click="submit(song._id)"
              />
            </div>
            <div v-if="songs.length === 0">{{ $t('album.err') }}</div>
          </div>

          <!--footer-->
          <div class="p-6 border-t border-solid border-blueGray-200 rounded-b">
            <div class="flex items-center">
              {{error}}
            </div>
            <div class="flex items-center justify-end">
              <button class="text-red-500 background-transparent font-bold uppercase px-6 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="showModal=false">
                {{ $t('close') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
import Song from "@/components/song/Song";
import {ref} from "vue";
import axios from "axios";
import VueCookies from "vue-cookies";
import router from "@/router";

export default {
  name: "large-modal",
  components: {Song},
  props: {
    showModal: {
      defaultValue: false,
      type: Boolean
    },
    songs: {
      type: Array
    },
    albumId: {
      type: String
    }
  },
  setup(props) {

    const error = ref('')
    console.log(props.albumId)
    console.log(VueCookies.get('token'))

    const submit = async (id) => {
      try{
        const req = await axios.put(`/album/${props.albumId}/${id}`, {}, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${VueCookies.get('token')}`
          }
        })

        await router.go(0);
      } catch (e) {
        error.value = 'Authorization error'
      }


    }

    return {submit, error}
  }
}
</script>

<style scoped>
.modal-body{
  max-height: calc(100vh - 210px);
  overflow-y: auto;
}
.modal{
  background-color: #282828;
}
</style>