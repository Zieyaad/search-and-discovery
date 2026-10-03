<script lang="ts">
  import { onMount } from "svelte";

  import { getCategories, searchCatalog } from "./api/search";

  import type { SearchResult } from "./types/search";

  import SearchBar from "./components/SearchBar.svelte";
  import SearchControls from "./components/SearchControls.svelte";
  import ResultCard from "./components/ResultCard.svelte";

  let searchQuery = "";
  let selectedCategory = "";
  let sortBy = "popularity";

  let categories: string[] = [];
  let results: SearchResult[] = [];

  let isLoading = false;
  let errorMessage = "";

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

  async function loadInitialData() {
    isLoading = true;
    errorMessage = "";

    try {
      const [initialResults, categoryResults] = await Promise.all([
        searchCatalog({
          query: "",
          category: "",
          sortBy: "popularity",
        }),
        getCategories(),
      ]);

      results = initialResults;
      categories = categoryResults;
    } catch (error) {
      console.error(error);
      errorMessage = "Something went wrong while loading the app.";
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    loadInitialData();
  });
</script>

<div class="app-shell">
  <header class="masthead">
    <a class="brand" href="/" aria-label="Mr D home">
      <span class="brand-mark" aria-hidden="true"
        ><span>MR</span><strong>D</strong></span
      >
      <span class="brand-name">Mr D</span>
    </a>
    <span class="masthead-note"
      ><span class="live-dot"></span>Good food, delivered</span
    >
  </header>

  <main class="page-content">
    <section class="hero" aria-labelledby="hero-title">
      <img
        class="hero-image"
        src="https://img.mrdfood.com/800x0/web-v2/f9330441-5db4-4517-a30c-cc88047c3576.jpg"
        alt="Freshly prepared wraps and hummus"
      />
      <div class="hero-copy">
        <p class="eyebrow">RESTAURANTS <span>/</span> FOOD SEARCH</p>
        <h1 id="hero-title">Find something<br />good to eat.</h1>
        <p>Discover a new favourite from the menu.</p>
      </div>
      <span class="hero-sticker" aria-hidden="true"
        >GOOD<br />MOOD<br /><strong>FOOD</strong></span
      >
    </section>

    <section class="discovery" aria-labelledby="search-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">YOUR NEXT MEAL</p>
          <h2 id="search-title">What are you craving?</h2>
        </div>
        <p class="section-note">Search the menu and find your pick.</p>
      </div>

      <div class="search-toolbar">
        <SearchBar
          bind:searchQuery
          placeholder="Search burgers, pizza, chicken..."
        />

        <SearchControls bind:selectedCategory bind:sortBy {categories} />

        <button on:click={runSearch} disabled={isLoading}>
          {isLoading ? "Searching..." : "Search menu"}
          <span aria-hidden="true">&#8594;</span>
        </button>
      </div>
    </section>

    <div class="results-header">
      <p>
        {results.length}
        result{results.length === 1 ? "" : "s"}
      </p>
    </div>

    <section class="results-grid" aria-label="Menu search results">
      {#if isLoading}
        <p class="message">Searching...</p>
      {:else if errorMessage}
        <div class="error message">
          <p>{errorMessage}</p>

          <button on:click={runSearch}>Try again</button>
        </div>
      {:else if results.length === 0}
        <p class="message">
          No results found. Try a different search or category.
        </p>
      {:else}
        {#each results as item}
          <ResultCard {item} />
        {/each}
      {/if}
    </section>
  </main>
</div>
