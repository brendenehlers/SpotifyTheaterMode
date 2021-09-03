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
  display: grid;
  height: 100%;
  width: 100%;

  
  justify-items: center;
  align-items: center;
}
.song-title {
  grid-area: title;
  align-self: flex-end;
  margin: 0;
  font-size: xxx-large;
}
.album-cover {
  grid-area: cover;
  box-shadow: 3px 4px 5px 0px #000000;
  border-radius: 10px;
  justify-self: center;
  align-self: center;
  margin: 10px;
}
.artist {
  display: flex;
  grid-area: artist;

  margin: 0;
}
@media only screen and (min-width: 1080px) {
  .container {

    grid-template-columns: [first] 5% [second] 55% [third] 35% [fourth] 5% [last];
    grid-template-rows: [first] 5% [second] 45% [third] 45% [fourth] 5% [last];
    grid-gap: 10px;

    grid-template-areas: 
      ". . . ."
      ". cover title ."
      ". cover artist ."
      ". . . .";

  }
  .album-cover {
    max-width: 640px;
    min-width: 320px;
    width: 100%;

    /* max-height: 640px;
    min-height: 320px;
    height: 100%; */
  }
  .album-cover::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
  .song-title {
    justify-self: left;
  }
  .artist {
    justify-self: left;
    font-size: xx-large;
  }
}

@media screen and (max-width: 1080px) {
  .container {
    grid-template-columns: [first] 5% [second] 90% [third] 5% [last];
    grid-template-rows: [first] 5% [second] 70% [third] 10% [fourth] 10% [fifth] 5% [last];

    grid-template-areas: 
      ". . ."
      ". cover ."
      ". title ."
      ". artist ."
      ". . .";
  }
  .album-cover {
    --width: 100%;
    max-width: 460px;
    width: var(--width);
    max-height: 460px;
    margin: 10px;
  }
  .album-cover::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
  .song-title {
    align-self: center;
    justify-self: left;
    margin: 10px;
    font-size: xx-large;
  }
  .artist {
    margin-left: 10px;
    align-self: center;
    justify-self: left;
    font-size: medium;
  }
}
</style>