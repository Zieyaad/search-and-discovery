<script lang="ts">
  export let searchQuery = "";
</script>

<input
  type="text"
  placeholder="Search burgers, pizza, chicken..."
  bind:value={searchQuery}
/>
