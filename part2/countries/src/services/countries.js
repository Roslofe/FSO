import axios from "axios"

const baseUrl = 'https://restcountries.com/v3.1'

/**
 * Fetches all the country information from the api
 * @returns An object containing all country data
 */
const getCountries = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

export default { getCountries}