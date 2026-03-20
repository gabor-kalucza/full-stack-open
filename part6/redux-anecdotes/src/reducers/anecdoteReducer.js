import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      const anecdote = state.find((a) => a.id === action.payload)
      if (anecdote) {
        anecdote.votes += 1
      }
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
  const newAnecdote = {
    id: getId(),
    votes: 0,
    content,
  }

  return async (dispatch) => {
    const anecdote = await anecdotesService.createNew(newAnecdote)
    dispatch(addAnecdote(anecdote))
  }
}

export const { incrementVote, setAnecdotes, addAnecdote } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
