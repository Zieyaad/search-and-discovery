<script lang="ts">
  import { catalog } from './data/data';
</script>

<h1>Mr D Search</h1>

{#each catalog as item}
  <div>
    <h2>{item.name}</h2>
    <p>{item.category}</p>
    <p>{item.description}</p>
  </div>
{/each}