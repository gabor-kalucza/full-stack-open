const Filter = ({ filterValue, setFilterValue }) => {
  return (
    <>
      <label htmlFor='filter'>filter shown with:</label>
      <input
        id='filter'
        type='text'
        placeholder='John Doe'
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      />
    </>
  )
}

export default Filter
