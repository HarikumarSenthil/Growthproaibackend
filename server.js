const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// === Constants ===
const HEADLINE_TEMPLATES = [
  // Original templates
  "Why {name} is {location}'s Sweetest Spot in 2025",
  "Top Reasons {location} Locals Love {name}",
  "Discover the Magic of {name} in {location}",
  "{name}: A Hidden Gem in {location}",
  "How {name} Became {location}'s Favorite Business",
  
  // Creative story-driven templates
  "The Story Behind {location}'s Most Beloved {name}",
  "From Dream to Reality: {name}'s Journey in {location}",
  "What Makes {name} the Heart of {location}",
  "Inside {location}'s Best-Kept Secret: {name}",
  "The Day {location} Fell in Love with {name}",
  
  // Community-focused templates
  "{name}: Where {location} Comes Together",
  "How {name} is Changing the Game in {location}",
  "{location}'s Rising Star: The {name} Story",
  "Why Everyone in {location} is Talking About {name}",
  "The Local Legend: {name} in {location}",
  
  // Experience-driven templates
  "Step Inside {location}'s Most Unforgettable {name}",
  "What Happens When You Visit {name} in {location}",
  "The {name} Experience That's Taking {location} by Storm",
  "Why {name} Should Be Your Next Stop in {location}",
  "A Day at {name}: {location}'s Premier Destination",
  
  // Emotional/lifestyle templates
  "How {name} Brings Joy to {location} Every Day",
  "The Place {location} Calls Home: {name}",
  "Where {location} Memories Are Made: {name}",
  "The {name} That Stole {location}'s Heart",
  "Why {name} Feels Like Family in {location}",
  
  // Trendy/modern templates
  "{name}: The {location} Hotspot Everyone's Obsessing Over",
  "This {location} Business is Breaking the Internet: {name}",
  "Why {name} is {location}'s Most Instagrammable Spot",
  "The {name} Revolution Taking Over {location}",
  "Meet {location}'s Newest Obsession: {name}",
  
  // Quality/expertise focused
  "The Craft Behind {location}'s Finest {name}",
  "Why {name} Sets the Standard in {location}",
  "The Art of Excellence: {name} in {location}",
  "Mastering the Trade: {name}'s {location} Success Story",
  "The Quality That Makes {name} {location}'s Go-To",
  
  // Seasonal/timely templates
  "The {name} That's Perfect for {location}'s 2025 Vibe",
  "Why 2025 is the Year of {name} in {location}",
  "The {location} Trend That Started with {name}",
  "How {name} is Shaping {location}'s Future",
  "The Next Chapter: {name}'s Impact on {location}",
  
  // Question-based templates
  "What's the Secret Behind {location}'s Famous {name}?",
  "Why Do {location} Locals Keep Coming Back to {name}?",
  "What Makes {name} Different from Every Other Business in {location}?",
  "Is {name} Really {location}'s Best Business? We Found Out",
  "What's All the Fuss About {name} in {location}?",
  
  // Local pride templates
  "Proudly {location}: The {name} That Represents Us",
  "Born and Raised in {location}: The {name} Story",
  "{location} Strong: How {name} Supports Our Community",
  "The {name} That Makes {location} Proud",
  "Local Love: Why {location} Champions {name}"
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
