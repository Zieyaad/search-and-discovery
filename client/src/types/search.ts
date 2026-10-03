export type SearchResult = {
  id: string;
  name: string;
  category: string;
  description: string;
  popularity: number;
  price: number;
  available: boolean;
  deliveryEstimate: string;
};

export type SearchParams = {
  query: string;
  category: string;
  sortBy: string;
};
