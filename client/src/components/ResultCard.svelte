<script lang="ts">
  import type { CatalogItem } from "../data/catalog";

  export let item: CatalogItem;
</script>

<article>
  <h2>{item.name}</h2>
  <p class="category">{item.category}</p>
  <p>{item.description}</p>
  <p>R{item.price.toFixed(2)}</p>
  <p>Popularity: {item.popularity}</p>
</article>
