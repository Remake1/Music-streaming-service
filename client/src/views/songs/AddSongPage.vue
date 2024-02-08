<template>

  <h1 class="flex items-center justify-center text-2xl my-8">{{ $t('create-song.create-song') }}</h1>

  <form @submit.prevent="songSubmit">
    <div v-if="activePage===1">
      <img class="progress" :src="require(`@/assets/media/img/step_bar_1.png`)"/>


      <label>{{ $t('create-song.title') }}</label>
      <input type="text" class="input" v-model="name" pattern="^[a-zA-Zа-яА-Я0-9_- ]{2,15}$" autofocus required title="Please enter from 2 to 15 characters. Будь ласка, введіть від 2 до 15 символів."/>
      <br>
      <label>{{ $t('create-song.artist') }}</label>
      <input type="text" class="input" v-model="artist" pattern="^[a-zA-Zа-яА-Я0-9_- ]{2,15}$" autofocus required title="Please enter from 2 to 15 characters. Будь ласка, введіть від 2 до 15 символів.">
    </div>
    <div v-else-if="activePage===2">
      <img class="progress" :src="require(`@/assets/media/img/step_bar_2.png`)"/>


      <label >{{ $t('create-song.text') }}</label>
      <br>
      <textarea v-model="text"></textarea>
    </div>
    <div v-else-if="activePage===3">
      <img class="progress" :src="require(`@/assets/media/img/step_bar_3.png`)"/>


<!--      <label > song audio</label>-->
<!--      <input type="file"-->
<!--             name="file1"-->
<!--             id="file1"-->
<!--             class="inputfile"-->
<!--             @change="audioUpload"-->
<!--      />-->
<!--      <label for="file1">Choose a file</label>-->
<!--      <br>-->

      <div>
        <label >{{ $t('create-song.song-picture') }}</label>
        <br>
        <div class="flex flex-wrap content-center items-center">
          <input type="file" class="inputfile" @change="handleChangeIMG" /><p class="filename ml-1 text-lg" v-if="picture">{{picture.name}}</p>
        </div>
        <br><span style="color: rgb(239 68 68); white-space: pre-line;">{{pictureErr}}</span>
      </div>
      <div>
        <label> {{ $t('create-song.song-file') }}</label>
        <br>
        <div class="flex flex-wrap content-center items-center">
          <input type="file" class="inputfile" @change="handleChangeAUDIO" /><p class="filename ml-1" v-if="audio">{{audio.name}}</p>
        </div>
        <br><span style="color: rgb(239 68 68); white-space: pre-line;">{{audioErr}}</span>
      </div>
    </div>

    <p v-if="error" class="error" style="white-space: pre-line">{{error}}</p>


    <button v-if="activePage===3" class="my-4 text-lg" id="submit" type="submit" :disabled="isPending" >{{ $t('create-song.submit') }}</button>


  </form>
  <div class="navigation flex items-center justify-center my-8">
    <button v-if="activePage!==1" @click="previousPage" class="mx-4">{{ $t('create-song.previous') }}</button>
    <button v-if="activePage!==3" @click="nextPage" class="mx-4">{{ $t('create-song.next') }}</button>
  </div>

</template>

<script>
import {ref} from "vue";
import {onMounted} from "vue";
import {getCookie, parseJwt} from "@/cookies/cookies";
import axios from "axios";
import router from "@/router";
import VueCookies from "vue-cookies";
import {useRouter} from "vue-router";

export default {
  name: "addSongPage",
  setup(){
    const router = useRouter()
    const activePage = ref(1);
    const error = ref('');
    const isPending = ref(false);
    function nextPage() {
      if(activePage.value!==3) activePage.value++
    }
    function previousPage() {
      if(activePage.value!==1) activePage.value--
    }

    async function songSubmit(){
      isPending.value = true;
      if (name.value && artist.value && text.value && picture.value && audio.value) {
        try {
          var formData = new FormData();

          formData.append("name", name.value);
          formData.append("artist", artist.value);
          formData.append("text", text.value);

          formData.append("picture", picture.value);
          formData.append("audio", audio.value);


          await axios.post('/songs', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${VueCookies.get('token')}`
            }
          }).then(console.log).catch(console.log);


          await router.push('/songs')
          isPending.value = false;
        }catch (error) {
          isPending.value = false;
          console.error(error.response.data);
        }
      } else {
        error.value = 'Please fill all fields. \n Будь ласка заповніть \nвсі поля';
        isPending.value = false;
      }



    }


    //SONG
    //1st step
    const name = ref('')
    const artist = ref('')
    //2nd step
    const text = ref('')
    //3rd step
    const picture = ref(null)
    const pictureErr = ref('')

    const audio = ref(null)
    const audioErr = ref('')


    //File check
    const IMGtypes = ['image/png', 'image/jpeg', 'image/jpg']
    const AUDIOtypes = ['audio/mpeg', 'audio/ogg']

    const handleChangeIMG = (e) => {
      const selected = e.target.files[0]
      console.log(selected)
      if(selected && IMGtypes.includes(selected.type)){
        if(selected.size > 10000000){
          picture.value = null
          pictureErr.value = 'Будь ласка виберіть\n файл менше 10мб'
        } else {
          picture.value=selected
          pictureErr.value = null
        }
      } else {
        picture.value=null
        pictureErr.value = 'Please select a png or \njpeg file. Будь ласка виберіть\n png або jpeg файл'
      }
    }

    const handleChangeAUDIO = (e) => {
      const selected = e.target.files[0]
      console.log(selected)
      if(selected && AUDIOtypes.includes(selected.type)){
        if(selected.size > 10000000){
          picture.value = null
          pictureErr.value = 'Будь ласка виберіть файл менше 10мб'
        } else {
          audio.value=selected
          audioErr.value = null
        }
      } else {
        audio.value=null
        audioErr.value = 'Please select a mp3 or ogg \nfile. Будь ласка виберіть \nmp3 або ogg файл'
      }
    }



    return {
      activePage,
      nextPage,
      previousPage,
      name,
      artist,
      text,
      picture,
      pictureErr,
      handleChangeIMG,
      handleChangeAUDIO,
      audio,
      audioErr,
      songSubmit,
      error,
      isPending
    }
  },
//   data(){
//     return{
//       audio: null
//     }
//   },
//   methods: {
//     audioUpload(event) {
//       this.audio=event.target.files[0]
// }
//   }
}
</script>

<style scoped lang="scss">
input{
  width: 150px;
}
.progress{
  width: 240px;
  margin-bottom: 30px;
}
.previous{
  background-color: #8C8C8C;
}
button:focus {
  border: none;
  outline: none;
}
/*.inputfile {*/
/*  width: 0.1px;*/
/*  height: 0.1px;*/
/*  opacity: 0;*/
/*  overflow: hidden;*/
/*  position: absolute;*/
/*  z-index: -1;*/
/*}*/
.inputfile{
  width:100px;
}
input[type='file'] {
  color: transparent;
}
button{
  background-color: #F26C6C;
  padding: 5px;
}
#submit{
  background-color: #ff0000;
  &:disabled,
  &[disabled]{
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
}
.filename{
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>