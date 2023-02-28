import axios from "axios"

const baseUrl = '/api/persons'

/**
 * Retrieves data from the server
 * @returns The information of the people saved in the server
 */
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

/**
 * Adds a new person to the serverside data
 * @param newPerson The object containing the information to be added 
 * @returns The added object
 */
const addPerson = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

/**
 * Deletes a person from the server
 * @param personId The id of the person being deleted
 */
const removePerson = personId => {
    const deletionUrl = `${baseUrl}/${personId}`
    const request = axios.delete(deletionUrl)
    return request.then(response => response.data)
}

/**
 * Updates the information of a person
 * @param newData The object containing the updated information
 * @param id The id of the person
 * @returns The updated object
 */
const updatePerson = (newData, id) => {
    const editUrl = `${baseUrl}/${id}`
    const request = axios.put(editUrl, newData)
    return request.then(response => response.data)
}

export default { getAll, addPerson, removePerson, updatePerson }