import { useState } from 'react'

const App = () => {
  const [newName, setNewName] = useState('')
  const [persons, setPersons] = useState(initialPersons)
const addName = (event) => {
  event.preventDefault()

  if (persons.some((person) => person.name === newName)) {
    alert(`${newName} is already added to phonebook`)
    return
  }

  const personObject = {
    name: newName,
  }

  setPersons(persons.concat(personObject))
  setNewName('')
}

  return (
    <div>
{persons.map((person) => (
<p key={person.name}>{person.name}</p>
))}
<form onSubmit={addName}>
  <div>
    name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>


    </div>
  )
}
const initialPersons = [
  { name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-44-5323523' },
  { name: 'Dan Abramov', number: '12-43-234345' },
]




export default App
