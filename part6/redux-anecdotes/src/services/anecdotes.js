const baseUrl = 'http://localhost:3000/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
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

  const response = await fetch(baseUrl, config)

  if (!response.ok) {
    throw new Error('Failed to create anecdotes')
  }

  return response.json()
}

export default { getAll, createNew }
