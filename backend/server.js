import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db.js'; // Perhatikan kita pakai `default import`, bukan named export

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// Get all missions
app.get('/missions', (req, res) => {
  const missions = db.prepare('SELECT * FROM missions').all();
  res.json(missions);
});

// Create a new mission
app.post('/missions', (req, res) => {
  const { name, waypoints } = req.body;
  db.prepare('INSERT INTO missions (name, waypoints) VALUES (?, ?)').run(name, JSON.stringify(waypoints));
  res.json({ message: 'Mission created successfully' });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
