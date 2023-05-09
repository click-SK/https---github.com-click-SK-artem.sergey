import React from 'react';

const InputTemplate = ({placeholder, onChangeFunc, value, validationInput, inputClass}) => {
    return (
          <div>
            <input
              className={inputClass}
              type="number"
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChangeFunc(e.target.value)}
            />
            <p style={{ color: "red" }}>
              {validationInput &&
                "Введіть данні"}
            </p>
          </div>
    );
};

export default InputTemplate;