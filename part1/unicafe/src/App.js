import { useState } from 'react'

const Button = ({ handleClick, descr }) => (
  <button onClick={handleClick}>
    {descr}
  </button>
)

const Stat = ({ stat, num}) => (
  <p>{stat} <b>{num}</b></p>
)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h1>Give feedback</h1>
        <p>Please provide feedback on your meal</p>
        <Button handleClick={() => setGood(good +1)} descr={"Good"}/>
        <Button handleClick={() => setNeutral(neutral +1)} descr={"Neutral"}/>
        <Button handleClick={() => setBad(bad +1)} descr={"Bad"}/>
      </div>
      <div>
        <h1>Statistics</h1>
        <Stat stat={"Good"} num={good}/>
        <Stat stat={"Neutral"} num={neutral}/>
        <Stat stat={"Bad"} num={bad}/>
      </div>
      
    </div>
  )
}

export default App