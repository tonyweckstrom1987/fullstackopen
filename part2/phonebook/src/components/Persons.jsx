const Person = ({ person, onDelete }) => (
  <p>
    {person.name} {person.number}
    <button onClick={onDelete}>delete</button>
  </p>
)

const Persons = ({ persons, onDelete }) => (
  <div>
    {persons.map((person) => (
      <Person key={person.name} person={person} onDelete={() => onDelete(person)} />
    ))}
  </div>
)

export default Persons



