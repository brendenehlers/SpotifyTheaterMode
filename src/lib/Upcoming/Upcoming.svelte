<script lang="ts">
	import type { Song } from '../../global'
	import UpcomingCard from './UpcomingCard/UpcomingCard.svelte'

	export let upNext: Song[] = []
</script>

<div class='flex-container'>
	{#if upNext.length}
		<h1 class='header text'>Queue</h1>
	{/if}
	{#each upNext as song (song.id)}
		<div class='card-holder'>
			<UpcomingCard data={song} />
		</div>
	{/each}
</div>

<style src='./Queue.css'>
	.flex-container {
		max-height: 100%;

		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.card-holder {
		margin: 1%;
		height: 5rem;
		max-height: 5rem;
	}
</style>