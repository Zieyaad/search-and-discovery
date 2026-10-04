/** This module simulates an upstream provider with network delays and occasional failures, then returns sample price and delivery data for a catalog item. */
import type { CatalogItem } from "../types/catalog.js";

export type ProviderData = {
  price: number;
  available: boolean;
  deliveryEstimate: string;
};

// Waits for the given time to simulate network latency.
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Returns sample provider data after a delay or throws if the provider is unavailable.
export async function getProviderData(
  item: CatalogItem,
): Promise<ProviderData> {
  const latency = 200 + Math.random() * 800;

  await delay(latency);

  if (Math.random() < 0.1) {
    throw new Error("Upstream provider unavailable");
  }

  const prices: Record<string, number> = {
    "1": 89.9,
    "2": 109.9,
    "3": 79.9,
    "4": 119.9,
    "5": 129.9,
    "6": 99.9,
    "7": 84.9,
    "8": 39.9,
    "9": 54.9,
    "10": 49.9,
  };

  return {
    price: prices[item.id] ?? 99.9,
    available: true,
    deliveryEstimate: "25-35 min",
  };
}
