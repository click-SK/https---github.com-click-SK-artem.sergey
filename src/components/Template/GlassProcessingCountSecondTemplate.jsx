import React, { useState } from "react";

const GlassProcessingCountSecondTemplate = ({item, setCurrentArr, currentArr}) => {
    const [count, setCount] = useState(0);

    const setNewArrayFunc = (e) => {
        const foundIndex = currentArr.findIndex((el) => el.name === item.name);
        if (foundIndex !== -1) {
          const newArr = [...currentArr];
          newArr.splice(foundIndex, 1);
          setCurrentArr(newArr);
        } else {
            item.count = Number(count);
            setCurrentArr((state) => [...state, item]);
        }
      };

      const setNewCountFunc = (e) => {
        setCount(e)
        item.count = Number(e);
      }

    return (
        <div className="choose_item item_mirrors">
        <h3>{item.name}</h3>
        <div className="checkbox_wrap ">
          <input
            onClick={() => setNewArrayFunc(item)}
            id={item._id}
            className="checkbox"
            type="checkbox"
            disabled={count <= 0 ? true : false}
          />
          <label className="checkbox-label" htmlFor={item._id}></label>
        </div>
        <div>
          <input
            placeholder="Кількість"
            className="input_miroor_item cabel"
            value={count}
            onChange={(e) => setNewCountFunc(e.target.value)}
          />
        </div>
      </div>
    );
};

export default GlassProcessingCountSecondTemplate;