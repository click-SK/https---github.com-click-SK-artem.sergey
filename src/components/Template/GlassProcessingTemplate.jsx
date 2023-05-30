import React, { useState } from "react";
import "../../style/mirrors.scss";
import "../../style/shower.scss";
const GlassProcessingTemplate = ({
  processingStandart,
  setCurrentArr,
  currentArr,
}) => {
  const setNewArrayFunc = (e) => {
    const foundIndex = currentArr.findIndex((el) => el.name === e.name);
    if (foundIndex !== -1) {
      const newArr = [...currentArr];
      newArr.splice(foundIndex, 1);
      setCurrentArr(newArr);
    } else {
      setCurrentArr((state) => [...state, e]);
    }
  };

  console.log("currentArr", currentArr);

  return (
    <div>
      <h1>Обробка скла:</h1>
      {processingStandart.map((item) => (
        <div key={item._id}>
          <div className="choose_item item_mirrors">
          <h3>{item.name}</h3>
            <div className="checkbox_wrap ">
              <input
                onClick={() => setNewArrayFunc(item)}
                id={item._id}
                className="checkbox"
                type="checkbox"
              />
              <label
                className="checkbox-label"
                htmlFor={item._id}
              ></label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GlassProcessingTemplate;
