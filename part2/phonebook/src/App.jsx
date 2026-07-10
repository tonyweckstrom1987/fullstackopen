import { useState } from 'react'
import Filter from './components/filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [newName, setNewName] = useState('')
  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState(initialPersons)
  const [newNumber, setNewNumber] = useState('')
  const addName = (event) => {
    event.preventDefault()

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(personObject))
setNewName('')
setNewNumber('')
  }

  const personsToShow = filter
    ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
    <Filter filter={filter} onChange={(event) => setFilter(event.target.value)} />


      <div>
<Persons persons={personsToShow} />

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
