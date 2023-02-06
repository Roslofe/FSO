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
  if (sum !== 0 ) {
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
  if (g !== 0) {
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
const StatisticLine = ({ text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({g, n, b}) => {
  if (g === 0 && n === 0 && b === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback yet</p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine text={"Good"} value={g}/>
            <StatisticLine text={"Neutral"} value={n}/>
            <StatisticLine text={"Bad"} value={b}/>
            <StatisticLine text={"All"} value={calculateTotal(g, n, b)} />
            <StatisticLine text={"Average"} value={calculateAvg(g, n, b)} />
            <StatisticLine text={"Positive"} value={calculatePos(g, calculateTotal(g, n, b))} />
          </tbody>
        </table>
      </div>
    )
  }
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