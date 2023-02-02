/**
 * Renders the title of the course.
 * @param props Contains the name of the course within the value course 
 * @returns A rendering of the course title
 */
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

/**
 * Renders the information of an individual part
 * @param props Contains the name and number of exercises for a part 
 * @returns A rendering of the part information
 */
const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}
/**
 * Renders the name and amount of exercises for all parts
 * @param props Contains the name of each part and their exercise number
 * @returns A rendering of the parts' information
 */
const Content = (props) => {
  return (
    <div>
      <Part name={props.part1} exercises={props.exercises1}/>
      <Part name={props.part2} exercises={props.exercises2}/>
      <Part name={props.part3} exercises={props.exercises3}/>
    </div>
  )
}

/**
 * Calculates the total number of exercises and renders it.
 * @param props Contains the number of exercises for each part 
 * @returns A rendering of the total number of exercises
 */
const Total = (props) => {
  const sum = props.exercises1 + props.exercises2 + props.exercises3
  return (
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  )
}

/**
 * Acts as the root of the app.
 * @returns A rendering of the page as a whole
 */
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

export default App
