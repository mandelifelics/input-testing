import { useState } from "react";
import './App.css';

function App() {
  const [errorState, setErrorState] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    alert("Вы сабмитнули форму")
  }
  const onClickDate = e => {
    try {
      e.target.showPicker();
    } catch(e){}
  }
  const changeErrorInputsState = () => setErrorState(!errorState);
  return (
    <div className="App">
      <h1>EP inputs example</h1>
      <button type="button" onClick={changeErrorInputsState}>Show error inputs state</button>
      <form action="/?default" method="get" onSubmit={onSubmit} className={errorState ? "errorState" : ""}>
        <input placeholder={`Input default without type`}/>
        <input type="text" placeholder={`Input type="text"`}/>
        <input type="email" placeholder={`Input type="email"`}/>
        <input type="search" placeholder={`Input type="search"`}/>
        <input type="tel" placeholder={`Input type="tel"`}/>
        <input type="url" placeholder={`Input type="url"`}/>
        <input type="number" placeholder={`Input type="number"`}/>
        <input type="password" placeholder={`Input type="password"`}/>
        <input type="color"/>
        <input type="range"/>
        <input onClick={onClickDate} type="date"/>
        <input onClick={onClickDate} type="datetime-local"/>
        <input onClick={onClickDate} type="month"/>
        <input onClick={onClickDate} type="week"/>
        <input onClick={onClickDate} type="time"/>
        <input type="file"/>
        <input type="image" src={`https://dummyimage.com/500x40/000/ffffff.jpg&text=Input image submit`} alt="Тут должна быть картинка"/>
        <input type="submit"/>
        <input type="reset"/>
      </form>
    </div>
  );
}

export default App;
