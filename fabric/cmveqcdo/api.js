const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

// מפתח סודי לחתימת JWT - באמת צריך לשמור כסוד בסביבת הייצור
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// דגמי משתמשים - באמת יש לשלוף ממסד נתונים
const users = [
  { id: 1, username: 'admin', role: 'admin', password: 'admin123' },
  { id: 2, username: 'user', role: 'user', password: 'user123' },
];

// Middleware לאימות JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Middleware להרשאות תפקידים
const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

// Middleware ללוגינג של בקשות API
const logApiRequests = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} by user ${req.user.username}`);
  next();
};

// נתיב להתחברות וקבלת JWT
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

// נתיב לניהול משתמשים עם אימות והרשאות
app.get('/api/v1/users', authenticateToken, logApiRequests, (req, res) => {
  // משתמשים רגילים רואים רק את המידע שלהם
  if (req.user.role === 'user') {
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json([user]);
  }
  
  // מנהלים רואים את כל המשתמשים
  if (req.user.role === 'admin') {
    return res.json(users);
  }
  
  // כל תפקיד אחר - גישה נדחית
  return res.status(403).json({ error: 'Insufficient permissions' });
});

app.put('/api/v1/users/:id', authenticateToken, authorizeRole('admin'), logApiRequests, (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // עדכון המשתמש - באמת צריך לעדכן במסד נתונים
  const updatedUser = { ...users[userIndex], ...req.body };
  users[userIndex] = updatedUser;
  
  res.json(updatedUser);
});

app.delete('/api/v1/users/:id', authenticateToken, authorizeRole('admin'), logApiRequests, (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // מחיקת המשתמש - באמת צריך למחוק ממסד נתונים
  const deletedUser = users.splice(userIndex, 1)[0];
  
  res.json({ message: 'User deleted successfully', user: deletedUser });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});