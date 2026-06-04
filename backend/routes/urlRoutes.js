const express = require('express');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const Url = require('../models/Url');
const bcrypt = require('bcryptjs');
const router = express.Router();

// ─── Helpers ────────────────────────────────────────────────

const generateShortCode = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const normalizeUrl = (url) => {
  if (!url) return '';
  let trimmed = url.trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = 'http://' + trimmed;
  }
  return trimmed;
};

const isValidUrl = (string) => {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
};

// ─── Routes ─────────────────────────────────────────────────

// @route   POST /api/urls/bulk
// @desc    Bulk URL shortening via CSV text
// @access  Private
// ✅ MOVED TO TOP — prevents conflict with /:shortCode routes
router.post(
  '/bulk',
  authMiddleware,
  [
    body('csvData', 'CSV data is required').notEmpty()
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { csvData } = req.body;
      const lines = csvData.split(/\r?\n/);
      const urlsToInsert = [];
      const failed = [];

      for (let index = 0; index < lines.length; index++) {
        let line = lines[index].trim();

        // Skip empty lines or header rows
        if (
          !line ||
          line.toLowerCase().startsWith('url') ||
          line.toLowerCase().startsWith('originalurl')
        ) {
          continue;
        }

        // Take first column if CSV has multiple columns
        const firstCol = line.split(',')[0].trim().replace(/^["']|["']$/g, '');
        if (!firstCol) continue;

        const normalized = normalizeUrl(firstCol);

        if (isValidUrl(normalized)) {
          // Generate unique short code
          let shortCode = generateShortCode();
          let exists = await Url.findOne({ shortCode });
          while (exists) {
            shortCode = generateShortCode();
            exists = await Url.findOne({ shortCode });
          }

          urlsToInsert.push({
            originalUrl: normalized,
            shortCode,
            userId: req.user.userId,
            visits: []
          });
        } else {
          failed.push({
            lineNum: index + 1,
            data: line,
            error: 'Invalid URL format'
          });
        }
      }

      if (urlsToInsert.length === 0) {
        return res.status(400).json({
          message: 'No valid URLs found in the provided CSV data.',
          failed
        });
      }

      const insertedUrls = await Url.insertMany(urlsToInsert);

      res.status(201).json({
        message: `Successfully shortened ${insertedUrls.length} URLs.`,
        inserted: insertedUrls,
        failed
      });
    } catch (error) {
      next(error);
    }
  }
);

// @route   POST /api/urls
// @desc    Create a shortened URL
// @access  Private
router.post(
  '/',
  authMiddleware,
  [
    body('originalUrl', 'Original URL is required').notEmpty()
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let { originalUrl, password, expiresAt } = req.body;
      originalUrl = normalizeUrl(originalUrl);

      if (!isValidUrl(originalUrl)) {
        return res.status(400).json({
          message: 'Invalid URL format. Must be a valid HTTP or HTTPS address.'
        });
      }

      // Generate unique short code
      let shortCode = generateShortCode();
      let exists = await Url.findOne({ shortCode });
      while (exists) {
        shortCode = generateShortCode();
        exists = await Url.findOne({ shortCode });
      }
          // Package your schema parameters structure model values cleanly
      const urlData = {
        originalUrl,
        shortCode,
        userId: req.user.userId,
        expiresAt: expiresAt ? new Date(expiresAt) : null
      };
      // Safe cryptographical password hashing processing gate
      if (password && password.trim() !== '') {
        const salt = await bcrypt.genSalt(10);
        urlData.password = await bcrypt.hash(password, salt);
      }
      const newUrl = new Url(urlData);

      const savedUrl = await newUrl.save();
      res.status(201).json(savedUrl);
    } catch (error) {
      next(error);
    }
  }
);

// @route   GET /api/urls
// @desc    Get all shortened URLs for authenticated user
// @access  Private
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const urls = await Url.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/urls/:shortCode/analytics
// @desc    Get analytics for a specific short URL
// @access  Private
router.get('/:shortCode/analytics', authMiddleware, async (req, res, next) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    // Verify ownership
    if (url.userId.toString() !== req.user.userId) {
      return res.status(403).json({
        message: 'Not authorized to view these analytics'
      });
    }

    res.json(url);
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/urls/:id
// @desc    Edit the original URL
// @access  Private
router.put(
  '/:id',
  authMiddleware,
  [
    body('originalUrl', 'Original URL is required').notEmpty()
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let { originalUrl } = req.body;
      originalUrl = normalizeUrl(originalUrl);

      if (!isValidUrl(originalUrl)) {
        return res.status(400).json({
          message: 'Invalid URL format. Must be a valid HTTP or HTTPS address.'
        });
      }

      const url = await Url.findById(req.params.id);
      if (!url) {
        return res.status(404).json({ message: 'URL not found' });
      }

      // Verify ownership
      if (url.userId.toString() !== req.user.userId) {
        return res.status(403).json({
          message: 'Not authorized to modify this URL'
        });
      }

      url.originalUrl = originalUrl;
      await url.save();

      res.json(url);
    } catch (error) {
      next(error);
    }
  }
);

// @route   DELETE /api/urls/:id
// @desc    Delete a shortened URL
// @access  Private
router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const url = await Url.findById(req.params.id);

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    // Verify ownership
    if (url.userId.toString() !== req.user.userId) {
      return res.status(403).json({
        message: 'Not authorized to delete this URL'
      });
    }

    await Url.findByIdAndDelete(req.params.id);
    res.json({ message: 'URL successfully deleted', id: req.params.id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;