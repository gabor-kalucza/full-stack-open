const Filter = ({ searchTerm, setSearchTerm }) => {
  return (
    <>
      <label htmlFor='filter'>filter shown with:</label>
      <input
        id='filter'
        type='text'
        placeholder='John Doe'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </>
  )
}

export default Filter
