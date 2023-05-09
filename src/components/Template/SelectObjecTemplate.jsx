import React from "react";

const SelectObjecTemplate = ({ title, changeFunc, state, data, styleClass }) => {
  return (
    <>
      <div className={styleClass}>
        <h3>{title}</h3>
        <select
          onChange={changeFunc}
          value={state ? JSON.stringify(state) : ""}
        >
          <option value="" disabled></option>
          {data && data.map((item) => (
            <option key={item.name} value={JSON.stringify(item)}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectObjecTemplate;
