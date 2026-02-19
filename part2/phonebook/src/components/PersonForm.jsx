const PersonForm = ({ handleSubmit, formData, handleChange }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          name:{' '}
          <input
            required
            value={formData.name}
            onChange={handleChange}
            name='name'
          />
        </div>
        <div>
          number:{' '}
          <input
            required
            value={formData.number}
            onChange={handleChange}
            name='number'
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm
