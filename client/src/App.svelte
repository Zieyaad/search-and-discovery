<script lang="ts">
  import { catalog } from './data/catalog';

  let searchQuery = '';

  $: filteredCatalog = catalog.filter((item) => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      return true;
    }

    return (
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
  });
</script>

<h1>Mr D Search</h1>

<input
  type="text"
  placeholder="Search for food..."
  bind:value={searchQuery}
/>

{#each filteredCatalog as item}
  <div>
    <h2>{item.name}</h2>
    <p>{item.category}</p>
    <p>{item.description}</p>
  </div>
{/each}