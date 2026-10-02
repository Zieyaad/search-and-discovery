<script lang="ts">
  import { catalog } from './data/catalog';

  let searchQuery = '';
  let selectedCategory = '';

  $: filteredCatalog = catalog.filter((item) => {
    const query = searchQuery.toLowerCase().trim();

    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);

    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  $: categories = [...new Set(catalog.map((item) => item.category))];
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

  <select bind:value={selectedCategory}>
    <option value="">All categories</option>

    {#each categories as category}
      <option value={category}>
        {category}
      </option>
    {/each}
  </select>

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