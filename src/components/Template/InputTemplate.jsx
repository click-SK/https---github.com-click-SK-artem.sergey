import React from 'react';

const InputTemplate = ({placeholder, onChangeFunc, value, validationInput, inputClass}) => {
  if(value < 0) {
    console.log('ERROR',value);
  }
    return (
          <div>
            <input
              className={inputClass}
              type="number"
              placeholder={placeholder}
              value={value < 0 ? '' : value}
              onChange={(e) => onChangeFunc(e.target.value)}
            />
            <p style={{ color: "red" }}>
              {validationInput &&
                "Введіть данні"}
            </p>
            <p style={{ color: "red" }}>
              {value < 0 && "Значення не може бути менше 0"}
            </p>
          </div>
    );
};

export default InputTemplate;