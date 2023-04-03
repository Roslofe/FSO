import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { displayMessage, resetMessage } from '../reducers/notificationReducer'

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

  const click = (id) => {
    const toVoteFor = anecdotes.find(a => a.id === id)
    dispatch(vote(id))
    dispatch(displayMessage(`you voted for '${toVoteFor.content}'`))
    setTimeout(() => {
      dispatch(resetMessage())
    }, 5000)
  }
  
  return (
    <div>
      {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => click(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </div>
    
  )
}

export default AnecdoteList