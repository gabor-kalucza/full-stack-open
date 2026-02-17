const Statistic = ({ name, count, needsPercentage = false }) => {
  return (
    <p>
      {name} {count} {needsPercentage ? '%' : ''}
    </p>
  )
}

export default Statistic
