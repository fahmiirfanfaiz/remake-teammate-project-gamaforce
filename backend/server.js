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
  try {
    const stmt = db.prepare('SELECT * FROM missions'); // Gunakan prepare()
    const missions = stmt.all(); // Gunakan all() untuk mengambil semua data

    console.log("📤 Mengirim data ke frontend:", missions);
    res.json(missions);
  } catch (error) {
    console.error("❌ Error mengambil data dari database:", error);
    res.status(500).json({ error: error.message });
  }
});



// Create a new mission
app.post('/missions', (req, res) => {
  const { name, waypoints } = req.body;

  console.log("📥 Data diterima dari frontend:", { name, waypoints });

  try {
    const stmt = db.prepare('INSERT INTO missions (name, waypoints) VALUES (?, ?)');
    stmt.run(name, JSON.stringify(waypoints)); // Perbaikan: gunakan prepare().run()

    console.log("✅ Data berhasil disimpan ke database");
    res.json({ message: 'Mission created successfully' });
  } catch (error) {
    console.error("❌ Error menyimpan ke database:", error);
    res.status(500).json({ error: error.message });
  }
});




// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
