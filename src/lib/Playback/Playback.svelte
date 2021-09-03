<script lang='ts'>
import PlaybackBar from "./PlaybackBar/PlaybackBar.svelte";

export let elapsed: number
export let duration: number
export let onPause: Function

</script>

<div class='container'>
  <div class='playback-bar'>
    <PlaybackBar 
      elapsed={elapsed}
      duration={duration}
      onPause={onPause}
    />
  </div>
</div>

<style src='./style.css'>
.container {
  display: grid;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.playback-bar {
  border-radius: 20px;
  width: 90%;
  /* height: 50px; */
  /* border: 1px solid white; */
}
</style>