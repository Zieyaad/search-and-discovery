import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { filterAndSortCatalog } from "./searchService.js";

import type { CatalogItem } from "../types/catalog.js";

const testCatalog: CatalogItem[] = [
  {
    id: "1",
    name: "Classic Beef Burger",
    category: "Burgers",
    description: "Beef burger",
    popularity: 95,
  },
  {
    id: "2",
    name: "Chicken Burger",
    category: "Burgers",
    description: "Chicken burger",
    popularity: 91,
  },
  {
    id: "3",
    name: "Margherita Pizza",
    category: "Pizza",
    description: "Tomato and mozzarella",
    popularity: 88,
  },
];

describe("filterAndSortCatalog", () => {
  test("finds items by name", () => {
    const results = filterAndSortCatalog(testCatalog, {
      query: "chicken",
      category: "",
      sortBy: "popularity",
    });

    assert.equal(results.length, 1);
    assert.equal(results[0]?.name, "Chicken Burger");
  });

  test("filters by category", () => {
    const results = filterAndSortCatalog(testCatalog, {
      query: "",
      category: "Burgers",
      sortBy: "popularity",
    });

    assert.equal(results.length, 2);
  });

  test("sorts by descending popularity", () => {
    const results = filterAndSortCatalog(testCatalog, {
      query: "",
      category: "Burgers",
      sortBy: "popularity",
    });

    assert.equal(results[0]?.name, "Classic Beef Burger");
    assert.equal(results[1]?.name, "Chicken Burger");
  });

  test("returns an empty array when there are no matches", () => {
    const results = filterAndSortCatalog(testCatalog, {
      query: "sushi",
      category: "",
      sortBy: "popularity",
    });

    assert.equal(results.length, 0);
  });
});
