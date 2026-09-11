const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = process.env.WEATHER_API_BASE_URL || 'https://api.openweathermap.org/data/2.5';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes

/**
 * Get current weather for a city
 * GET /api/weather/current?city=London
 */
app.get('/api/weather/current', async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching current weather:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      details: error.message 
    });
  }
});

/**
 * Get weather forecast for a city
 * GET /api/weather/forecast?city=London
 */
app.get('/api/weather/forecast', async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching forecast:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch forecast data',
      details: error.message 
    });
  }
});

/**
 * Get weather by coordinates
 * GET /api/weather/coordinates?lat=51.5074&lon=-0.1278
 */
app.get('/api/weather/coordinates', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude parameters are required' });
    }

    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      details: error.message 
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Weather API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Weather Dashboard API running on http://localhost:${PORT}`);
});
