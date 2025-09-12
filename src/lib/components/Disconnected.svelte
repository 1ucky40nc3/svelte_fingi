<script lang="ts">
	const handleOnClick: { (): void } = (): void => {
		alert('The connection was lost! Please go back to the connection setup and reconnect.');
	};
</script>

<button
	class="rounded-xl border-2 border-dotted border-black p-1"
	type="button"
	on:click={handleOnClick}
>
	<div class="flex flex-row items-center">
		<span class="font-interactive mr-2 ml-2 inline-block align-middle leading-none">
			No Connection!
		</span>
	</div>
</button>
