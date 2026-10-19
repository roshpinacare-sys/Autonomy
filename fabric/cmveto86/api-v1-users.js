const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

// משתני סביבה - יש להגדיר באמת בסביבת ההפעלה
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const SALT_ROUNDS = 10;

// מודל משתמש (לדוגמה - ביישום אמיתי יש להשתמש במסד נתונים)
const users = [
  { id: 1, username: 'admin', password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', role: 'admin' },
  { id: 2, username: 'editor', password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', role: 'editor' },
  { id: 3, username: 'viewer', password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', role: 'viewer' }
];

// פונקציית עזר ליצירת JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// מידלוור לאימות JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

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

// מידלוור לבדיקת הרשאות
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

// נתיב להתחברות (login)
app.post('/api/v1/auth/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateToken(user);
  res.json({ token });
});

// נתיב לקבלת רשימת משתמשים - דורש אימות והרשאת קריאה
app.get('/api/v1/users', authenticateToken, authorize(['admin', 'editor']), (req, res) => {
  // מנהלים יכולים לראות את כל המשתמשים
  if (req.user.role === 'admin') {
    return res.json(users);
  }
  
  // עורכים יכולים לראות רק משתמשים עם תפקיד editor או viewer
  const filteredUsers = users.filter(u => u.role !== 'admin');
  res.json(filteredUsers);
});

// נתיב לקבלת משתמש ספציפי - דורש אימות
app.get('/api/v1/users/:id', authenticateToken, (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // משתמשים יכולים לראות רק את המידע שלהם, אלא אם כן הם מנהלים
  if (req.user.id !== userId && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  res.json(user);
});

// נתיב לעדכון משתמש - דורש אימות והרשאת עריכה
app.put('/api/v1/users/:id', authenticateToken, authorize(['admin', 'editor']), (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // משתמשים יכולים לעדכן רק את המידע שלהם, אלא אם כן הם מנהלים
  if (req.user.id !== userId && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  // לוגיקת עדכון משתמש (לדוגמה)
  const { username, role } = req.body;
  if (username) user.username = username;
  if (role && req.user.role === 'admin') user.role = role; // רק מנהלים יכולים לשנות תפקיד

  res.json(user);
});

// שגיאות כלליות
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
