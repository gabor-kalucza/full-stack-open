import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdotesService from '../services/anecdotes'
import { useNotification } from '../context/NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.createNew,
    onSuccess: (newAnecdote) => {
      setNotification(`created '${newAnecdote.content}'`, 5)
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      setNotification(error.message, 5)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
