import { useState } from 'react'

const Feedback = () => {
  return (
    <div>
      <h1>give feedback</h1>
    </div>
  )
}

const Statistics = (props) => {
      if (props.total === 0) {
        return (
          <div>
            <h1>statistics</h1>
            <p>No feedback given</p>
          </div>)
      }
      else {
        return (
          <div>
            <h1>statistics</h1>
            <StatisticLine text="good" value= {props.good} />
            <StatisticLine text="neutral" value= {props.neutral} />
            <StatisticLine text="bad" value= {props.bad} />
            <StatisticLine text="total" value= {props.total} />
            <StatisticLine text="average" value= {((props.good-props.bad)/props.total).toFixed(1)} />
            <StatisticLine text="positive" value= {((props.good/props.total)*100).toFixed(1)+"%"} />
          </div>
        )
        }
}

const StatisticLine = (props) => (
  <table>
    <tbody>
      <tr>
        <td> {props.text} </td>
        <td> {props.value} </td>
      </tr>
    </tbody>
  </table>
)


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    setAll(allClicks.concat('G'))
    const updatedgood = good + 1
    setGood(updatedgood)
    setTotal(updatedgood + neutral + bad)
  }

  const handleNeutralClick = () => {
    setAll(allClicks.concat('N'))
    const updatedneutral = neutral + 1
    setNeutral(updatedneutral)
    setTotal(good + updatedneutral + bad)
  }

  const handleBadClick = () => {
    setAll(allClicks.concat('B'))
    const updatedbad = bad + 1
    setBad(updatedbad)
    setTotal(good + neutral + updatedbad)
  }

  return (
    <div>
      <Feedback />
      <Button handleClick={handleGoodClick} text= "good"/>
      <Button handleClick={handleNeutralClick} text= "neutral"/>
      <Button handleClick={handleBadClick} text= "bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

export default App