import catalog from "../data/catalog.js";
import type { CatalogItem } from "../types/catalog.js";
import { getProviderData, type ProviderData } from "./upstreamProvider.js";

export type SearchParams = {
  query: string;
  category: string;
  sortBy: string;
};

export type SearchResult = CatalogItem & ProviderData;

export function filterAndSortCatalog(
  items: CatalogItem[],
  params: SearchParams,
): CatalogItem[] {
  const query = params.query.toLowerCase().trim();

  const filteredCatalog = items.filter((item) => {
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);

    const matchesCategory =
      !params.category || item.category === params.category;

    return matchesSearch && matchesCategory;
  });

  return [...filteredCatalog].sort((a, b) => {
    if (params.sortBy === "popularity") {
      return b.popularity - a.popularity;
    }

    return 0;
  });
}

export async function searchCatalog(
  params: SearchParams,
): Promise<SearchResult[]> {
  const filteredCatalog = filterAndSortCatalog(catalog, params);

  const results = await Promise.all(
    filteredCatalog.map(async (item) => {
      try {
        const providerData = await getProviderData(item);

        return {
          ...item,
          ...providerData,
        };
      } catch (error) {
        console.error(`Provider failed for ${item.name}:`, error);

        return {
          ...item,
          price: 0,
          available: false,
          deliveryEstimate: "Currently unavailable",
        };
      }
    }),
  );

  return results;
}
