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
      <Part name={props.part1.name} exercises={props.part1.exercises}/>
      <Part name={props.part2.name} exercises={props.part2.exercises}/>
      <Part name={props.part3.name} exercises={props.part3.exercises}/>
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises} />
    </div>
  )
}

export default App
