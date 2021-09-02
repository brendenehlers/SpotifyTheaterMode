<script lang="ts">
	import { onMount } from 'svelte';
	import memoize from 'memoize-one';
	import FastAverageColor from 'fast-average-color'

	import { loggedIn, averageColor, isPlaying } from '../../store'
	
	import Upcoming from '../Upcoming/Upcoming.svelte'
	import Playback from '../Playback/Playback.svelte'
	import Visual from '../Visual/Visual.svelte'

	// export let spotify
	export let onPause: Function
	export let onGetCurrentPlayback: Function

	const fsc = new FastAverageColor()

	let currAlbumCover: string
	let currSongTitle: string
	let currArtist: string[]

	let currSongTime: number
	let currSongDuration: number

	onMount(() => {
		loadCurrentSongIntoApp()
		// setInterval(() => getCurrentPlaybackStatus(), 1000)
		// debugger
	})

	const loadDataIntoVairables = (data) => {
		currAlbumCover = data.item.album.images[0].url
		currSongTitle = data.item.name
		currArtist = data.item.artists?.map(a => a.name) || []

		currSongTime = data.progress_ms
		currSongDuration = data.item.duration_ms
		return {albumCover: currAlbumCover, title: currSongTitle, artist: currArtist, elapsedTime: currSongTime, duration: currSongDuration}
	}

	const loadCurrentSongIntoApp = async () => {
		const data = await onGetCurrentPlayback()
		console.log(data)
		if($loggedIn) {
			const { albumCover } = loadDataIntoVairables(data)
			getAverageColor(albumCover)

			// update the elapsed time every msInterval ms
			const msInterval = 10
			const songCounter = setInterval(() => {
				if($isPlaying) currSongTime += msInterval

				if(currSongTime >= currSongDuration) {
					loadCurrentSongIntoApp()
					clearInterval(songCounter)
				}
			}, msInterval)
		}
	}

	const getAverageColor = memoize((image: HTMLImageElement | string, options?: {width: number, height: number}) => {
		let img: HTMLImageElement
		const width = options?.width || 640
		const height = options?.height || 640

		if(typeof image === 'string') {
			img = new Image(width, height)
			img.src=`${image}`
			img.crossOrigin = "Anonymous";
		} else {
			img = image
		}
		fsc.getColorAsync(img, {left: 0, top: 0, width, height})
		.then(data => {
			$averageColor = data 
		})
		return $averageColor
	})
</script>

<div class='main' style={`background-color: ${$averageColor?.hex}`}>
	<div class='image-container'>
		<div 
			class='container background' 
			id='james'
		>
			<div class='debug visual grid-member'>
				<Visual 
					imgUrl={currAlbumCover}
					songTitle={currSongTitle}
					artists={currArtist} 
				/>
			</div>
			<!-- TODO make playlist logic for handling psuedo-queue -->
			<!-- <div class='debug upcoming grid-member'>
				<Upcoming upNext={$upNext} ></Upcoming>
			</div> -->
			<div class='debug playback grid-member'>
				<Playback 
					elapsed={currSongTime}
					duration={currSongDuration}
					onPause={onPause}
				/>
			</div>
		</div>
	</div>
	<!-- <button on:click={getUserPlayback} style='position: absolute; left: 0; top: 0;'>Get Me</button> -->
</div>

<style src='./App.css'>
.image-container {
	width: 100vw;
	height: 100vh;
	/* background: url('../images/jamesmaynoods.jpg'); */
}
.container {
	width: 100%;
	height: 100%;

	display: grid;
	grid-template-columns: [first] 70% [visual] 30% [upcoming];
	grid-template-rows: [first] 80% [visual] 20% [playback];

	grid-template-areas: 
		"visual visual"
		"playback playback";

	/* Make the background slightly darker so the text is still readable */
	/* background-color: #55555588 */
	background-color: #38374799

}
.grid-member {
	margin: 1em;
}
.visual {
	grid-area: visual;
}
.upcoming {
	height: initial;
	grid-area: upcoming;
}
.playback {
	grid-area: playback;
}

</style>