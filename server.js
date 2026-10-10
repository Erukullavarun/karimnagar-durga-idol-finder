const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'portal-database.json');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Helper to read database
function readDB() {
  if (fs.existsSync(DATA_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    } catch (e) {
      console.error('Error parsing database:', e);
    }
  }
  return null;
}

// Helper to write database
function writeDB(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// API Routes
app.get('/api/site-data', (req, res) => {
  const db = readDB();
  if (db) {
    return res.json({ success: true, data: db });
  }
  res.json({ success: false, message: 'Using local storage' });
});

app.post('/api/save-all', (req, res) => {
  try {
    const { config, mandapams, areas } = req.body;
    writeDB({ config, mandapams, areas, updatedAt: new Date().toISOString() });
    res.json({ success: true, message: 'Data saved to server database successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Serve Frontend Pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/map', (req, res) => {
  res.sendFile(path.join(__dirname, 'map.html'));
});

app.get('/unique', (req, res) => {
  res.sendFile(path.join(__dirname, 'unique.html'));
});

app.get('/gallery', (req, res) => {
  res.sendFile(path.join(__dirname, 'gallery.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/submit', (req, res) => {
  res.sendFile(path.join(__dirname, 'submit.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🌺  Karimnagar Durga Idol Finder Server is running!`);
  console.log(`🌐 Website URL:  http://localhost:${PORT}`);
  console.log(`⚙️  Admin Panel:  http://localhost:${PORT}/admin.html`);
  console.log(`🔑 Admin Login:  chintuvarun_3008 / admin123`);
  console.log(`====================================================`);
});
