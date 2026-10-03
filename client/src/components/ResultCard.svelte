<script lang="ts">
  import type { SearchResult } from "../types/search";

  export let item: SearchResult;
</script>

<article class:unavailable={!item.available}>
  <div class="card-header">
    <div>
      <h2>{item.name}</h2>
      <p class="category">{item.category}</p>
    </div>

    {#if item.available}
      <span class="status available">Available</span>
    {:else}
      <span class="status unavailable">Unavailable</span>
    {/if}
  </div>

  <p class="description">
    {item.description}
  </p>

  <div class="card-footer">
    <div>
      <strong>R{item.price.toFixed(2)}</strong>

      {#if item.available}
        <span>{item.deliveryEstimate}</span>
      {:else}
        <span>{item.deliveryEstimate}</span>
      {/if}
    </div>

    <span class="popularity">
      Popularity: {item.popularity}
    </span>
  </div>
</article>
