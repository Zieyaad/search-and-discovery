import { catalog, type CatalogItem } from "../data/catalog";

export type SearchParams = {
  query: string;
  category: string;
  sortBy: string;
};

export async function searchCatalog(
  params: SearchParams,
): Promise<CatalogItem[]> {
  // Simulate the time it would take to make a network request.
  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (params.query.toLowerCase() === "error") {
    throw new Error("Simulated search failure");
  }

  const query = params.query.toLowerCase().trim();

  const filteredCatalog = catalog.filter((item) => {
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);

    const matchesCategory =
      !params.category || item.category === params.category;

    return matchesSearch && matchesCategory;
  });

  const sortedCatalog = [...filteredCatalog].sort((a, b) => {
    if (params.sortBy === "popularity") {
      return b.popularity - a.popularity;
    }

    if (params.sortBy === "price-low") {
      return a.price - b.price;
    }

    if (params.sortBy === "price-high") {
      return b.price - a.price;
    }

    return 0;
  });

  return sortedCatalog;
}
