import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 4173;
const DIST_DIR = path.join(__dirname, "dist");

// Serve static files from dist directory
app.use(express.static(DIST_DIR, { maxAge: "1d" }));

// SPA fallback - serve index.html for any route that doesn't match static files
app.get("*", (req, res) => {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Serving files from ${DIST_DIR}`);
});
