import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    const allAnecdotes = [...state.anecdotes].sort((a, b) => b.votes - a.votes)
    if (state.filter === "") {
      return allAnecdotes
    } else {
      return allAnecdotes.filter(a => a.content.includes(state.filter))
    }
  })
  
  return (
    <div>
      {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
        </div>
      </div>
    )}
    </div>
    
  )
}

export default AnecdoteList