<script lang="ts">
	export let text: string = '';
	export let transitionHandler: () => void = () => {};
</script>

<div class="flex flex-row items-center align-middle">
	<button type="button" on:click={transitionHandler}>
		<div class="flow-row flex">
			<span class="font-interactive mr-2 inline-block align-middle leading-none">
				{text}
			</span>
			<span class="font-interactive inline-block align-middle leading-none">
				{'>'}
			</span>
		</div>
	</button>
</div>
