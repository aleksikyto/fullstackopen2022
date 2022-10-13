import { useState } from 'react'

const title = "give feedback"
const subtitle = "statistics"

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Value = props => <div>{props.text} {props.value}</div>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const averageCalculator = () => {
    return totalAmount() !== 0 ? (good + (bad * -1)) / totalAmount() : 0
  }

  const totalAmount = () => {
    return good + bad + neutral 
  }

  const positivityAmount = () => {
    return good !== 0 ? good / totalAmount() : 0
  }

  return (
    <div>
      <h1> {title} </h1>
      <Button handleClick={() => {setGood(good + 1)}} text="good" />
      <Button handleClick={() => {setNeutral(neutral + 1)}} text="neutral" />
      <Button handleClick={() => {setBad(bad + 1)}} text="bad" />
      <h1> {subtitle} </h1>
      <Value text="good" value={good} />
      <Value text="neutral" value={neutral} />
      <Value text="bad" value={bad} />
      <Value text="all" value={totalAmount()} />
      <Value text="average" value={averageCalculator()} />
      <Value text="positive" value={positivityAmount()} />
    </div>
  )
}

export default App