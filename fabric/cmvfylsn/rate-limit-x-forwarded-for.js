const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { createHash } = require('crypto');

const app = express();
app.use(helmet());

// Trusted proxy IPs (internal network)
const trustedProxies = [
  '192.168.1.0/24',
  '10.0.0.0/8',
  '172.16.0.0/12'
];

// Internal authentication middleware
const internalAuth = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  
  // Check if IP is from trusted internal network
  const isInternal = trustedProxies.some(range => {
    const [network, prefixLength] = range.split('/');
    const mask = parseInt(prefixLength, 10);
    const ipInt = ipToLong(ip);
    const networkInt = ipToLong(network);
    const maskInt = (0xFFFFFFFF << (32 - mask)) >>> 0;
    
    return (ipInt & maskInt) === (networkInt & maskInt);
  });
  
  if (isInternal) {
    // Add internal authentication token
    req.internalToken = generateInternalToken(ip);
    next();
  } else {
    return res.status(403).json({ error: 'Forbidden: Internal access only' });
  }
};

// IP to long conversion helper
function ipToLong(ip) {
  const octets = ip.split('.');
  let long = 0;
  
  for (let i = 0; i < 4; i++) {
    long += parseInt(octets[i], 10) * Math.pow(256, 3 - i);
  }
  
  return long >>> 0;
}

// Generate internal token based on IP
function generateInternalToken(ip) {
  return createHash('sha256').update(`${ip}:${process.env.INTERNAL_SECRET}`).digest('hex');
}

// Rate limiting configuration
const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: { error: message },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
      // Use a combination of IP and internal token for rate limiting
      const ip = req.ip || req.connection.remoteAddress;
      const token = req.internalToken || 'external';
      return `${ip}:${token}`;
    },
    skip: (req) => {
      // Skip rate limiting for health checks
      return req.path === '/health';
    }
  });
};

// Apply rate limiting to all routes
app.use(createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  100, // limit each IP to 100 requests per windowMs
  'Too many requests from this IP, please try again later.'
));

// Apply stricter rate limiting for internal routes
app.use('/internal', internalAuth, createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  1000, // higher limit for internal requests
  'Too many internal requests, please try again later.'
));

// Protected route example
app.get('/api/data', (req, res) => {
  res.json({ message: 'Protected data', timestamp: new Date().toISOString() });
});

// Internal route example
app.get('/internal/admin', internalAuth, (req, res) => {
  res.json({ message: 'Internal admin data', token: req.internalToken });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});