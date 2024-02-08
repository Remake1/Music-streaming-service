<script setup>
import {usePlaylistCreateStore} from "@/stores/PlaylistCreateStore";

const store = usePlaylistCreateStore();

const IMGtypes = ['image/png', 'image/jpeg', 'image/jpg']

const handleChangeIMG = (e) => {
  const selected = e.target.files[0]
  console.log(selected)
  if(selected && IMGtypes.includes(selected.type)){
    if(selected.size > 10000000){
      store.picture = null
      store.pictureErr = 'Будь ласка виберіть файл менше 10мб'
    } else {
      store.picture = selected
      store.pictureErr = ''
    }
  } else {
    store.picture = null
    store.pictureErr = 'Please select a png or jpeg file'
  }
}

</script>

<template>
  <h1 class="flex items-center justify-center text-2xl my-8">{{ $t('create-playlist.create-playlist') }}</h1>

  <form @submit.prevent="store.submitPlaylist(store.picture)">
    <div>
      <label>{{ $t('create-playlist.name') }}</label>
      <input type="text" v-model="store.name" pattern="^[a-zA-Zа-яА-Я0-9_- ]{2,15}$" autofocus required title="Please enter from 2 to 15 characters. Будь ласка, введіть від 2 до 15 символів.">
    </div>
    <div>
      <label>{{ $t('create-playlist.picture') }}</label>
      <input type="file" class="inputfile" @change="handleChangeIMG"><span class="ml-1" v-if="store.picture">{{store.picture.name}}</span>
    </div>
    <br><span style="color: rgb(239 68 68);">{{store.pictureErr}}</span>

    <button class="my-4" id="submit" type="submit" :disabled="store.isPending">{{ $t('create-playlist.submit') }}</button>

  </form>
</template>

<style lang="scss">
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