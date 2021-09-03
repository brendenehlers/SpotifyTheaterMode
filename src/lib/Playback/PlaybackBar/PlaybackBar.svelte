<script lang='ts'>
  import { tweened } from 'svelte/motion'
  import Pause32 from 'carbon-icons-svelte/lib/Pause32'
  import Play32 from 'carbon-icons-svelte/lib/Play32'

  import { isPlaying } from '../../../store'
  
  export let elapsed: number
  export let duration: number
  export let onPause: Function

  // specifies how accurate the progress bar should be
  // higher = more accurate
  const granularFactor = 1000000000

  const progress = tweened(((granularFactor*elapsed/duration)|0)/granularFactor)

  const getTimeString = (ms: number) => {
    const seconds = (ms / 1000)|0 // get a whole number for seconds
    const secondsFactor = 60
    const minutesFactor = 60
    const hoursFactor = 60
    const minutes = (seconds - seconds%secondsFactor)/secondsFactor
    const hours = (minutes - minutes%minutesFactor)/minutesFactor

    const getFactoredTime = (time: number, factor: number) => {
      return (time%factor).toFixed(0)
    }

    const get2DigitFactoredTime = (time: number, factor: number) => {
      return (time%factor) <= 9 ? '0' + (time%factor).toFixed(0) : (time%factor).toFixed(0) 
    }

    let ret = ''
    if (hours > 0) {
      ret = `${getFactoredTime(hours, hoursFactor)}:${get2DigitFactoredTime(minutes, minutesFactor)}:${get2DigitFactoredTime(seconds, secondsFactor)}`
    } else {
      ret = `${getFactoredTime(minutes, minutesFactor)}:${get2DigitFactoredTime(seconds, secondsFactor)}`
    }
    return ret
  }

  const handlePause = (e) => {
    e.preventDefault()
    onPause()
  }

  // update progress whenever the elapsed value changes
  $: progress.set(((granularFactor*elapsed/duration)|0)/granularFactor)
  
</script>

<div class='container'>
  <progress class='bar' value={$progress} ></progress>
  <div class='flex-container'>
    <p class='text timing left'>{`${getTimeString(elapsed)}`}</p>
    <div class='pause-button text' on:click={handlePause}>
      {#if $isPlaying}<Pause32 />{:else}<Play32 />{/if}
      <!-- {#if $isPlaying}pause{:else}play{/if} -->
    </div>
    <p class='text timing right'>{`${getTimeString(duration)}`}</p>
  </div>
</div>
  
<style src='./style.css'>
.container {
  display: grid;
  justify-items: center;
  align-items: center;
  width: 100%;
}
.text {
  font-size: 1.5rem;
}
.bar[value] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 10px;

  width: 100%;
  height: 100%;
}
.bar[value]::-webkit-progress-bar {
  border-radius: 10px;
  /* box-shadow: 0 2px 5px rgba(0,0,0,0.25) inset; */
  background-color: rgba(0,0,0,0.1);
}
.bar[value]::-webkit-progress-value {
  background-color: #ffffff;
  border-radius: 10px;
}
.bar[value]::-moz-progress-bar {
  border-radius: 10px;
  background-color: #ffffff;
}
.bar {
  background-color: rgba(0,0,0,0.3);
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.25) inset;
}
.timing {
  font-weight: 400;
  width: auto;
}
.flex-container {
  display: grid;
  height: 100%; 
  width: 100%;
  align-items: center;
  justify-items: center;
  grid-gap: 5px;
}
.pause-button {
  display: flex;
  width: 100%;
  grid-area: pause;
  justify-content: center;
}
.left { 
  grid-area: left;
  justify-content: right;
  right: 0;
}
.right {
  grid-area: right;
  justify-items: left;
  left: 0;
}
.pause-button:hover {
  cursor: pointer;
}
@media screen and (min-width: 1080px) {
  .container {
    grid-template-rows: 10px 100%;
    height: auto;
  }
  .timing { 
    font-size: large;
  }
  .flex-container {
    grid-template-columns: 40% 5% 10% 5% 40%;
    grid-template-areas: '. left pause right .';
  }
}
@media screen and (max-width: 1080px) {
  .container {
    grid-template-rows: 10px 100%;
    height: auto;
  }
  .timing {
    font-size: medium;
  }
  .flex-container {
    grid-template-columns: 20% 20% 20% 20% 20%;
    grid-template-areas: '. left pause right .';
    width: inherit;
  }
}
</style>