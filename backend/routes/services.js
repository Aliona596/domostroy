const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// GET все услуги
router.get('/', (req, res) => {
  db.all('SELECT * FROM services', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET одна услуга
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM services WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Service not found' });
    res.json(row);
  });
});

// POST (только админ)
router.post('/', auth, (req, res) => {
  const { name, description, price_per_unit, unit, category, image_url } = req.body;
  db.run(
    `INSERT INTO services (name, description, price_per_unit, unit, category, image_url) VALUES (?, ?, ?, ?, ?, ?)`,
    [name, description, price_per_unit, unit, category, image_url],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// PUT (только админ)
router.put('/:id', auth, (req, res) => {
  const { name, description, price_per_unit, unit, category, image_url } = req.body;
  db.run(
    `UPDATE services SET name=?, description=?, price_per_unit=?, unit=?, category=?, image_url=? WHERE id=?`,
    [name, description, price_per_unit, unit, category, image_url, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// DELETE (только админ)
router.delete('/:id', auth, (req, res) => {
  db.run(`DELETE FROM services WHERE id = ?`, [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;