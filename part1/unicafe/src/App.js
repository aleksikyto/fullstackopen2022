import { useState } from "react";

const title = "give feedback";
const subtitle = "statistics";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const StatisticLine = (props) =>
  props.text === "positive" ? (
    <>
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}%</td>
        </tr>
      </tbody>
    </>
  ) : (
    <>
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      </tbody>
    </>
  );

const Statistics = ({ good, bad, neutral }) => {
  const averageCalculator = () => {
    return (
      totalAmount() !== 0 ? (good + bad * -1) / totalAmount() : 0
    ).toFixed(1);
  };

  const totalAmount = () => {
    return good + bad + neutral;
  };

  const positivityAmount = () => {
    return (good !== 0 ? (good / totalAmount()) * 100 : 0).toFixed(1);
  };

  return totalAmount() !== 0 ? (
    <>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={totalAmount()} />
        <StatisticLine text="average" value={averageCalculator()} />
        <StatisticLine text="positive" value={positivityAmount()} />
      </table>
    </>
  ) : (
    <>
      <p>No feedback given</p>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1> {title} </h1>
      <Button
        handleClick={() => {
          setGood(good + 1);
        }}
        text="good"
      />
      <Button
        handleClick={() => {
          setNeutral(neutral + 1);
        }}
        text="neutral"
      />
      <Button
        handleClick={() => {
          setBad(bad + 1);
        }}
        text="bad"
      />
      <h1> {subtitle} </h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
