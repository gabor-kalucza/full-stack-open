const Persons = ({ persons, filterValue }) => {
  return (
    <>
      {persons
        .filter((p) =>
          p.name.toLowerCase().includes(filterValue.toLocaleLowerCase()),
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
