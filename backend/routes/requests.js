const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
router.get('/', auth, (req, res) => {
  db.all('SELECT * FROM requests ORDER BY created_at DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
router.post('/', [
  body('name').notEmpty().withMessage('Имя обязательно'),
  body('phone').notEmpty().withMessage('Телефон обязателен')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, phone, email, service_id, message } = req.body;
  db.run(
    `INSERT INTO requests (name, phone, email, service_id, message, status) VALUES (?, ?, ?, ?, ?, 'new')`,
    [name, phone, email, service_id, message],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, message: 'Заявка отправлена!' });
    }
  );
});
router.put('/:id/status', auth, (req, res) => {
  const { status } = req.body;
  db.run(`UPDATE requests SET status = ? WHERE id = ?`, [status, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});
module.exports = router;