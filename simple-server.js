import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Serve static HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'simple-page.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Simple server running at http://localhost:${port}`);
});
