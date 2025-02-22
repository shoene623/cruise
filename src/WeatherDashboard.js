import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState({
    capeCanaveral: null,
    nassau: null,
    cocoCay: null,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const apiKey = 'a1b93be11687fdd5c6b7e3a542af7c7c';
      const capeCanaveralResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=28.396837&lon=-80.605659&appid=${apiKey}&units=imperial`
      );
      const nassauResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=25.059999&lon=-77.345001&appid=${apiKey}&units=imperial`
      );
      const cocoCayResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=25.817000&lon=-77.936000&appid=${apiKey}&units=imperial`
      );

      setWeatherData({
        capeCanaveral: capeCanaveralResponse.data,
        nassau: nassauResponse.data,
        cocoCay: cocoCayResponse.data,
      });

      setError('');
    } catch (err) {
      console.error(err);
      setError('Error fetching weather data');
      setWeatherData({
        capeCanaveral: null,
        nassau: null,
        cocoCay: null,
      });
    }
  };

  return (
    <div className="weather-dashboard">
      <h1>Weather Dashboard - Shows current weather until 5 days before cruise</h1>
      {error && <p className="error">{error}</p>}
      <div className="weather-info">
        {weatherData.capeCanaveral && (
          <div>
            <h2>Cape Canaveral, Florida, USA (March 7th)</h2>
            <p>Temperature: {weatherData.capeCanaveral.main.temp} °F</p>
            <p>Humidity: {weatherData.capeCanaveral.main.humidity} %</p>
            <p>Weather: {weatherData.capeCanaveral.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.capeCanaveral.weather[0].icon}.png`}
              alt="weather icon"
            />
          </div>
        )}
        {weatherData.nassau && (
          <div>
            <h2>Nassau, New Providence, The Bahamas (March 8th)</h2>
            <p>Temperature: {weatherData.nassau.main.temp} °F</p>
            <p>Humidity: {weatherData.nassau.main.humidity} %</p>
            <p>Weather: {weatherData.nassau.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.nassau.weather[0].icon}.png`}
              alt="weather icon"
            />
          </div>
        )}
        {weatherData.cocoCay && (
          <div>
            <h2>Perfect Day at CocoCay, Berry Islands, The Bahamas (March 9th)</h2>
            <p>Temperature: {weatherData.cocoCay.main.temp} °F</p>
            <p>Humidity: {weatherData.cocoCay.main.humidity} %</p>
            <p>Weather: {weatherData.cocoCay.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.cocoCay.weather[0].icon}.png`}
              alt="weather icon"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;