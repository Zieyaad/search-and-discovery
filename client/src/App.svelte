<script lang="ts">
  import { onMount } from "svelte";

  import { catalog } from "./data/catalog";
  import { searchCatalog } from "./api/search";

  import type { SearchResult } from "./types/search";

  import SearchBar from "./components/SearchBar.svelte";
  import SearchControls from "./components/SearchControls.svelte";
  import ResultCard from "./components/ResultCard.svelte";

  let searchQuery = "";
  let selectedCategory = "";
  let sortBy = "popularity";

  let results: SearchResult[] = [];

  let isLoading = false;
  let errorMessage = "";

  $: categories = [...new Set(catalog.map((item) => item.category))];

  async function runSearch() {
    isLoading = true;
    errorMessage = "";

    try {
      results = await searchCatalog({
        query: searchQuery,
        category: selectedCategory,
        sortBy,
      });
    } catch (error) {
      console.error(error);
      errorMessage = "Something went wrong while searching.";
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    runSearch();
  });
</script>

<div class="page">
  <header>
    <h1>Mr D Search</h1>
    <p>Find something to eat</p>
  </header>

  <main>
    <SearchBar
      bind:searchQuery
      placeholder="Search burgers, pizza, chicken..."
    />

    <SearchControls bind:selectedCategory bind:sortBy {categories} />

    <button on:click={runSearch}> Search </button>

    <p>
      {results.length}
      result{results.length === 1 ? "" : "s"}
    </p>

    <section>
      {#if isLoading}
        <p>Searching...</p>
      {:else if errorMessage}
        <p>{errorMessage}</p>
      {:else if results.length === 0}
        <p>No results found. Try a different search or category.</p>
      {:else}
        {#each results as item}
          <ResultCard {item} />
        {/each}
      {/if}
    </section>
  </main>
</div>
