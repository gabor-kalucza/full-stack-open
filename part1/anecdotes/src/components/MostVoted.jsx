const MostVoted = ({ anecdote, votes }) => (
  <div>
    <h2>Anecdote with most votes</h2>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </div>
)

export default MostVoted
