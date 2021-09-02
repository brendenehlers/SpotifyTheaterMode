<script lang='ts'>

  export let imgUrl: string
  export let songTitle: string
  export let artists: string[] = []

</script>

<div class='container'>
  <img class='album-cover' src={imgUrl} alt='Large album cover' />
  <p class='song-title text'>{songTitle}</p> <!-- TODO make this scrollable -->
  <div class='artist text'>
    {#each artists as artist, i (artist)}
      {artist + (i < artists.length-1 ? ', ' : '')} <!-- TODO see above -->
    {/each}
  </div>
</div>

<style src='./style.css'>
.container {
  height: 100%;

  display: grid;

  grid-template-columns: [first] 5% [second] 55% [third] 35% [fourth] 5% [last];
  grid-template-rows: [first] 5% [second] 45% [third] 45% [fourth] 5% [last];

  grid-template-areas: 
    ". . . ."
    ". cover title ."
    ". cover artist ."
    ". . . .";

  justify-items: center;
  align-items: center;
}
.album-cover {
  grid-area: cover;
  width: 640px;
  height: 640px;
  max-width: 640px;
  max-height: 640px;
  box-shadow: 3px 4px 5px 0px #000000;
  border-radius: 10px;
}
.song-title {
  grid-area: title;
  align-self: flex-end;
  justify-self: left;
  font-size: xxx-large;
  margin: 0;
}
.artist {
  grid-area: artist;
  align-self: flex-start;
  justify-self: left;

  display: flex;
  font-size: xx-large;
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>