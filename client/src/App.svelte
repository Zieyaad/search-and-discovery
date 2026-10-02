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

<div class="page">
  <header>
    <h1>Mr D Search</h1>
    <p>Find something to eat</p>
  </header>

  <main>
    <input
      type="text"
      placeholder="Search burgers, pizza, chicken..."
      bind:value={searchQuery}
    />

    <section>
      {#each filteredCatalog as item}
        <article>
          <h2>{item.name}</h2>
          <p class="category">{item.category}</p>
          <p>{item.description}</p>
        </article>
      {/each}
    </section>
  </main>
</div>