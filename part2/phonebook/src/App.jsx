import { useState } from 'react'

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
      <div>
        filter shown with: <input value={filter} onChange={(event) => setFilter(event.target.value)} />
      </div>

      <div>
        {personsToShow.map((person) => (
<p key={person.name}>{person.name} {person.number}</p>
        ))}
        <form onSubmit={addName}>
          <div>
            name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
          <div>
  number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
</div>

        </form>
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
