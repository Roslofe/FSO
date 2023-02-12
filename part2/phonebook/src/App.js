import { useState, useEffect } from 'react'
import personService from './services/persons'

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

  useEffect(() => {
    personService
      .getAll()
      .then(basePpl => {
        setPersons(basePpl)
      })
  }, [])

  /**
   * Handles the creation of a new person 
   * @returns An alert if the name is already in use, otherwise nothing
   */
  const addPerson = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName)) {
      return (
        alert(`${newName} is already added to phonebook`)
      )
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
        })
    }
  }

  const removePerson = (name, id) => {
    if (window.confirm(`Delete ${name}`)) {
      personService.removePerson(id)
      setPersons(persons.filter(person => person.id !== id))
    }
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
      <Filter currFilter={currFilter} filterChange={handleFilterChange} />
      <h3>Add a new person</h3>
      <PersonCreation onSubmit={addPerson} onNameChange={handleNameChange} onNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h3>Numbers</h3>
      <PersonList people={persons.filter(person => person.name.toLowerCase().includes(currFilter.toLowerCase()))} action={removePerson} />
    </div>
  )
}

export default App
