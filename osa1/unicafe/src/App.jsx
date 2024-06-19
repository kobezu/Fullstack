import { useState } from 'react'

const Header = ({ text }) => (
  <h1>{text}</h1>
)

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({feedback}) => {
  const good = feedback.good
  const neutral = feedback.neutral
  const bad = feedback.bad
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = 100 * good / all

  if(all > 0){
    return(
      <table>
        <tbody>
          <StatisticLine text='good' value={good}/>
          <StatisticLine text='neutral' value={neutral}/>
          <StatisticLine text='bad' value={bad}/>
          <StatisticLine text='all' value={all}/>
          <StatisticLine text='average' value={average.toFixed(1)}/>
          <StatisticLine text='positive' value={positive.toFixed(1)+' %'}/>
        </tbody>
      </table>
    )
  }
  else{
    return <div>No feedback given</div>
  }
}

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const addGood = () => 
    setFeedback({ ...feedback, good: feedback.good + 1})

  const addNeutral = () => 
    setFeedback({ ...feedback, neutral: feedback.neutral + 1})

  const addBad = () => 
    setFeedback({ ...feedback, bad: feedback.bad + 1})

  return (
    <div>
      <Header text='give feedback'/>
      <Button text='good' handleClick={() => addGood()}/>
      <Button text='neutral' handleClick={() => addNeutral()}/>
      <Button text='bad' handleClick={() => addBad()}/>

      <Header text='statistics'/>
      <Statistics feedback={feedback}/>
    </div>
  )
}

export default App