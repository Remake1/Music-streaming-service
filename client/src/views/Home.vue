<template>
  <div class="home">
<!--    <p v-if="isAuthenticated">{{u_email}}</p>-->
<!--    <p v-if="isAuthenticated">{{u_userId}}</p>-->
<!--    <p v-else-if="!isAuthenticated">Not authed</p>-->
    <div>
    <div class="flex flex-wrap">
      <div class="m-4 p-2 hover:bg-song-gray-light" @click="$router.push('/songs/create')">
        <img :src="require(`@/assets/media/svg/addSong.svg`)" width="200"/>
        <h3 class="text-2xl ml-4">{{ $t('add-song') }}</h3>
      </div>
      <div class="m-4 p-2 hover:bg-song-gray-light" @click="$router.push('/songs/search')">
        <img :src="require(`@/assets/media/svg/searchSong.svg`)" width="200"/>
        <h3 class="text-2xl ml-4">{{ $t('search-song') }}</h3>
      </div>
      <div class="m-4 p-2 hover:bg-song-gray-light" @click="$router.push('/songs')">
        <img :src="require(`@/assets/media/svg/allSong.svg`)" width="200"/>
        <h3 class="text-2xl ml-4">{{ $t('all-songs') }}</h3>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="m-4 p-2 hover:bg-song-gray-light" @click="$router.push('/albums/create')">
        <img :src="require(`@/assets/media/svg/addAlbum.svg`)" width="200"/>
        <h3 class="text-2xl ml-4">{{ $t('add-album') }}</h3>
      </div>
      <div class="m-4 p-2 hover:bg-song-gray-light" @click="$router.push('/albums/search')">
        <img :src="require(`@/assets/media/svg/searchAlbum.svg`)" width="200"/>
        <h3 class="text-2xl ml-4">{{ $t('search-album') }}</h3>
      </div>
      <div class="m-4 p-2 hover:bg-song-gray-light" @click="$router.push('/albums')">
        <img :src="require(`@/assets/media/svg/allAlbum.svg`)" width="200"/>
        <h3 class="text-2xl ml-4">{{ $t('all-albums') }}</h3>
      </div>
    </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home{
  display: grid;
  place-items: center;
}
</style>
