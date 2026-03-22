import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateVote(state, action) {
      const updated = action.payload
      return state.map((a) => (a.id === updated.id ? updated : a))
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(_, action) {
      return action.payload
    },
  },
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = {
      content,
      votes: 0,
    }

    const createdAnecdote = await anecdotesService.createNew(newAnecdote)

    dispatch(addAnecdote(createdAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    const returnedAnecdote = await anecdotesService.update(
      anecdote.id,
      updatedAnecdote,
    )

    dispatch(updateVote(returnedAnecdote))
  }
}

export const { setAnecdotes, addAnecdote, updateVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
