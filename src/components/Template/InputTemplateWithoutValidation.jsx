import React, {useState} from 'react';

const InputTemplateWithoutValidation = ({placeholder, onChangeFunc, value, inputClass}) => {
  const [validationValues, setValidationValues] = useState(0);
  if(value < 0) {
    console.log('ERROR',value);
  }

    return (
          <div>
            <input
              className={inputClass}
              type="number"
              placeholder={placeholder}
              value={(value < 0 ? '' : value && value > 2000 ? 2000 : value)}
              onChange={(e) => onChangeFunc(e.target.value)}
            />
            <p style={{ color: "red" }}>
              {value < 0 && "Значення не може бути менше 0"}
            </p>
            <p style={{ color: "red" }}>
              {value > 2000 && "Значення не може бути більше 2000"}
            </p>
          </div>
    );
};

export default InputTemplateWithoutValidation;