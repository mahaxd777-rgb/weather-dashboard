# Weather Dashboard 🌤️

A modern, responsive weather dashboard that fetches real-time weather data from the OpenWeatherMap API. Get current weather conditions and 5-day forecasts for any city in the world.

## Features

✨ **Current Weather Display**
- Real-time temperature, feels-like temperature, and weather conditions
- Humidity, wind speed, pressure, and visibility
- Weather icon visualization

📅 **5-Day Forecast**
- Daily weather predictions
- Temperature trends
- Weather conditions and humidity

🌍 **Multiple Search Options**
- Search by city name
- Use geolocation for automatic location detection
- Responsive design for mobile and desktop

🎨 **Modern UI**
- Beautiful gradient background
- Smooth animations and transitions
- Card-based layout
- Mobile-responsive design

## Tech Stack

**Backend:**
- Node.js
- Express.js
- Axios (for HTTP requests)
- CORS support

**Frontend:**
- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript (ES6+)
- OpenWeatherMap API

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key (free tier available)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mahaxd777-rgb/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get an API key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your OpenWeatherMap API key:
   ```
   WEATHER_API_KEY=your_api_key_here
   WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5
   PORT=3000
   NODE_ENV=development
   ```

## Running the Application

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Get Current Weather
```
GET /api/weather/current?city=London
```

### Get Weather Forecast
```
GET /api/weather/forecast?city=London
```

### Get Weather by Coordinates
```
GET /api/weather/coordinates?lat=51.5074&lon=-0.1278
```

### Health Check
```
GET /api/health
```

## Usage

1. Open the application in your browser
2. Enter a city name in the search box and click "Search"
3. Alternatively, click the location icon (📍) to use your current location
4. View current weather conditions and the 5-day forecast

## Project Structure

```
weather-dashboard/
├── public/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # Stylesheet
│   └── app.js              # Frontend JavaScript
├── server.js               # Express server
├── package.json            # Project dependencies
├── .env.example            # Example environment variables
├── .gitignore              # Git ignore file
└── README.md               # This file
```

## Features in Detail

### Current Weather
- City name and country code
- Large temperature display
- Weather condition with icon
- Feels-like temperature
- Humidity percentage
- Wind speed
- Atmospheric pressure
- Visibility distance

### 5-Day Forecast
- Daily forecast cards
- High/low temperatures
- Weather conditions
- Humidity levels
- Weather icons

### Geolocation
- Browser-based location detection
- Automatic weather fetch for current location
- Fallback error handling

## Error Handling

- City not found validation
- Network error messages
- Geolocation permission handling
- User-friendly error notifications

## Customization

### Change Temperature Unit
In `server.js`, modify the `units` parameter:
```javascript
params: {
  q: city,
  appid: API_KEY,
  units: 'metric'  // Change to 'imperial' for Fahrenheit
}
```

### Modify Forecast Days
In `public/app.js`, adjust the slice value:
```javascript
forecastList.slice(0, 5)  // Change 5 to desired number of days
```

## Performance Optimization

- Lazy loading of images
- CSS Grid for efficient layouts
- Minified production builds
- Efficient API calls

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

**Issue: API key error**
- Verify your API key is correct in `.env`
- Check that your OpenWeatherMap account is active
- Ensure you have API calls remaining (check your usage)

**Issue: CORS errors**
- Make sure the backend server is running
- Check that the frontend is accessing the correct API URL
- Verify CORS is enabled in server.js

**Issue: Geolocation not working**
- Check browser permissions for location access
- Ensure the page is loaded via HTTPS (required for geolocation)
- Try clearing browser cache and cookies

## Future Enhancements

- [ ] Multiple city comparison
- [ ] Weather alerts and warnings
- [ ] Historical weather data
- [ ] Hourly forecast
- [ ] Weather charts and graphs
- [ ] Dark mode toggle
- [ ] Local storage for favorites
- [ ] Unit conversion (Celsius/Fahrenheit)
- [ ] Air quality index display
- [ ] Weather maps integration

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues, questions, or suggestions, please open a GitHub issue.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org)
- Icons and design inspiration from modern web design practices

---

**Made with ❤️ by mahaxd777-rgb**
