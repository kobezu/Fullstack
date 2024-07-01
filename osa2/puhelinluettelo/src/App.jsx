import { useState, useEffect } from 'react'
import personsService from './services/personsService'

const notiStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const errorStyle = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const Message = ({message, style}) => {
  if (message === null) {
    return null
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

const Filter = ({filter, handleChange}) => {
  return(
    <form>
      <div>
        filter shown with: <input
          value={filter}
          onChange={handleChange}/>
      </div>
    </form>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.setNewPerson}>
      <div>
        name: <input 
          value={props.name}
          onChange={props.handleNameChange}/>
      </div>
      <div>
        number: <input 
          value={props.number}
          onChange={props.handleNumberChange}/>
      </div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Persons = ({persons, nameFilter, removePerson}) => {
  const filtered = persons.filter(person =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  )
  return(
    <div>{filtered.map(person =>
      <div key={person.id}>
        {person.name} {person.number} 
        <button type="remove" onClick={() => removePerson(person)}>
          delete
        </button>
      </div>
    )}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNameFilter(event.target.value)

  const displayNotification = (text) => {
    setNotification(text)
    setTimeout(() => setNotification(null), 5000)
  }

  const displayError = (text) => {
    setError(text)
    setTimeout(() => setError(null), 5000)
  }

  const setNewPerson = (event) => {
    event.preventDefault()
    if(persons.some(p => p.name === newName)){
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(p => p.name === newName)
        personsService
          .changeNumber(person, newNumber)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : updatedPerson))
            displayNotification(`Number changed for ${person.name}`)})
          .catch(error => {
            displayError(`Information of ${person.name} has already been removed from server`)
          })
      }
    }
    else{
      const personObject = {
        name : newName,
        number : newNumber
      }
      personsService
        .create(personObject)
        .then(person => {
          setPersons(persons.concat(person))
          displayNotification(`Added ${person.name}`)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (person) => {
    if (confirm(`Delete ${person.name}`)) {
      personsService
        .remove(person.id)
        .then(
          updatedPersons => {
          setPersons(updatedPersons)
          displayNotification(`Removed ${person.name}`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={error} style={errorStyle}/>
      <Message message={notification} style={notiStyle}/>
      <Filter filter={nameFilter} handleChange={handleFilterChange}/>

      <h2>add a new</h2>
      <PersonForm 
        setNewPerson={setNewPerson}
        name={newName} handleNameChange={handleNameChange}
        number={newNumber} handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        nameFilter={nameFilter} 
        removePerson={removePerson}
      />
    </div>
  )

}

export default App