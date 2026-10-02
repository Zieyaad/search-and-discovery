<script lang="ts">
  import { catalog } from "./data/catalog";
  import SearchBar from "./components/SearchBar.svelte";

  let searchQuery = "";
  let selectedCategory = "";
  let sortBy = "popularity";

  // Get the unique categories from the catalogue.
  $: categories = [...new Set(catalog.map((item) => item.category))];

  // Filter the catalogue using the search text and selected category.
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

  // Sort the filtered results based on the selected sort option.
  $: sortedCatalog = [...filteredCatalog].sort((a, b) => {
    if (sortBy === "popularity") {
      return b.popularity - a.popularity;
    }

    if (sortBy === "price-low") {
      return a.price - b.price;
    }

    if (sortBy === "price-high") {
      return b.price - a.price;
    }

    return 0;
  });
</script>

<div class="page">
  <header>
    <h1>Mr D Search</h1>
    <p>Find something to eat</p>
  </header>

  <main>
    <SearchBar bind:searchQuery />

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

    <p>
      {sortedCatalog.length} result{sortedCatalog.length === 1 ? "" : "s"}
    </p>

    <section>
      {#if sortedCatalog.length === 0}
        <p>No results found. Try a different search or category.</p>
      {:else}
        {#each sortedCatalog as item}
          <article>
            <h2>{item.name}</h2>
            <p class="category">{item.category}</p>
            <p>{item.description}</p>
            <p>{item.popularity}</p>
            <p>${item.price.toFixed(2)}</p>
          </article>
        {/each}
      {/if}
    </section>
  </main>
</div>
