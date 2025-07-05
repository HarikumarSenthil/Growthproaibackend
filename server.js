const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// === Constants ===
const HEADLINE_TEMPLATES = [
  "Why {name} is {location}'s Sweetest Spot in 2025",
  "Top Reasons {location} Locals Love {name}",
  "Discover the Magic of {name} in {location}",
  "{name}: A Hidden Gem in {location}",
  "How {name} Became {location}'s Favorite Business"
];

// === Utility Functions ===
const getRandomNumber = (min, max, decimal = false) => {
  const num = Math.random() * (max - min) + min;
  return decimal ? parseFloat(num.toFixed(1)) : Math.floor(num);
};

const generateHeadline = (name, location) => {
  const template = HEADLINE_TEMPLATES[Math.floor(Math.random() * HEADLINE_TEMPLATES.length)];
  return template.replace('{name}', name).replace('{location}', location);
};

// === Routes ===

// POST /business-data
app.post('/business-data', (req, res) => {
  const { name, location } = req.body;

  if (!name || !location) {
    return res.status(400).json({ error: 'Business name and location are required' });
  }

  res.json({
    rating: getRandomNumber(3.0, 5.0, true),     
    reviews: getRandomNumber(50, 550),   
    headline: generateHeadline(name, location)
  });
});

// GET /regenerate-headline
app.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query;

  if (!name || !location) {
    return res.status(400).json({ error: 'Name and location query parameters are required' });
  }

  res.json({ headline: generateHeadline(name, location) });
});

// === Start Server ===
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
