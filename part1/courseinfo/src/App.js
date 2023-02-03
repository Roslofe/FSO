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
      <p>{props.part.name} {props.part.exercises}</p>
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
      <Part part={props.parts[0]}/>
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

/**
 * Calculates the total number of exercises and renders it.
 * @param props Contains the number of exercises for each part 
 * @returns A rendering of the total number of exercises
 */
const Total = (props) => {
  const exAmnts = props.parts.map(p => p.exercises)
  const sum = exAmnts[0] + exAmnts[1] + exAmnts[2]
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
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
