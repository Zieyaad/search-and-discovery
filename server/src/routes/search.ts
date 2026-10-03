import { Router } from "express";

import catalog from "../data/catalog.js";

import {
  searchCatalog,
  SORT_OPTIONS,
  type SortOption,
} from "../services/searchService.js";

function isSortOption(value: string): value is SortOption {
  return SORT_OPTIONS.includes(value as SortOption);
}

const router = Router();

router.get("/categories", (req, res) => {
  const categories = [...new Set(catalog.map((item) => item.category))].sort();

  res.json(categories);
});

router.get("/search", async (req, res) => {
  const query = typeof req.query.q === "string" ? req.query.q : "";

  const category =
    typeof req.query.category === "string" ? req.query.category : "";

  const sort =
    typeof req.query.sort === "string" ? req.query.sort : "popularity";

  if (!isSortOption(sort)) {
    res.status(400).json({
      error: "Invalid sort option",
      validOptions: SORT_OPTIONS,
    });

    return;
  }

  const results = await searchCatalog({
    query,
    category,
    sortBy: sort,
  });

  res.json(results);
});

export default router;
