import { useState } from 'react'

/**
 * Chooses a random index. Used for getting a random anecdote.
 * @param anCount The number of anecdotes the program contains 
 * @returns A number corresponding to an anecdote
 */
const chooseAnecdote = ( anCount ) => {
  return Math.floor(Math.random() * anCount )
}

/**
 * Renders a button.
 * @param handleClick A method that determines the button's function 
 * @returns A rendering of the button
 */
const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

/**
 * Renders an individual anecdote and its votes
 * @param text The anecdote itself
 * @param votes The number of votes received by the anecdote
 * @returns 
 */
 const Anecdote = ({text, votes}) => (
  <div>
    <p>{text}</p>
    <p>Has {votes} votes</p>
  </div>
 )

/**
 * Increases the number of votes of one anecdote
 * @param index Index of the anecdote being voted on
 * @param votes The array containing all votes
 * @returns The new array with the updated votes
 */
const increaseVote = (index, votes) => {
  const newList = [...votes]
  newList[index] += 1
  return newList
}

/**
 * Acts as the root of the application, and contains all anecdotes.
 */
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(chooseAnecdote(anecdotes.length))
  const [votes, addVote] = useState(Array(anecdotes.length).fill(0))

  return (
    <div>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]}/>
      <Button handleClick={() => addVote(increaseVote(selected, votes))} text={"Vote"}/>
      <Button handleClick={() => setSelected(chooseAnecdote(anecdotes.length))} text={"Next anecdote"}/>
    </div>
  )
}

export default App
