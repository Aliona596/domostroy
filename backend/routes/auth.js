const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db')
const JWT_SECRET = 'domostroy_secret_key_2025'
router.post('/login', (req, res) => {
  const { username, password } = req.body
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message })
    if (!user) return res.status(401).json({ error: 'Неверные учетные данные' })
    
    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) return res.status(401).json({ error: 'Неверные учетные данные' })
    
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' })
    res.json({ token, username: user.username })
  })
})
router.post('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ valid: false })
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    res.json({ valid: true, user: decoded })
  } catch {
    res.status(401).json({ valid: false })
  }
})
module.exports = router