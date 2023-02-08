const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ counts }) => <b>Total of exercises {counts.reduce((acc, curr) => acc + curr)}</b>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
      <Part key={part.id} part={part} />
      )}   
  </>

const Course = ({ course }) =>
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total counts={course.parts.map(part => part.exercises)} />
  </>

export default Course