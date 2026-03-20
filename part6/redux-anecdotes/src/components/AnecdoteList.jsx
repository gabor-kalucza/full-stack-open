import { useDispatch, useSelector } from 'react-redux'
import { incrementVote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)

  const vote = (id) => {
    const anecdote = anecdotes.find((a) => a.id === id)
    console.log('vote', id)
    dispatch(incrementVote(id))
    dispatch(setNotification(`You voted '${anecdote.content}'`))
  }

  const filteredAnecdotes = anecdotes
    .filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
    .toSorted((a, b) => b.votes - a.votes)

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
