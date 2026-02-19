const Total = ({ course: { parts } }) => {
  return (
    <p style={{ fontWeight: 'bold' }}>
      Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
    </p>
  )
}

export default Total
