import { useState } from 'react'
import Heading from './components/Heading'
import Button from './components/Button'
import Statistic from './components/Statistic'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increment = (type) => {
    switch (type) {
      case 'good':
        setGood((c) => c + 1)
        break
      case 'neutral':
        setNeutral((c) => c + 1)
        break
      case 'bad':
        setBad((c) => c + 1)
        break
      default:
        break
    }
  }

  return (
    <div>
      <Heading content='give feedback' />
      <div>
        <Button onClick={() => increment('good')}>good</Button>
        <Button onClick={() => increment('neutral')}>neutral</Button>
        <Button onClick={() => increment('bad')}>bad</Button>
      </div>
      <Heading content='statistics' level={2} />
      <Statistic name='good' count={good} />
      <Statistic name='neutral' count={neutral} />
      <Statistic name='bad' count={bad} />
    </div>
  )
}

export default App
