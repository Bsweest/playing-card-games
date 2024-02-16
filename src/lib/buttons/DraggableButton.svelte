<script lang="ts">
	export let className: string = '';

	let dragComponent: HTMLButtonElement | null = null;
	let isDragging$: boolean = false,
		isPassedThreshold$: boolean = false;
	let initialX: number = 0,
		deltaX$: number = 0;
	let containerWidth: number = 0;

	// #region useMouse
	const onMouseDown = (
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		}
	) => {
		isDragging$ = true;
		initialX = event.clientX;
		dragComponent?.addEventListener('mousemove', onMouseMove);
	};

	const onMouseUp = () => {
		isDragging$ = false;
		dragComponent?.removeEventListener('mousemove', onMouseMove);
		cleanUpEvent();
	};

	const onMouseMove = (event: MouseEvent) => {
		if (!isDragging$) return;
		event.preventDefault();
		deltaX$ = event.clientX - initialX;
		validateThreshold();
	};
	// #endregion

	// #region useTouch
	const onTouchStart = (
		event: TouchEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		}
	) => {
		isDragging$ = true;
		initialX = event.touches[0].clientX;
		dragComponent?.addEventListener('touchmove', onTouchMove);
	};

	const onTouchEnd = () => {
		isDragging$ = false;
		dragComponent?.removeEventListener('touchmove', onTouchMove);
		cleanUpEvent();
	};

	const onTouchMove = (event: TouchEvent) => {
		if (!isDragging$) return;
		event.preventDefault();
		deltaX$ = event.touches[0].clientX - initialX;
		validateThreshold();
	};
	//#endregion

	const validateThreshold = () => {
		isPassedThreshold$ = deltaX$ < -(containerWidth / 2.5);
	};

	const cleanUpEvent = () => {
		deltaX$ = 0;
		isPassedThreshold$ = false;
	};
</script>

<button
	bind:this={dragComponent}
	tabindex={0}
	style:transform="translateX({deltaX$}px)"
	class="{className} {isDragging$ ? 'cursor-grabbing' : ''} {isPassedThreshold$
		? 'opacity-70'
		: ''}"
	bind:clientWidth={containerWidth}
	on:mousedown={onMouseDown}
	on:mouseup={onMouseUp}
	on:touchstart={onTouchStart}
	on:touchend={onTouchEnd}
>
	<slot />
</button>
