import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import type { CatalogItem } from "../types/catalog.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const catalogPath = path.join(__dirname, "catalog.json");

const catalog = JSON.parse(readFileSync(catalogPath, "utf-8")) as CatalogItem[];

export default catalog;
