import React, {useState} from "react";

const ProcessingCoutPlusCountTemplate = ({
  title,
  changeFunc,
  state,
  data,
  wrapClass,
  optionName,
  selectWrapClass,
  selectDivWrap,
  currentProcessingСutoutCount,
  setCurrentProcessingСutoutCount,
  inputClass,
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
          <div>
            <input
              placeholder="Кількість"
              className="input_miroor_item cabel"
              value={currentProcessingСutoutCount}
              onChange={(e) => setCurrentProcessingСutoutCount(e.target.value)}
            />
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
          <input
            placeholder="Кількість"
            className={inputClass}
            value={currentProcessingСutoutCount}
            onChange={(e) => setCurrentProcessingСutoutCount(e.target.value)}
          />
        </div>
      )}
    </>
  );
};

export default ProcessingCoutPlusCountTemplate;
