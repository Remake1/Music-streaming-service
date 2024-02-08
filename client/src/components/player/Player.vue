<template>
  <div id="player_head">
    <div class="player">
      <div class="player-controls">
        <div id="play">
          <a v-on:click.prevent="playing = !playing" :title="(playing) ? 'Pause' : 'Play'" href="#">
            <svg v-if="!playing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="currentColor" d="m424.4 214.7-352-208.1c-28.6-16.9-72.4-.5-72.4 41.3v416.1c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"/>
            </svg>
            <svg v-else viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m216 48v160a16.01833 16.01833 0 0 1 -16 16h-36a16.01833 16.01833 0 0 1 -16-16v-160a16.01833 16.01833 0 0 1 16-16h36a16.01833 16.01833 0 0 1 16 16zm-124-16h-36a16.01833 16.01833 0 0 0 -16 16v160a16.01833 16.01833 0 0 0 16 16h36a16.01833 16.01833 0 0 0 16-16v-160a16.01833 16.01833 0 0 0 -16-16z"/></svg>
          </a>
        </div>
        <div id="seek">
          <div class="player-timeline">
            <div :style="progressStyle" class="player-progress"></div>
            <div v-on:click="seek" class="player-seeker" title="Seek"></div>
          </div>
          <div class="player-time">
            <div class="player-time-current">{{  secondsToMinutesAndSeconds(this.currentSeconds) }}</div>
            <div class="player-time-total">{{ secondsToMinutesAndSeconds(this.durationSeconds) }}</div>
          </div>
        </div>
        <div id="download" v-show="!showVolume">
          <a v-on:click.prevent="download" href="#" title="Download">
            <svg height="38" viewBox="0 0 24 24" width="38" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m21 16c.5128358 0 .9355072.3860402.9932723.8833789l.0067277.1166211v2c0 1.5976809-1.24892 2.9036609-2.8237272 2.9949073l-.1762728.0050927h-14c-1.59768088 0-2.90366088-1.24892-2.99490731-2.8237272l-.00509269-.1762728v-2c0-.5522847.44771525-1 1-1 .51283584 0 .93550716.3860402.99327227.8833789l.00672773.1166211v2c0 .5128358.38604019.9355072.88337887.9932723l.11662113.0067277h14c.5128358 0 .9355072-.3860402.9932723-.8833789l.0067277-.1166211v-2c0-.5522847.4477153-1 1-1zm-9-14c.5522847 0 1 .44771525 1 1v9.585l1.2928932-1.2921068c.360484-.3604839.927715-.3882135 1.3200062-.0831886l.0942074.0831886c.3604839.360484.3882135.927715.0831886 1.3200062l-.0831886.0942074-3 3-.0439598.0413974-.0678404.0551612-.1112445.0716634-.1127261.0534457-.105343.0353804-.1485188.0290109-.1174742.0068342-.0752385-.0027879-.1254873-.0174522-.1114167-.029498-.111079-.0439353-.0974873-.0523221-.0960413-.0667905c-.0317158-.0248828-.0618904-.0516409-.0903567-.0801072l-2.99999998-3c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136.36048396-.3604839.92771502-.3882135 1.32000622-.0831886l.09420734.0831886 1.29289322 1.2921068v-9.585c0-.55228475.4477153-1 1-1z" fill-rule="evenodd"/></svg>
          </a>
        </div>
        <div id="loop" v-show="!showVolume">
          <a v-on:click.prevent="looping = !looping" href="#" title="Loop">
            <svg v-if="!looping" height="38" viewBox="0 0 24 24" width="38" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m17.0020048 13c.5522847 0 1 .4477153 1 1 0 .5128358-.3860402.9355072-.8833789.9932723l-.1166211.0067277h-11.58500005l3.29210679 3.2928932c.36048396.360484.38821349.927715.0831886 1.3200062l-.0831886.0942074c-.36048397.3604839-.92771502.3882135-1.32000623.0831886l-.09420734-.0831886-5-5c-.60257508-.6025751-.2205609-1.6142876.59347584-1.7011235l.11363094-.0059833zm-.3891054-8.79029539.0942074.08318861 5 5c.6025751.60257508.2205609 1.61428758-.5934759 1.70112348l-.1136309.0059833h-14c-.55228475 0-1-.4477153-1-1 0-.51283584.38604019-.93550716.88337887-.99327227l.11662113-.00672773h11.585l-3.2921068-3.29289322c-.3604839-.36048396-.3882135-.92771502-.0831886-1.32000622l.0831886-.09420734c.360484-.36048396.927715-.3882135 1.3200062-.08318861z"/></svg>
            <svg v-else height="38" viewBox="0 0 24 24" width="38" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m4.98313549 11.0001422c.5127629-.0086487.94188449.3702084 1.00802876.8665022l.00869353.1164911.00363106.22375c.10896147 3.2252893 2.75974653 5.7931116 5.99650826 5.7931116.1869641 0 .3726754-.0085218.5567494-.0254206l-.2638533-.2674697c-.3905243-.3905243-.3905243-1.0236893 0-1.4142136s1.0236893-.3905243 1.4142136 0l2 2c.3905243.3905243.3905243 1.0236893 0 1.4142136l-2 2c-.3905243.3905243-1.0236893.3905243-1.4142136 0s-.3905243-1.0236893 0-1.4142136l.3182573-.315938c-.202546.0153264-.4063709.0230419-.6111534.0230419-4.2312966 0-7.71113558-3.2905597-7.98333285-7.4894768l-.01246302-.253006-.00405901-.2406498c-.00931402-.5522062.43078706-1.0074083.98299327-1.0167223zm6.72397131-8.70724898c.3604839.36048396.3882135.92771502.0831886 1.32000622l-.0831886.09420734-.3179439.31591182c.2024422-.01531093.4061615-.0230186.6108371-.0230186 4.418278 0 8 3.581722 8 8 0 .5522847-.4477153 1-1 1s-1-.4477153-1-1c0-3.3137085-2.6862915-6-6-6-.1870661 0-.3728784.00853145-.5570517.02544919l.2641585.26744403c.3905243.39052429.3905243 1.02368927 0 1.41421356-.360484.36048396-.927715.3882135-1.3200062.08318861l-.0942074-.08318861-1.99999998-2c-.36048396-.36048396-.3882135-.92771502-.08318861-1.32000622l.08318861-.09420734 1.99999998-2c.3905243-.39052429 1.0236893-.39052429 1.4142136 0z" fill-rule="evenodd"/></svg>
          </a>
        </div>
        <div id="mute">
          <a v-on:click.prevent="mute" href="#" title="Mute">
              <svg v-if="!muted" height="38" viewBox="0 0 24 24" width="38" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m12 5v14c0 .8909049-1.0771419 1.3370716-1.7071068.7071068l-3.70710676-3.7071068h-3.58578644c-.55228475 0-1-.4477153-1-1v-6c0-.55228475.44771525-1 1-1h3.58578644l3.70710676-3.70710678c.6299649-.62996486 1.7071068-.18379807 1.7071068.70710678zm4.1198386-.47467459c.2621556-.4860997.8687363-.66764232 1.354836-.40548678 2.7573677 1.48705959 4.5253254 4.519176 4.5253254 7.88016137 0 3.3609854-1.7679577 6.3931018-4.5253254 7.8801614-.4860997.2621555-1.0926804.0806129-1.354836-.4054868-.2621555-.4860997-.0806129-1.0926804.4054868-1.354836 2.1031619-1.1342437 3.4746746-3.4864415 3.4746746-6.1198386 0-2.63339714-1.3715127-4.98559489-3.4746746-6.11983863-.4860997-.26215554-.6676423-.86873626-.4054868-1.35483596zm-6.1198386 2.88888815-2.29289322 2.29289322c-.18753638.18753638-.44189029.29289322-.70710678.29289322h-3v4h3c.26521649 0 .5195704.1053568.70710678.2928932l2.29289322 2.2928932zm4.0922902 1.16618795c.2317378-.50131429.825994-.71984917 1.3273083-.48811132 1.559388.72084364 2.5804015 2.22176771 2.5804015 3.90770981s-1.0210135 3.1868662-2.5804015 3.9077098c-.5013143.2317379-1.0955705.013203-1.3273083-.4881113-.2317379-.5013143-.013203-1.0955705.4881113-1.3273083.8708769-.4025721 1.4195985-1.2092113 1.4195985-2.0922902s-.5487216-1.6897181-1.4195985-2.09229019c-.5013143-.23173785-.7198492-.82599402-.4881113-1.3273083z" fill-rule="evenodd"/></svg>
              <svg v-else height="38" viewBox="0 0 24 24" width="38" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m12 5v14c0 .8909049-1.0771419 1.3370716-1.7071068.7071068l-3.70710676-3.7071068h-3.58578644c-.55228475 0-1-.4477153-1-1v-6c0-.55228475.44771525-1 1-1h3.58578644l3.70710676-3.70710678c.6299649-.62996486 1.7071068-.18379807 1.7071068.70710678zm-2 2.41421356-2.29289322 2.29289322c-.18753638.18753638-.44189029.29289322-.70710678.29289322h-3v4h3c.26521649 0 .5195704.1053568.70710678.2928932l2.29289322 2.2928932zm5.7071068.87867966 2.2928932 2.29210678 2.2928932-2.29210678c.360484-.36048396.927715-.3882135 1.3200062-.08318861l.0942074.08318861c.3604839.36048396.3882135.92771502.0831886 1.32000622l-.0831886.09420734-2.2921068 2.29289322 2.2921068 2.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136s-1.0236893.3905243-1.4142136 0l-2.2928932-2.2921068-2.2928932 2.2921068c-.360484.3604839-.927715.3882135-1.3200062.0831886l-.0942074-.0831886c-.3604839-.360484-.3882135-.927715-.0831886-1.3200062l.0831886-.0942074 2.2921068-2.2928932-2.2921068-2.29289322c-.3905243-.39052429-.3905243-1.02368927 0-1.41421356s1.0236893-.39052429 1.4142136 0z" fill-rule="evenodd"/></svg>
          </a>
        </div>
        <div id="volume">
          <a v-on:click.prevent="" v-on:mouseenter="showVolume = true" v-on:mouseleave="showVolume = false" :title="volumeTitle" href="#">
            <svg height="38" viewBox="0 0 24 24" width="38" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m8 2c.55228475 0 1 .44771525 1 1v18c0 .5522847-.44771525 1-1 1s-1-.4477153-1-1v-18c0-.55228475.44771525-1 1-1zm12 2c.5522847 0 1 .44771525 1 1v14c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-14c0-.55228475.4477153-1 1-1zm-8 2c.5522847 0 1 .44771525 1 1v10c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-10c0-.55228475.4477153-1 1-1zm-8 3c.55228475 0 1 .44771525 1 1v4c0 .5522847-.44771525 1-1 1s-1-.4477153-1-1v-4c0-.55228475.44771525-1 1-1zm12 1c.5522847 0 1 .4477153 1 1v2c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-2c0-.5522847.4477153-1 1-1z" fill-rule="evenodd"/></svg>
            <input v-model.lazy.number="volume" v-show="showVolume" class="player-volume" type="range" min="0" max="100"/>
          </a>
        </div>
      </div>
      <audio :loop="looping" ref="audio" :src="file" v-on:timeupdate="update" v-on:loadeddata="load" v-on:pause="playing = false" v-on:play="playing = true" preload="auto" style="display: none;"></audio>
    </div>

  </div>
</template>

<script>
export default {
  name: "Player",
  props: {
    autoPlay: {
      type: Boolean,
      default: false
    },
    file: {
      type: String,
      default: null
    },
    loop: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    currentSeconds: 0,
    durationSeconds: 0,
    loaded: false,
    looping: false,
    playing: false,
    previousVolume: 35,
    showVolume: false,
    volume: 100
  }),
  computed: {
    muted() {
      return this.volume / 100 === 0;
    },
    percentComplete() {
      return parseInt(this.currentSeconds / this.durationSeconds * 100);
    },
    progressStyle() {
      return { width: `${this.percentComplete}%` };
    },
    volumeTitle() {
      return `Volume (${this.volume}%)`;
    }
  },
  watch: {
    playing(value) {
      if (value) { return this.$refs.audio.play(); }
      this.$refs.audio.pause();
    },
    volume(value) {
      this.$refs.audio.volume = this.volume / 100;
    }
  },
  methods: {
    download() {
      this.stop();
      window.open(this.file, 'download');
    },
    load() {
      if (this.$refs.audio.readyState >= 2) {
        this.loaded = true;
        this.durationSeconds = parseInt(this.$refs.audio.duration);

        return this.playing = this.autoPlay;
      }

      throw new Error('Err load sound file');
    },
    mute() {
      if (this.muted) {
        return this.volume = this.previousVolume;
      }

      this.previousVolume = this.volume;
      this.volume = 0;
    },
    seek(e) {
      if (!this.loaded) return;

      const bounds = e.target.getBoundingClientRect();
      const seekPos = (e.clientX - bounds.left) / bounds.width;

      this.$refs.audio.currentTime = parseInt(this.$refs.audio.duration * seekPos);
    },
    stop() {
      this.playing = false;
      this.$refs.audio.currentTime = 0;
    },
    update(e) {
      this.currentSeconds = parseInt(this.$refs.audio.currentTime);
    },
    secondsToMinutesAndSeconds(seconds){
      const minutes = Math.floor(seconds / 60);
      const secondsLeft = seconds % 60;
      return `${minutes}:${secondsLeft}`;
    }
  }
}
</script>

<style scoped lang="scss">

#player_head{
  position:fixed;
  bottom:0;
  width: 100%;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;

}

$player-bg: rgba(0, 0, 0, 0.89);
$player-border-color: rgba(0, 0, 0, 0);
$player-link-color: #F26C6C;
$player-progress-color: $player-link-color;
$player-text-color: $player-link-color;
$player-timeline-color: $player-border-color;

.player-wrapper {
  align-items: center;
  background-color: $player-bg;
  background-image: linear-gradient(90deg, #fff 0, darken(#fff, 12%));
  display: flex;
  height: 100vh;
  justify-content: center;
}

.player {
  background-color: $player-bg;
  border-radius: 5px;
  border: 1px solid $player-border-color;
  box-shadow: 0 5px 8px rgba(0,0,0,0.15);
  color: $player-text-color;
  display: inline-block;
  line-height: 1.5625;
  position: relative;
}

.player-controls {
  display: flex;
  flex-wrap: wrap;

> div {
  border-right: 1px solid $player-border-color;

&:last-child {
   border-right: none;
 }

a {
  color: $player-link-color;
  display: block;
  line-height: 0;
  padding: 1em;
  text-decoration: none;

svg {
  display: inline-block;
  width: 1.125rem;
}
}
}
}

.player-timeline {
  background-color: $player-timeline-color;
  height: 50%;
  min-width: 200px;
  position: relative;

.player-progress,
.player-seeker {
  bottom: 0;
  height: 30%;
  left: 0;
  position: absolute;
  //top: 0;
}

.player-progress {
  background-color: $player-progress-color;
  z-index: 1;
}

.player-seeker {
  cursor: pointer;
  width: 100%;
  z-index: 2;
}
}

.player-time {
  display: flex;
  justify-content: space-between;

.player-time-current {
  font-weight: 700;
  padding-left: 5px;
}

.player-time-total {
  opacity: 0.5;
  padding-right: 5px;
}
}

.player-volume {
  display: inline-block;
  height: 1.1rem;
  margin: 0 0 0 2px;
  width: 6rem;
}
</style>