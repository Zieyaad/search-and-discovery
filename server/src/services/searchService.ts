import catalog from "../data/catalog.js";
import type { CatalogItem } from "../types/catalog.js";

export type SearchParams = {
  query: string;
  category: string;
  sortBy: string;
};

export function searchCatalog(params: SearchParams): CatalogItem[] {
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

    return 0;
  });

  return sortedCatalog;
}
