require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs'); 
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');
const Url = require('./models/Url'); // This cleanly imports our updated schema from above!

// Initialize express app
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log requests in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/urls', urlRoutes);

// ─── VERIFY GATEWAY ENDPOINT ────────────────────────────────────
app.post('/api/redirect/:shortCode/verify', async (req, res, next) => {
  try {
    const { shortCode } = req.params;
    const { password } = req.body;

    const url = await Url.findOne({ shortCode });
    if (!url) {
      return res.status(404).json({ message: 'Short URL not found' });
    }

    if (url.expiresAt && new Date() > new Date(url.expiresAt)) {
      return res.status(410).json({ message: 'This link has expired' });
    }

    const isMatch = await bcrypt.compare(password || '', url.password || '');
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect link verification password' });
    }

    url.clicks += 1;
    url.lastVisited = new Date();
    url.visits.push({ timestamp: new Date() });
    await url.save();

    res.json({ valid: true, originalUrl: url.originalUrl });
  } catch (error) {
    next(error);
  }
});

// ─── CATCH-ALL REDIRECTION GATEWAY ──────────────────────────────
app.get('/:shortCode', async (req, res, next) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).send('<h1>Link Not Found</h1>');
    }

    console.log("=== REDIRECT INTERCEPT DEBUG ===");
    console.log("ShortCode Clicked:", shortCode);
    console.log("Stored Password Hash in DB:", url.password);
    console.log("Stored Expiration Date in DB:", url.expiresAt);
    console.log("=================================");

    // Expiration verification check
    if (url.expiresAt && new Date() > new Date(url.expiresAt)) {
      return res.status(410).send('<h1>⏳ Link Expired</h1><p>This shortened routing pathway has expired.</p>');
    }

    // Password verification check
    if (url.password && url.password.trim() !== "") {
      const frontendGateway = process.env.FRONTEND_URL || 'http://localhost:5173';
      return res.redirect(`${frontendGateway}/redirect-gateway/${shortCode}`);
    }

    // Normal path mapping
    url.clicks += 1;
    url.lastVisited = new Date();
    url.visits.push({ timestamp: new Date() });
    await url.save();

    return res.redirect(302, url.originalUrl);
  } catch (error) {
    next(error);
  }
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
