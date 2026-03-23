const BASE_URL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(BASE_URL)
  if (!response.ok) {
    throw new Error('anecdote service not available due to problems in server')
  }

  return response.json()
}

const createNew = async (anecdote) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(anecdote),
  }

  const response = await fetch(BASE_URL, config)
  if (!response.ok) {
    throw new Error('something went wrong')
  }

  return response.json()
}

const update = async (anecdote) => {
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...anecdote,
      votes: anecdote.votes + 1,
    }),
  }

  const response = await fetch(`${BASE_URL}/${anecdote.id}`, config)

  if (!response.ok) {
    throw new Error('something went wrong')
  }

  return response.json()
}

export default { getAll, createNew, update }
