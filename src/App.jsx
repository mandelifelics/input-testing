import { useState } from "react";
import './App.css';

function App() {
  const [errorState, setErrorState] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    alert("Вы сабмитнули форму")
  }
  const changeErrorInputsState = () => setErrorState(!errorState);
  return (
    <div className="App">
      <h1>Export portal inputs example</h1>
      <button type="button" onClick={changeErrorInputsState}>Show error inputs state</button>
      <form action="/?default" method="get" onSubmit={onSubmit} className={errorState ? "errorState" : ""}>
        <input placeholder={`Input default without type`}></input>
        <input type="text" placeholder={`Input type="text"`}></input>
        <input type="email" placeholder={`Input type="email"`}></input>
        <input type="search" placeholder={`Input type="search"`}></input>
        <input type="tel" placeholder={`Input type="tel"`}></input>
        <input type="url" placeholder={`Input type="url"`}></input>
        <input type="number" placeholder={`Input type="number"`}></input>
        <input type="password" placeholder={`Input type="password"`}></input>
      </form>
    </div>
  );
}

export default App;
