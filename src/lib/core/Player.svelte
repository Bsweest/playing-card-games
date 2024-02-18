<script lang="ts">
	import DraggableButton from '$lib/components/buttons/DraggableButton.svelte';
	import { IconEdit, IconMinus, IconPlus } from '@tabler/icons-svelte';
	import type { PlayerEntity } from './entites/PlayerEntity.svelte';

	export let data$: PlayerEntity;
	export let dealer$: PlayerEntity;
	export let isChoosingDealer$: boolean;

	export let onGetToggled$: (value: PlayerEntity) => void;
	export let onChooseDealer$: (value: PlayerEntity) => void;
	export let onChangePoint$: (
		player: PlayerEntity,
		isIncrease: boolean
	) => void;

	let inputNameValue$: string = '';
	let inputName: HTMLInputElement;
	$: ({ name, point, isCanceled } = data$);
	$: isDealer = dealer$ === data$;
	$: onGetToggled = () => onGetToggled$(data$);
	$: onChooseDealer = () => onChooseDealer$(data$);

	const openInput = () => {
		inputName.focus();
	};
</script>

<li class="flex relative rounded-lg border-2 overflow-hidden">
	<DraggableButton
		isDisabled$={isDealer}
		className="flex flex-1 z-10"
		onSwiped={onGetToggled}
	>
		<div
			class="flex items-center px-2 gap-3 rounded-lg flex-row flex-1 {isCanceled
				? 'bg-gray-400'
				: isDealer
					? 'bg-yellow-200'
					: 'bg-white'}"
		>
			<div
				class="flex-1 items-center justify-start flex-row flex gap-2 mr-auto"
			>
				<p class="overflow-ellipsis line-clamp-2">{inputNameValue$}</p>
				<input
					class="w-0 opacity-0 overflow-hidden"
					bind:value={inputNameValue$}
					bind:this={inputName}
				/>
				<button
					class="h-full py-4"
					on:click={(e) => {
						e.stopPropagation();
						openInput();
					}}
				>
					<IconEdit />
				</button>
			</div>
			<p class="font-bold md:mr-10">{point}</p>

			<div class="flex flex-row rounded-full h-full pointer-events-bl">
				<button
					class="px-6 md:px-7 my-2 bg-secondary rounded-l-full"
					on:click={(event) => {
						event.stopPropagation();
						onChangePoint$(data$, true);
					}}
				>
					<IconPlus />
				</button>
				<div class="w-[2px] rounded-full bg-gray-600 my-2" />

				<button
					class="px-6 md:px-7 my-2 bg-secondary rounded-r-full"
					on:click={(event) => {
						event.stopPropagation();
						onChangePoint$(data$, false);
					}}
				>
					<IconMinus />
				</button>
			</div>

			<button
				on:click={onGetToggled}
				class="rounded-lg p-1 w-40 text-white hidden md:flex items-center justify-center {isDealer
					? 'bg-gray-400'
					: isCanceled
						? 'bg-green-500'
						: 'bg-red-500'}"
			>
				{isCanceled ? 'Trở lại cuộc chơi' : 'Huỷ người chơi'}
			</button>
		</div>
	</DraggableButton>
	{#if isCanceled}
		<div
			class="absolute z-0 rounded-lg px-3 text-white bg-green-500 inset-0 flex justify-start items-center"
		>
			Trở lại cuộc chơi
		</div>
	{:else}
		<div
			class="absolute z-0 rounded-lg px-3 text-white bg-red-400 inset-0 flex justify-start items-center"
		>
			Huỷ người chơi
		</div>
	{/if}

	<button
		on:click={onChooseDealer}
		class="absolute z-20 w-full rounded-lg inset-0 cursor-crosshair {isChoosingDealer$ &&
		!isCanceled
			? 'flex'
			: 'hidden'}"
	/>
</li>
