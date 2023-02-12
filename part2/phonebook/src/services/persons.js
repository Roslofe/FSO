import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

/**
 * Retrieves data from the server
 * @returns The information of the people saved in the server
 */
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPerson = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

export default { getAll, addPerson }