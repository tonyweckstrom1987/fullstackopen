import { useState } from 'react'
import Filter from './components/filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useEffect } from 'react'
import axios from 'axios'
import Notification from './components/Notification'



const App = () => {
  const [newName, setNewName] = useState('')
  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
  event.preventDefault()

  const existingPerson = persons.find((person) => person.name === newName)

  if (existingPerson) {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const updatedPerson = { ...existingPerson, number: newNumber }

      axios
        .put(`http://localhost:3001/persons/${existingPerson.id}`, updatedPerson)
        .then((response) => {
          setPersons(persons.map((p) => (p.id !== existingPerson.id ? p : response.data)))
          setNotification({ message: `Updated ${response.data.name}`, type: 'success' })
          setTimeout(() => setNotification({ message: null, type: null }), 5000)
          setNewName('')
          setNewNumber('')
        })
    }
    return
  }

  const personObject = {
    name: newName,
    number: newNumber,
  }

  axios
    .post('http://localhost:3001/persons', personObject)
    .then((response) => {
      setPersons(persons.concat(response.data))
      setNotification({ message: `Added ${response.data.name}`, type: 'success' })
      setTimeout(() => setNotification({ message: null, type: null }), 5000)
      setNewName('')
      setNewNumber('')
    })
}

const deletePerson = (person) => {
  if (window.confirm(`Delete ${person.name}?`)) {
    axios
      .delete(`http://localhost:3001/persons/${person.id}`)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== person.id))
        setNotification({ message: `Deleted ${person.name}`, type: 'success' })
        setTimeout(() => setNotification({ message: null, type: null }), 5000)
      })
  }
}

  const personsToShow = filter
    ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (

    <div>
      <Notification message={notification.message} type={notification.type} />

    <Filter filter={filter} onChange={(event) => setFilter(event.target.value)} />


      <div>
<Persons persons={personsToShow} onDelete={deletePerson} />

        <PersonForm
          onSubmit={addName}
          newName={newName}
          onNameChange={(event) => setNewName(event.target.value)}
          newNumber={newNumber}
          onNumberChange={(event) => setNewNumber(event.target.value)}
        />


      </div>
    </div>
  )
}
const initialPersons = [
  { name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-44-5323523' },
  { name: 'Dan Abramov', number: '12-43-234345' },
]




export default App
