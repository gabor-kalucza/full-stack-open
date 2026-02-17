import StatisticLine from './StatisticLine'

const Statistics = ({
  good,
  neutral,
  bad,
  average,
  positivePercentage,
  total,
}) => {
  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={total} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positivePercentage + ' %'} />
      </tbody>
    </table>
  )
}

export default Statistics
