const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

/**
 * Array of template headlines for SEO content generation
 * Uses {name} and {location} as placeholders
 */
const headlines = [
  "Why {name} is {location}'s Top Choice in 2025",
  "Best {name} in {location} - Award Winning Quality",
  "{location}'s Favorite {name} - Rated #1",
  "Discover {name} - {location}'s Hidden Gem",
  "Top-rated {name} serving {location} since 2020",
  "The Ultimate Guide to {name} in {location}",
  "{name}: {location}'s Premier Destination for Quality Service",
  "Experience Excellence at {name} in {location}"
];

/**
 * POST /business-data - Endpoint to fetch business data
 * @param {Object} req - Request object with business name and location
 * @param {Object} res - Response object
 */
app.post('/business-data', (req, res) => {
  try {
    const { name, location } = req.body;
    
    // Validate request body
    if (!name || !location) {
      return res.status(400).json({ 
        error: 'Both name and location are required' 
      });
    }

    // Generate random rating (3.5 to 5.0 with 1 decimal place)
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
    
    // Generate random review count (50 to 500)
    const reviews = Math.floor(Math.random() * 450) + 50;
    
    // Select random headline template
    const randomHeadline = headlines[
      Math.floor(Math.random() * headlines.length)
    ]
      .replace(/{name}/g, name)
      .replace(/{location}/g, location);

    // Return simulated business data
    res.json({
      rating: parseFloat(rating),
      reviews,
      headline: randomHeadline
    });

  } catch (error) {
    console.error('Error in /business-data:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

/**
 * GET /regenerate-headline - Endpoint to generate new SEO headline
 * @param {Object} req - Request object with query params (name and location)
 * @param {Object} res - Response object
 */
app.get('/regenerate-headline', (req, res) => {
  try {
    const { name, location } = req.query;
    
    // Validate query parameters
    if (!name || !location) {
      return res.status(400).json({ 
        error: 'Both name and location are required as query parameters' 
      });
    }

    // Select new random headline template
    const randomHeadline = headlines[
      Math.floor(Math.random() * headlines.length)
    ]
      .replace(/{name}/g, name)
      .replace(/{location}/g, location);

    // Return new headline
    res.json({ 
      headline: randomHeadline 
    });

  } catch (error) {
    console.error('Error in /regenerate-headline:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

/**
 * Error handling middleware
 */
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'An unexpected error occurred' 
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});