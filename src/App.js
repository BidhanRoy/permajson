import { useState } from 'react';
import { TextAreaContainer, ButtonContainer, KeyFileContainer } from './Containers.js';
import './App.css';

const App = () => {
  const [inputValue, setInputValue] = useState('{}');

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const validateJson = async () => {
    console.log('validating...', inputValue)

    try {
      var parsedInputJson = JSON.parse(inputValue);
      if (parsedInputJson && typeof parsedInputJson === "object") {
        console.log('valid json! ', parsedInputJson)
        setInputValue(JSON.stringify(parsedInputJson, null, 2))

        return parsedInputJson;
      }
    }
    catch (e) {
      console.log('invalid json')
      alert('Invalid Json String!')
    }
  }

  return (
    <div className="App-body">
      {TextAreaContainer(inputValue, onInputChange)}
      {ButtonContainer(validateJson)}
      {KeyFileContainer()}
    </div>
  );
}

export default App;
