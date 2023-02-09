import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [currFilter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName)) {
      return (
        alert(`${newName} is already added to phonebook`)
      )
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName("")
      setNewNumber('')
    }
  }

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
      <form>
        <div>
          Filter shown with: 
          <input
            value={currFilter}
            onChange={handleFilterChange}
          />
        </div>
      </form>
      <h3>Add a new person</h3>
      <form onSubmit={addPerson}>
        <div>
          Name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          Number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      {persons.filter(person => person.name.toLowerCase().includes(currFilter.toLowerCase())).map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App
