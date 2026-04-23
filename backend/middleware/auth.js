const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'domostroy_secret_key_2025';
module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Доступ запрещен. Нет токена.' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Неверный токен' });
  }
};