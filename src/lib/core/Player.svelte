<script lang="ts">
	import DraggableButton from '$lib/buttons/DraggableButton.svelte';
	import { IconEdit, IconMinus, IconPlus } from '@tabler/icons-svelte';
	import type { PlayerEntity } from './entites/PlayerEntity.svelte';

	export let data$: PlayerEntity;
	$: ({ name, point } = data$);
</script>

<li class="flex relative rounded-lg border-2 overflow-hidden">
	<DraggableButton className="flex flex-1 z-10">
		<div class="flex items-center p-2 bg-white rounded-lg flex-row flex-1">
			<div class="flex-1 items-center justify-start flex-row flex gap-2">
				<p>{name}</p>
				<button>
					<IconEdit />
				</button>
			</div>
			<p class="font-bold">{point}</p>
			<div class="flex flex-row mx-3">
				<button>
					<IconPlus />
				</button>
				<button>
					<IconMinus />
				</button>
			</div>
		</div>
	</DraggableButton>

	<div
		class="absolute z-0 rounded-lg pr-3 text-white bg-red-400 inset-0 flex justify-end items-center"
	>
		Huỷ người chơi
	</div>
</li>
