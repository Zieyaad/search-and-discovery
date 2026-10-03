import express from "express";

import searchRouter from "./routes/search.js";

const app = express();

const PORT = 3000;

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.use("/api", searchRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
