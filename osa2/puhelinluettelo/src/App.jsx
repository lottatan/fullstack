import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import nameService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    nameService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const taken = persons.find(({ name }) => name === newName)
    if (taken) {
      if (window.confirm(window.confirm(`${newName} is already in phonebook, replace the old number with a new one?`))) {
        const newObject = {
          name: newName,
          number: newNumber,
          id: taken.id
        }
          nameService
          .update(taken.id, newObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== taken.id ? person : returnedPerson))
            setSuccessMessage(`${newName}'s number successfully updated`)
            setTimeout(() => {setSuccessMessage(null)}, 5000)
          })
          .catch(error => {
            setErrorMessage(`The name '${newName}' was already removed from server`)
            setTimeout(() => {setErrorMessage(null)}, 5000)
          setNewName('')
          setNewNumber('')
          })
      }
    }

    else {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      nameService
      .create(nameObject)
      .then(returnedName => {
        setPersons(persons.concat(returnedName))
        setSuccessMessage(`'${newName}' successfully added to phonebook!`)
        setTimeout(() => {setSuccessMessage(null)}, 5000)
        setNewName('')})
      .catch(error => {
        console.log(error.response.data)
        setErrorMessage(`${error.response.data.error}`)
        setTimeout(() => {setErrorMessage(null)}, 5000)
      })
      setNewName('')
      setNewNumber('')
    }
  }

  const deletePerson = (person) => {
    const dperson = person
    if (window.confirm(`Delete ${dperson.name}?`)) {
      nameService
      .deletePerson(person.id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== person.id))
          setSuccessMessage(`'${dperson.name}' successfully deleted from phonebook!`)
          setTimeout(() => {setSuccessMessage(null)}, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type= 'error' />
      <Notification message={successMessage} type= 'success' />

        <div>
        <Filter value={newFilter} onChange={handleFilterChange} />

        <h2>add a new</h2>
        <AddForm addName={addName} newName={newName} handleNameChange={handleNameChange}
                newNumber={newNumber} handleNumberChange={handleNumberChange} />
        </div>

      <h2>Numbers</h2>
      {filteredPersons.map(person => 
        <Person key={person.name} person={person} deleteperson={deletePerson}/> 
      )}
    </div>
  )

}

export default App

