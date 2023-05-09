import React from "react";

const SelectObjecTemplate = ({
  title,
  changeFunc,
  state,
  data,
  wrapClass,
  optionName,
  selectWrapClass,
  selectDivWrap,
}) => {
  return (
    <>
      {selectDivWrap ? (
        <div className={wrapClass}>
          <h3>{title}</h3>
          <div className={selectWrapClass}>
            <select
              onChange={changeFunc}
              value={state ? JSON.stringify(state) : ""}
            >
              <option value="" disabled>
                {optionName}
              </option>
              {data &&
                data.map((item) => (
                  <option key={item._id} value={JSON.stringify(item)}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      ) : (
        <div className={wrapClass}>
          <h3>{title}</h3>
            <select
              onChange={changeFunc}
              value={state ? JSON.stringify(state) : ""}
            >
              <option value="" disabled>
                {optionName}
              </option>
              {data &&
                data.map((item, idx) => (
                  <option key={item._id} value={JSON.stringify(item)}>
                    {item.name}
                  </option>
                ))}
            </select>
        </div>
      )}
    </>
  );
};

export default SelectObjecTemplate;
