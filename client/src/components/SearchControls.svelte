<script lang="ts">
  export let selectedCategory = "";
  export let sortBy = "popularity";
  export let categories: string[] = [];
</script>

<div class="controls">
  <select bind:value={selectedCategory}>
    <option value="">All categories</option>

    {#each categories as category}
      <option value={category}>
        {category}
      </option>
    {/each}
  </select>

  <select bind:value={sortBy}>
    <option value="popularity">Most popular</option>
    <option value="price-low">Price: Low to High</option>
    <option value="price-high">Price: High to Low</option>
  </select>
</div>
