<script lang="ts">
	import Player from './Player.svelte';
	import type { PlayerEntity } from './entites/PlayerEntity.svelte';

	let participants$: PlayerEntity[] = [];
	let dealer$: PlayerEntity;
	let isChoosingDealer$: boolean = false;

	const addParticipant = () => {
		let index = participants$.length + 1;
		participants$ = [
			...participants$,
			{
				name: `Người chơi ${index}`,
				point: 0,
				isCanceled: false
			}
		];
	};

	const toggleParticipant = (player: PlayerEntity) => {
		if (player === dealer$) return;
		player.isCanceled = !player.isCanceled;
		participants$ = participants$;
	};

	const chooseDealer = (player: PlayerEntity) => {
		dealer$ = player;
		isChoosingDealer$ = false;
	};

	const changePoint = (player: PlayerEntity, isIncrease: boolean) => {
		if (!dealer$) return;
		player.point += isIncrease ? 1 : -1;
		dealer$.point -= isIncrease ? 1 : -1;
		participants$ = participants$;
	};

	const toggleChoosing = () => (isChoosingDealer$ = !isChoosingDealer$);
</script>

<div class="flex flex-col relative gap-4">
	<div class="flex flex-row gap-4 z-10">
		<button
			on:click={addParticipant}
			class="bg-primary mb-3 px-2 py-1 rounded-lg text-white"
		>
			Thêm người chơi
		</button>

		<button
			on:click={toggleChoosing}
			class="mb-3 px-2 py-1 rounded-lg text-white {isChoosingDealer$
				? 'bg-variant'
				: 'bg-variant/50'}"
		>
			{isChoosingDealer$ ? 'Đang chọn' : 'Chọn cái'}
		</button>
	</div>

	<ul class="flex flex-col gap-3 z-10">
		{#each participants$ as player}
			<Player
				data$={player}
				{dealer$}
				{isChoosingDealer$}
				onGetToggled$={toggleParticipant}
				onChooseDealer$={chooseDealer}
				onChangePoint$={changePoint}
			/>
		{/each}
	</ul>

	<button
		on:click={toggleChoosing}
		class="{isChoosingDealer$
			? 'fixed'
			: 'hidden'} top-0 z-0 left-0 w-screen h-screen"
	/>
</div>
