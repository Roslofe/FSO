import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5'

/**
 * Fetches weather data from the api
 * @param city The name of a city
 * @returns An object containing the data
 */
const getWeatherData = (city) => {
    const request = axios.get(`${baseUrl}/weather?q=${city.replaceAll(' ', '+')}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
        
}

export default {getWeatherData}