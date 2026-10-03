<script lang="ts">
  import type { SearchResult } from "../types/search";

  export let item: SearchResult;
</script>

<article>
  <h2>{item.name}</h2>

  <p class="category">
    {item.category}
  </p>

  <p>
    {item.description}
  </p>

  <p>
    R{item.price.toFixed(2)}
  </p>

  {#if item.available}
    <p>
      Available · {item.deliveryEstimate}
    </p>
  {:else}
    <p>Currently unavailable</p>
  {/if}

  <p>
    Popularity: {item.popularity}
  </p>
</article>
