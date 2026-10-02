<script lang="ts">
  export let searchQuery = "";
  export let placeholder = "Search...";

  function handleInput() {
    const event = new CustomEvent("search");
    dispatchEvent(event);
  }
</script>

<input
  type="text"
  {placeholder}
  bind:value={searchQuery}
  on:input={handleInput}
/>
