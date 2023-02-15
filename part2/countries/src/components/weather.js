const iconUrl = 'http://openweathermap.org/img/wn'

/**
 * Renders the weather information for a city.
 * @param weatherdata The weather information for the city
 * @returns A rendering of the data.
 */
const Weather = ({ weatherData }) => (
    <>
        <h3>Weather in {weatherData.name}</h3>
        <p>Temperature: {weatherData.main.temp} °C</p>
        <img src={`${iconUrl}/${weatherData.weather[0].icon}@2x.png`} />
        <p>Wind: {weatherData.wind.speed} m/s</p>
    </>
)

export default Weather