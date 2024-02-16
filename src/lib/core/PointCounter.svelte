<script lang="ts">
	import Player from './Player.svelte';
	import type { PlayerEntity } from './entites/PlayerEntity.svelte';

	let participants$: PlayerEntity[] = [];

	const addParticipant = () => {
		let index = participants$.length + 1;
		participants$ = [
			...participants$,
			{
				name: `Người chơi ${index}`,
				point: 0
			}
		];
	};

	const removeParticipant = (removedName: string) => {
		participants$ = participants$.filter(
			(player) => player.name !== removedName
		);
	};
</script>

<div>
	<button
		on:click={addParticipant}
		class="bg-primary mb-3 px-2 py-1 rounded-lg text-white"
	>
		Thêm người chơi
	</button>
	<ul class="flex flex-col gap-3">
		{#each participants$ as player}
			<Player data$={player} />
		{/each}
	</ul>
</div>
