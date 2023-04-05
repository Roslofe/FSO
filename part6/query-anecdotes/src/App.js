import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation, QueryClient } from 'react-query'
import { getAnecdotes, vote } from './requests'
import { useNotifDispatch } from './NotifContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotifDispatch()

  const newAnecdoteMutation = useMutation(vote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    const updated = {...anecdote, votes: anecdote.votes + 1}
    newAnecdoteMutation.mutate(updated)
    dispatch({ type: 'SET', payload: `anecdote '${updated.content}' voted`})
  }

  const result = useQuery(
    'anecdotes',
    getAnecdotes,
    {
      retry: 1,
      refetchOnWindowFocus: false
    }
  )
  console.log(result)
  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
