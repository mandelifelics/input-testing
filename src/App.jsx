import { useState } from "react";
import './App.scss';

function App() {
  console.log("render");
  const [customizedState, setCustomizeState] = useState("customized1");
  const [errorState, setErrorState] = useState(false);
  const [disabledState, setDisabledState] = useState(false);

  const onClickDate = e => {
    try {
      e.target.showPicker();
    } catch(e){}
  }

  const handleClick = e => {
    changeValue(e.target.name, e.target.value);
  };

  const inputsAllValues = {
    'Search': "Search keyword",
    'Number': "111.33",
    'Color': "#5e72e4",
    'Range': "90",
    'Date': "2021-12-31",
    'Datetime local': "2021-12-31T18:06",
    'Time': "18:06",
    'File': "",
    'Image': "",
  };

  const inputsAll = [
    { label: 'Search', value: "", params: { type: 'search', name: 'search', placeholder: 'Input type="search"', onChange: handleClick}},
    { label: 'Number', value: "", params: { step: "0.01", min: "0", type: 'number', name: 'number', placeholder: 'Input type="number"', onChange: handleClick}},
    { label: 'Color', value: "", params: { type: 'color', name: 'color', onChange: handleClick}},
    { label: 'Range', value: "", params: { type: 'range', name: 'range', min: 0, max: 100, step: 10, onChange: handleClick}},
    { label: 'Date', value: "", params: { type: 'date', name: 'date', onClick: onClickDate, onChange: handleClick }, paramsCustom: {className: "input-date"}},
    { label: 'Datetime local', value: "", params: { type: 'datetime-local', name: 'time_local', onClick: onClickDate, onChange: handleClick }},
    { label: 'Time', value: "", params: { type: 'time', name: 'time', onClick: onClickDate, onChange: handleClick }},
    { label: 'File', params: { type: 'file', name: 'file', onChange: handleClick }, wrapper: true},
    { label: 'Image', params: { type: 'image', name: 'image', src: 'https://dummyimage.com/300x40/000/ffffff.jpg&text=Input image submit', alt: 'Тут должна быть картинка'}},
    
    // { label: 'Text', params: { type: 'text', name: 'address', placeholder: 'Input type="text"'}},
    // { label: 'Email', params: { type: 'email', name: 'email', placeholder: 'Input type="email"'}},
    // { label: 'Tel', params: { type: 'tel', name: 'phone', placeholder: 'Input type="tel"'}},
    // { label: 'Url', params: { type: 'url', name: 'link', placeholder: 'Input type="url"'}},
    // { label: 'Password', params: { type: 'password', name: 'password', placeholder: 'Input type="password"'}},
    // { label: 'Month', params: { type: 'month', name: 'month', onClick: onClickDate }},
    // { label: 'Week', params: { type: 'week', name: 'week', onClick: onClickDate }},
    // { label: 'Default', params: { placeholder: 'Input default without type'}},
  ];

  const [inputChanged, setInputChanged] = useState(inputsAll);
  
  const changeValue = (name, value) => {
    const temp = [...inputChanged];
    let nr = temp.findIndex(data => data.params.name === name);
    temp[nr].value = value;
    setInputChanged(temp);
  }

  const clearValue = e => {
    if (e.target.checked) {
      setInputChanged(inputChanged.map((element, index) => { element.value = inputsAllValues[element.label]; return element;}));
    } else {
      setInputChanged(inputChanged.map(element => { element.value = ""; return element;}));
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();

    let allData = [];
    const formData = new FormData(e.target);

    for (let pair of formData.entries()) {
      allData.push(`${pair[0]} ---> ${pair[1]}`);
    }

    alert(allData.join('\n'));
  }

  const changeCustomizeInputsState = (e) => {
    setCustomizeState(e.target.value);

  };

  const listItems = inputChanged.map((item, index) => {
    return <li className="row" key={index + item.label}>
      <div className="col">
          <label>
            {item.label} <br />
            {
              item.wrapper && item.params.type === "file" ? <button 
                className={`btn-file ${disabledState ? "disabled" : ""}`} 
                type="button"
              >
                <span>Select file...</span>
                <input 
                  {...item.params} 
                  value={item.value}
                  {...(customizedState !== "default" ? item.paramsCustom : {})}
                  disabled={disabledState ? "disabled" : ""}
                />
              </button> : <input 
                              {...item.params} 
                              value={item.value}
                              {...(customizedState !== "default" ? item.paramsCustom : {})} 
                              disabled={disabledState ? "disabled" : ""}
                            />
            }
            
          </label>
      </div>
    </li>
  });

  return (
    <div className="App">
      <h1>EP inputs example</h1>

      <nav>
        <ul>
          <li>
            <label><input type="radio" name="customize" onChange={changeCustomizeInputsState} value="default" checked={customizedState === "default"}/> Default</label>
          </li>
          <li>
            <label><input type="radio" name="customize" onChange={changeCustomizeInputsState} value="customized1" checked={customizedState === "customized1"}/> Customize type 1</label>
          </li>
          <li>
            <label><input type="radio" name="customize" onChange={changeCustomizeInputsState} value="customized2" checked={customizedState === "customized2"}/> Customize type 2</label>
          </li>
          <li>
            <label><input type="checkbox" onChange={() => setErrorState(!errorState)} checked={errorState} /> Show errors</label>
          </li>
          <li>
            <label><input type="checkbox" onChange={() => setDisabledState(!disabledState)} checked={disabledState}/> Disabled</label>
          </li>
          <li>
            <label><input type="checkbox" onChange={clearValue}/> Insert Values</label>
          </li>
        </ul>
      </nav>

      <div className={customizedState !== "default" ? "customized " + customizedState : ""}>
        <form action="/?default" method="get" onSubmit={onSubmit} className={errorState ? "errorState" : ""}>

          <ul className="inputList">
            { listItems }
          </ul>

          <button className="btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
