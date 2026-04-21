const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { service_id, area, material_coefficient = 1 } = req.body;
  
  db.get('SELECT price_per_unit FROM services WHERE id = ?', [service_id], (err, service) => {
    if (err || !service) {
      return res.status(400).json({ error: 'Услуга не найдена' });
    }
    
    const basePrice = service.price_per_unit * area;
    const total = basePrice * material_coefficient;
    
    res.json({
      service_id,
      area,
      material_coefficient,
      base_price: Math.round(basePrice),
      total_price: Math.round(total),
      currency: 'RUB'
    });
  });
});

module.exports = router;