import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useNotifDispatch } from "../NotifContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotifDispatch()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: (error, query) => {
      dispatch({ type: 'SET', payload: error.response.data.error})
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({type: 'SET', payload: `anecdote '${content}' created`})
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
