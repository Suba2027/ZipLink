// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const urlRoutes = require('./routes/urlRoutes');
// const Url = require('./models/Url');

// // Initialize express app
// const app = express();

// // Connect to Database
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Log requests in development
// if (process.env.NODE_ENV !== 'production') {
//   app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
//   });
// }

// // Register API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/urls', urlRoutes);

// // @route   GET /:shortCode
// // @desc    Redirection endpoint to original URL and log telemetry
// // @access  Public
// app.get('/:shortCode', async (req, res, next) => {
//   try {
//     const { shortCode } = req.params;

//     // Find the URL document by shortCode
//     const url = await Url.findOne({ shortCode });

//     if (!url) {
//       return res.status(404).send(`
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>404 - Short URL Not Found</title>
//           <style>
//             body {
//               font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//               background: #0f0f1b;
//               color: #f3f4f6;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               height: 100vh;
//               margin: 0;
//             }
//             .container {
//               text-align: center;
//               background: rgba(255, 255, 255, 0.03);
//               backdrop-filter: blur(10px);
//               padding: 40px;
//               border-radius: 16px;
//               border: 1px solid rgba(255, 255, 255, 0.1);
//               box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
//               max-width: 400px;
//             }
//             h1 {
//               color: #ff4b4b;
//               margin-top: 0;
//             }
//             p {
//               color: #9ca3af;
//               line-height: 1.6;
//             }
//             .btn {
//               display: inline-block;
//               margin-top: 20px;
//               padding: 10px 20px;
//               background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
//               color: white;
//               text-decoration: none;
//               border-radius: 8px;
//               font-weight: bold;
//               transition: opacity 0.2s;
//             }
//             .btn:hover {
//               opacity: 0.9;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <h1>404</h1>
//             <h2>Link Not Found</h2>
//             <p>The short link you are trying to access does not exist or has expired.</p>
//             <a href="http://localhost:5173" class="btn">Go to Dashboard</a>
//           </div>
//         </body>
//         </html>
//       `);
//     }

//     // Increment clicks and log telemetry
//     url.clicks += 1;
//     url.lastVisited = new Date();
//     url.visits.push({ timestamp: new Date() });
    
//     // Save updated URL document
//     await url.save();

//     // Redirect to original URL
//     return res.redirect(302, url.originalUrl);
//   } catch (error) {
//     next(error);
//   }
// });

// // Global Error Handler Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     message: err.message || 'Internal Server Error',
//     error: process.env.NODE_ENV === 'production' ? {} : err.stack
//   });
// });

// // Listen
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
// });
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const bcrypt = require('bcryptjs'); // Needed to verify password comparison secure checks
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const urlRoutes = require('./routes/urlRoutes');
// const Url = require('./models/Url');

// // Initialize express app
// const app = express();

// // Connect to Database
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Log requests in development
// if (process.env.NODE_ENV !== 'production') {
//   app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
//   });
// }

// // Register API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/urls', urlRoutes);

// // ─── NEW FEATURE ENDPOINT: VERIFY LINK GATEWAY PASSWORD ─────────
// // @route   POST /api/redirect/:shortCode/verify
// // @desc    Validate credentials before letting the frontend redirect
// // @access  Public
// app.post('/api/redirect/:shortCode/verify', async (req, res, next) => {
//   try {
//     const { shortCode } = req.params;
//     const { password } = req.body;

//     const url = await Url.findOne({ shortCode });
//     if (!url) {
//       return res.status(404).json({ message: 'Short URL not found' });
//     }

//     // Double check expiration lifecycle status code
//     if (url.expiresAt && new Date() > new Date(url.expiresAt)) {
//       return res.status(410).json({ message: 'This shortened route link node has expired' });
//     }

//     // Match input against hashed DB value
//     const isMatch = await bcrypt.compare(password || '', url.password || '');
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Incorrect link verification password' });
//     }

//     // Increment click counts on successful verification match
//     url.clicks += 1;
//     url.lastVisited = new Date();
//     url.visits.push({ timestamp: new Date() });
//     await url.save();

//     // Send destination URL back to RedirectGatewayPage
//     res.json({ valid: true, originalUrl: url.originalUrl });
//   } catch (error) {
//     next(error);
//   }
// });

// // @route   GET /:shortCode
// // @desc    Redirection endpoint with integrated expiration & gate locks
// // @access  Public
// app.get('/:shortCode', async (req, res, next) => {
//   try {
//     const { shortCode } = req.params;

//     // Find the URL document by shortCode
//     const url = await Url.findOne({ shortCode });

//     if (!url) {
//       return res.status(404).send(`
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>404 - Short URL Not Found</title>
//           <style>
//             body { font-family: sans-serif; background: #0f0f1b; color: #f3f4f6; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
//             .container { text-align: center; background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); padding: 40px; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1); max-width: 400px; }
//             h1 { color: #ff4b4b; margin-top: 0; }
//             p { color: #9ca3af; line-height: 1.6; }
//             .btn { display: inline-block; margin-top: 20px; padding: 10px 20px; background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <h1>404</h1>
//             <h2>Link Not Found</h2>
//             <p>The short link you are trying to access does not exist or has expired.</p>
//             <a href="http://localhost:5173" class="btn">Go to Dashboard</a>
//           </div>
//         </body>
//         </html>
//       `);
//     }
//      // 🌟 ADD THESE TWO LOGS RIGHT HERE:
//     console.log("=== REDIRECT INTERCEPT DEBUG ===");
//     console.log("ShortCode Clicked:", shortCode);
//     console.log("Stored Password Hash in DB:", url.password);
//     console.log("Stored Expiration Date in DB:", url.expiresAt);
//     console.log("=================================");

//     // 🌟 CHECK 1: CHECK IF LINK EXCEEDED TIME LIMIT
//     if (url.expiresAt && new Date() > new Date(url.expiresAt)) {
//       return res.status(410).send(`
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//           <meta charset="UTF-8">
//           <title>Link Expired</title>
//           <style>
//             body { font-family: sans-serif; background: #080810; color: #f3f4f6; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
//             .card { text-align: center; background: #10101f; padding: 40px; border-radius: 16px; border: 1px solid rgba(239, 68, 68, 0.2); max-width: 400px; }
//             h1 { color: #ef4444; }
//           </style>
//         </head>
//         <body>
//           <div class="card">
//             <h1>⏳ Link Expired</h1>
//             <p>This shortened routing pathway has reached its scheduled expiration date and is no longer active.</p>
//           </div>
//         </body>
//         </html>
//       `);
//     }

//     // 🌟 CHECK 2: CHECK IF THE LINK IS PASSWORD LOCKED
//     if (url.password && url.password.trim() !== "") {
//       const frontendGateway = process.env.FRONTEND_URL || 'http://localhost:5173';
//       // Terminate redirection and send them directly to your RedirectGatewayPage UI!
//       return res.redirect(`${frontendGateway}/redirect-gateway/${shortCode}`);
//     }

//     // 🌟 NORMAL FLOW: (Executes ONLY if link is alive and has NO password)
//     url.clicks += 1;
//     url.lastVisited = new Date();
//     url.visits.push({ timestamp: new Date() });
//     await url.save();

//     // Redirect to original target URL
//     return res.redirect(302, url.originalUrl);
//   } catch (error) {
//     next(error);
//   }
// });

// // Global Error Handler Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     message: err.message || 'Internal Server Error',
//     error: process.env.NODE_ENV === 'production' ? {} : err.stack
//   });
// });

// // Listen
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
// });
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
