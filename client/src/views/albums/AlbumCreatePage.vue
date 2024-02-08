<template>

  <h1 class="flex items-center justify-center text-2xl my-8">{{ $t('create-album.create-album') }}</h1>

  <form @submit.prevent="songSubmit">
    <div>
      <label>{{ $t('create-album.title') }}</label>
      <input type="text" class="input" v-model="name" pattern="^[a-zA-Zа-яА-Я0-9_- ]{2,15}$" autofocus required title="Please enter from 2 to 15 characters. Будь ласка, введіть від 2 до 15 символів."/>
      <br>
      <label>{{ $t('create-album.artist') }}</label>
      <input type="text" class="input" v-model="author" pattern="^[a-zA-Zа-яА-Я0-9_- ]{2,15}$" autofocus required title="Please enter from 2 to 15 characters. Будь ласка, введіть від 2 до 15 символів.">
    </div>
    <div>
      <label >{{ $t('create-album.album-picture') }}</label>
      <br>
      <input type="file" class="inputfile" @change="handleChangeIMG" /><span class="ml-1" v-if="picture">{{picture.name}}</span>
      <br><span style="color: rgb(239 68 68);">{{pictureErr}}</span>
    </div>

    <button class="my-4" id="submit" type="submit" :disabled="isPending">{{ $t('create-album.submit') }}</button>

  </form>
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
  name: "addAlbumPage",
  setup(){
    const router = useRouter()
    const isPending = ref(false);

    async function songSubmit(){
      isPending.value = true;
      if (name.value && author.value && picture.value) {
        try {
          var formData = new FormData();

          formData.append("name", name.value);
          formData.append("author", author.value);

          formData.append("picture", picture.value);


          await axios.post('/album', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${VueCookies.get('token')}`
            }
          }).then(console.log).catch(console.log);
          await router.push('/albums')
          isPending.value = false
        }catch (error) {
          console.error(error.response.data);
          isPending.value = false
        }
      } else {
        console.log('Заповніть форму повністю');
        pictureErr.value = 'fill in all the fields. заповніть всі поля';
        isPending.value = false
      }

    }


    //SONG
    //1st step
    const name = ref('')
    const author = ref('')
    //2nd step
    const picture = ref(null)
    const pictureErr = ref('')

    //File check
    const IMGtypes = ['image/png', 'image/jpeg', 'image/jpg']

    const handleChangeIMG = (e) => {
      const selected = e.target.files[0]
      console.log(selected)
      if(selected && IMGtypes.includes(selected.type)){
        if(selected.size > 10000000){
          picture.value = null
          pictureErr.value = 'Будь ласка виберіть файл менше 10мб'
        } else {
          pictureErr.value = ''
          picture.value=selected
        }
      } else {
        picture.value=null
        pictureErr.value = 'Please select a png or jpeg file'
      }
    }


    return {
      name,
      author,
      picture,
      pictureErr,
      handleChangeIMG,
      songSubmit,
      isPending
    }
  },
}
</script>

<style scoped lang="scss">
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
</style>