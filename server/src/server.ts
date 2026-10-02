import express from "express";

import catalog from "./data/catalog.js";
import searchRouter from "./routes/search.js";

const app = express();

const PORT = 3000;

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.get("/api/catalog", (req, res) => {
  res.json(catalog);
});

app.use("/api", searchRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
