import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'


const Notification = ({ message, notifType}) => {
  if (message === null) {
    return null
  }
  return (
    <div className='notification'>
      {message}
    </div>
  )
}

/**
 * Renders the filtering
 * @param currFilter The substring being used in filtering
 * @param filterChange A function specifying what happens when the filter changes 
 * @returns A rendering of the filter form
 */
const Filter = ({currFilter, filterChange}) => (
  <form>
    <div>
      Filter shown with:
      <input
        value={currFilter}
        onChange={filterChange}
      />
    </div>
  </form>
)

/**
 * Renders the form used for adding people
 * @param onSubmit A function determining what happens once the form is submitted
 * @param newName The name that is being added to the phonebook
 * @param onNameChange A function determining what happens when the name input changes
 * @param newNumber The number that is being added to the phonebook
 * @param onNumberChange A function determining what happens when the number input changes
 * @returns The rendering of the form
 */
const PersonCreation = ({onSubmit, newName, onNameChange, newNumber, onNumberChange}) => (
  <form onSubmit={onSubmit}>
    <div>
      Name:
      <input
        value={newName}
        onChange={onNameChange}
      />
    </div>
    <div>
      Number:
      <input 
        value={newNumber}
        onChange={onNumberChange}
      />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
)

/**
 * Renders singular people
 * @param name The name of the person
 * @param number The phone number of the person
 * @returns A rendering of the personal information
 */
const Person = ({name, id, number, action}) => (
  <div>
    <span>{name} {number}</span><button onClick={() => action(name, id)}>Delete</button>
  </div>
)

/**
 * Renders the list of people
 * @param people The people being rendered (those who match the filter)
 * @returns A rendering of the list of people
 */
const PersonList = ({people, action}) => (
  <>
    {people.map(person => 
      <Person key={person.id} name={person.name} number={person.number} id={person.id} action={action} />
    )}
  </>
)

/**
 * Acts as the root of the application, and stores the states and event handlers
 */
const App = () => {
  //Data
  const [persons, setPersons] = useState([]) 

  //States
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [currFilter, setFilter] = useState('')
  const [notificationMsg, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(basePpl => {
        setPersons(basePpl)
      })
  }, [])

 /**
  * Handles the addition of a new person. If the added name is already in the phonebook,
  * the user can choose to update their phone number. 
  */
  const addPerson = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName)) {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const toUpdate = persons.find(person => person.name === newName)
        updateNumber(toUpdate)
      }
    } else {
      const newPerson = {
        name: newName, 
        number: newNumber
      }
      personService
        .addPerson(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName("")
          setNewNumber('')
          updateNotification(`Added ${createdPerson.name}`)
        })
    }
  }

  /**
   * Updates the phone number of a person
   * @param origData The original information of the person
   */
  const updateNumber = (origData) => {
    const changedPerson = { ...origData, number: newNumber}
    personService
      .updatePerson(changedPerson, origData.id)
      .then(updatedPerson => {
        setPersons(persons.map(person => person.id !== changedPerson.id ? person : updatedPerson))
        setNewName("")
        setNewNumber("")
        updateNotification(`Changed the number of ${updatedPerson.name}`)
      })
      .catch(() => {
        alert(`${changedPerson.name} was already deleted`)
        setPersons(persons.filter(person => person.id !== changedPerson.id))
      })
  }

  /**
   * Removes a person. A person is only deleted if the user confirms 
   * the deletion
   * @param name Name of the person being deleted
   * @param id Id ~.~
   */
  const removePerson = (name, id) => {
    if (window.confirm(`Delete ${name}`)) {
      personService.removePerson(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  const updateNotification = (msg) => {
    setNotification(msg)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  //Event handlers, all update their respective values
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMsg} />
      <Filter currFilter={currFilter} filterChange={handleFilterChange} />
      <h3>Add a new person</h3>
      <PersonCreation onSubmit={addPerson} onNameChange={handleNameChange} onNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h3>Numbers</h3>
      <PersonList people={persons.filter(person => person.name.toLowerCase().includes(currFilter.toLowerCase()))} action={removePerson} />
    </div>
  )
}

export default App
