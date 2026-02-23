const Persons = ({ persons, searchTerm, handleRemovePerson }) => {
  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      {persons &&
        filteredPersons.map((p) => (
          <div key={p.id}>
            {p.name} {p.number}
            <button onClick={() => handleRemovePerson(p.id)}>delete</button>
          </div>
        ))}
    </>
  )
}

export default Persons
