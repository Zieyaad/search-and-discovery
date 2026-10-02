<script lang="ts">
  export let searchQuery = "";
  export let placeholder = "Search...";
</script>

<input type="text" {placeholder} bind:value={searchQuery} />
