import { Router } from "express";

import catalog from "../data/catalog.js";
import { searchCatalog } from "../services/searchService.js";

const router = Router();

router.get("/categories", (req, res) => {
  const categories = [...new Set(catalog.map((item) => item.category))].sort();

  res.json(categories);
});

router.get("/search", async (req, res) => {
  const query = typeof req.query.q === "string" ? req.query.q : "";

  const category =
    typeof req.query.category === "string" ? req.query.category : "";

  const sortBy =
    typeof req.query.sort === "string" ? req.query.sort : "popularity";

  const results = await searchCatalog({
    query,
    category,
    sortBy,
  });

  res.json(results);
});

export default router;
