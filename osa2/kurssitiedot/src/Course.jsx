const Header = (props) => {
  return(
    <div>
      <h2>{props.name}</h2>
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
      {props.parts.map(p => 
      <Part key={p.id} name={p.name} exercises={p.exercises}/>)}
    </div>
  )
}

const Total = ({parts}) => {  
  return(
    <div>
      <b>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b>
    </div>
  )
}

const Course = ({course}) => {
  return(
    <div>
      < Header name={course.name} />
      < Content parts={course.parts}/>
      < Total parts={course.parts}/>
    </div>
  )
}

export default Course