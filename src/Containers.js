import { useState } from 'react';

export const TextAreaContainer = (inputValue, onInputChange) => {
    return (
        <textarea
            className="textarea"
            id="data"
            name="data"
            autoFocus=""
            placeholder="{}"
            rows="5"
            value={inputValue}
            onChange={onInputChange}
        >
        </textarea>
    )
};

export const ButtonContainer = (validateJson) => {
    return (
        <button
            type="button"
            name="process"
            className="button is-action is-medium"
            onClick={validateJson}
        >
            save
        </button>
    )
};

export const KeyFileContainer = () => {
    const [files, setFilesValue] = useState([]);


    const onInputChange = (event) => {
        const { value } = event.target;


        const fs = require('fs')
        fs.readFile(value, 'utf8', (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err)
                return
            }
            console.log('File data:', jsonString)
        })


        const jsonValue = JSON.parse(value);
        console.log('file value ', jsonValue)
        setFilesValue(jsonValue);
    };

    return (
        <div>
            <input
                type="file"
                id="file"
                onChange={onInputChange}
            >
            </input>
            <button>upload</button>
        </div>

    )
};
