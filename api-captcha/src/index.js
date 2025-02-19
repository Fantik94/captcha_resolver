import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { log } from 'console';

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

// Obtenez le chemin du répertoire actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Route pour soumettre et vérifier un captcha
app.post('/api/submit-captcha', async (req, res) => {
  const { id, userInput } = req.body;

  try {
    const connection = await pool.getConnection();

    // Vérifier d'abord dans la table bruite
    let [bruteResults] = await connection.query(
      'SELECT id, value FROM captchas_bruite WHERE id = ?',
      [id]
    );

    let captchaType = 'bruite';
    let captchaRow = bruteResults[0];

    // Si pas trouvé dans bruite, chercher dans segmented
    if (!captchaRow) {
      [bruteResults] = await connection.query(
        'SELECT id, value FROM captchas_segmented WHERE id = ?',
        [id]
      );
      captchaRow = bruteResults[0];
      captchaType = 'segmented';
    }

    if (!captchaRow) {
      connection.release();
      return res.status(404).json({ message: 'Captcha non trouvé' });
    }

    const expectedValue = captchaRow.value;
    const status = userInput === expectedValue ? 'verified' : 'failed';

    // Insérer la soumission dans la base de données
    await connection.query(
      'INSERT INTO captcha_verifications (captcha_id, captcha_type, received_value, status, created_at) VALUES (?, ?, ?, ?, NOW())',
      [id, captchaType, userInput, status]
    );

    connection.release();
    res.json({ valid: status === 'verified' });

  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour exécuter le script Python
app.post('/api/run-python-script', async (req, res) => {
  try {
    const response = await fetch('http://localhost:8000/solve', {  // ✅ L'API Python est appelée ici
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erreur lors de l’appel à l’API Python:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
}); 