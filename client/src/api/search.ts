import type { SearchParams, SearchResult } from "../types/search.ts";

export async function searchCatalog(
  params: SearchParams,
): Promise<SearchResult[]> {
  const searchParams = new URLSearchParams();

  if (params.query) {
    searchParams.set("q", params.query);
  }

  if (params.category) {
    searchParams.set("category", params.category);
  }

  if (params.sortBy) {
    searchParams.set("sort", params.sortBy);
  }

  const response = await fetch(`/api/search?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("Search request failed");
  }

  return response.json();
}
