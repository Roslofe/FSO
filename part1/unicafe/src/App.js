import { useState } from 'react'

/**
 * 
 * @param g The number of good reviews 
 * @param n ~.~ neutral reviews
 * @param b ~.~ bad reviews
 * @returns The total number of reviews
 */
const calculateTotal = (g, n, b) => {
  const sum = g + n + b
  return sum
}

/**
 * Calculates the average of the reviews. Good reviews have a weight of 1,
 * neutral have the weight 0, and bad -1
 * @param g The number of good reviews 
 * @param n ~.~ neutral reviews
 * @param b ~.~ bad reviews
 * @returns The average of the given reviews
 */
const calculateAvg = (g, n, b) => {
  const sum = calculateTotal(g, n, b)
  if (sum != 0 ) {
    const avg = (g * 1 + b * -1) / sum
    return avg
  } else {
    return 0
  }
}

/**
 * Calculates the percentage of positive reviews
 * @param g Number of positive reviews
 * @param total Total number of reviews 
 * @returns 
 */
const calculatePos = (g, total) => {
  if (g != 0) {
    const ratio = g / total
    const percent = String(ratio * 100)
    return percent.concat("%")
  } else {
    return "0%"
  }
  
}

/**
 * Renders buttons for providing feedback
 * @returns The rendering of a button
 */
const Button = ({ handleClick, descr }) => (
  <button onClick={handleClick}>
    {descr}
  </button>
)

/**
 * Renders the statistics 
 * @returns The description and value of the statistic
 */
const Stat = ({ stat, num}) => (
  <p>{stat} <b>{num}</b></p>
)

const Statistics = ({g, n, b}) => {
  return (
    <div>
      <h1>Statistics</h1>
          <Stat stat={"Good"} num={g}/>
          <Stat stat={"Neutral"} num={n}/>
          <Stat stat={"Bad"} num={b}/>
          <Stat stat={"All"} num={calculateTotal(g, n, b)} />
          <Stat stat={"Average"} num={calculateAvg(g, n, b)} />
          <Stat stat={"Positive"} num={calculatePos(g, calculateTotal(g, n, b))} />
    </div>
  )
}

/**
 * The root of the application
 */
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
      <Statistics g={good} n={neutral} b={bad} />
    </div>
  )
}

export default App