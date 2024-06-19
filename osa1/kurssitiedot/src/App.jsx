const Header = (props) => {
  return(
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Part = (part) => {
  return(
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  return(
    <div>
      {props.parts.map(p => <Part name={p.name} exercises={p.exercises}/>)}
    </div>
  )
}

const Total = (props) => {
  let sum = 0
  props.parts.forEach(p => sum += p.exercises)
  return(
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  )
}

const App = () => {
  const course ={
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      < Header name={course.name} />
      < Content parts={course.parts}/>
      < Total parts={course.parts}/>
    </div>
  )
}

export default App