import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import "dotenv/config";

import getInfo from "./api/index.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
// Serve index.html at the root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api", async (req, res) => {
  const { query, limit = 50 } = req.query;

  if (!query) {
    error();
  } else {
    const results = await getInfo(query, limit);

    if (results === false) {
      error("No Results were found");
    } else {
      res.json(results);
    }
  }

  function error(i = "Query not provided") {
    res.status(400).json({ success: false, message: i });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
