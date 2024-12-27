export const fetchWeatherData = async () => {
  const url = "https://api.weatherapi.com/v1/current.json";
  const queryParams = new URLSearchParams({
    key: `${process.env.REACT_APP_WEATHER_KEY}`,
    q:`${process.env.REACT_APP_WEATHER_LOCATION}`
  }).toString();
  const response = await fetch(`${url}?${queryParams}`);
  const weatherData = await response.json();
  return weatherData;
};