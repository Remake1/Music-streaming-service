import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from "@/views/auth/Register";
import Login from "@/views/auth/Login";
import SongPage from "@/views/songs/AllSongsPage";
import {getCookie} from "@/cookies/cookies";
import OneSongPage from "@/views/songs/SongPage";
import addSongPage from "@/views/songs/AddSongPage";
import SearchSong from "@/views/songs/SongSearchPage";
import AllAlbums from "@/views/albums/AllAlbumsPage";
import AlbumPage from "@/views/albums/AlbumPage";
import searchAlbum from "@/views/albums/AlbumSearchPage";
import NotFound from "@/views/NotFound";
import AlbumCreatePage from "@/views/albums/AlbumCreatePage";
import PlaylistPage from "@/views/playlists/PlaylistView";
import PlaylistCreateView from "@/views/playlists/PlaylistCreateView";
import UserPlaylistsView from "@/views/playlists/UserPlaylistsView";
import PlaylistAnonView from "@/views/playlists/PlaylistAnonView";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/songs',
    name: 'Songs',
    component: SongPage,
  },
  {
    path: '/songs/:id',
    name: 'Song',
    component: OneSongPage,
  },
  {
    path: '/songs/create',
    name: 'CreateSong',
    component: addSongPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/songs/search',
    name: 'SearchSong',
    component: SearchSong
  },
  {
    path: '/albums',
    name: 'AllAlbums',
    component: AllAlbums
  },
  {
    path: '/albums/:id',
    name: 'Album',
    component: AlbumPage,
  },
  {
    path: '/albums/search',
    name: 'SearchAlbum',
    component: searchAlbum
  },
  {
    path: '/:pathMatch(.*)',
    component: NotFound
  },
  {
    path: '/albums/create',
    name: 'CreateAlbum',
    component: AlbumCreatePage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/playlists/:id',
    name: 'PlaylistPage',
    component: PlaylistPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/playlists/create',
    name: 'PlaylistCreatePage',
    component: PlaylistCreateView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/playlists',
    name: 'UserPlaylists',
    component: UserPlaylistsView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/playlists/v/:id',
    name: 'PlaylistAnon',
    component: PlaylistAnonView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  function isAuthenticated() {
    return !!getCookie("token");
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated()) {
      next()
      return
    }
    next('/login')
  }



  next()
})

export default router
