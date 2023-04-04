import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const toVote = state.find(a => a.id === id)
      const afterVote = {...toVote, votes: toVote.votes + 1}
      return state.map(a => a.id !== id ? a : afterVote)
    },
    addAnecdote(state, action) {
      const content = action.payload
      //const newAnecdote = asObject(content)
      return [...state, content]
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})
export const { vote, addAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer