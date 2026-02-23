const Persons = ({ persons, searchTerm }) => {
  return (
    <>
      {persons &&
        persons
          .filter((p) =>
            p.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
          )
          .map((p) => (
            <div key={p.id}>
              {p.name} {p.number}
            </div>
          ))}
    </>
  )
}

export default Persons
