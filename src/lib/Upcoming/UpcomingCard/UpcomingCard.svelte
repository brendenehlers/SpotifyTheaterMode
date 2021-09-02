<script lang='ts'>
	import type { Song } from '../../../global'

	export let data: Song
</script>

	<div class='queue-card container' id={data.id}>
		<img class='album-cover' src={data.img} alt='James may eating noodles'>
		<div class='song-description'>
			<p class='artist-name text'>{data.name}</p>
			<p class='text'>by {data.artist}</p>
		</div>
	</div>

<style>
	.container {
		display: grid;
		grid-template-columns: [first] 20% [visual] 70% [queue];
		grid-template-areas: 'album-cover detail';
		grid-gap: 3px;
		align-items: center;
		/* justify-items: center; */
	}
	.queue-card {
		/* border: 1px solid black; */
		height: auto;
		max-height: inherit;
	}
	.song-description {
		grid-area: detail;
		height: auto;
	}
	.album-cover {
		grid-area: album-cover;
		object-fit: cover;
		max-height: inherit;
		width: auto;
		justify-self: center;
	}
	.artist-name {
		font-weight: 400;
		font-size: 24px;
	}
	.text {
		color: white;
		margin: 0;
	}
</style>