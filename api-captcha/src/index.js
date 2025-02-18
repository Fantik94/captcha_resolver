import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Configuration de la connexion MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'captcha_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Route pour obtenir un captcha aléatoire
app.get('/api/captcha', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const table = Math.random() < 0.5 ? 'captchas_bruite' : 'captchas_segmented';
    const [rows] = await connection.query(`SELECT * FROM ${table} ORDER BY RAND() LIMIT 1`);
    connection.release();

    if (rows.length > 0) {
      res.json({
        id: rows[0].id,
        imageUrl: rows[0].image_url,
        value: rows[0].value,
        type: table === 'captchas_bruite' ? 'bruite' : 'segmented'
      });
    } else {
      res.status(404).json({ message: 'Aucun captcha trouvé' });
    }
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour vérifier un captcha
app.post('/api/verify-captcha', async (req, res) => {
  const { id, userInput } = req.body;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      'SELECT * FROM captchas WHERE id = ? AND value = ?',
      [id, userInput]
    );
    connection.release();

    if (rows.length > 0) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
}); 