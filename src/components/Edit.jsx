import React, { useState, useEffect } from "react";

const ShowerCabin = () => {
  const [allData, setAllData] = useState([]);
  const [currentObject, setCurrentObject] = useState({});
  const [totalSum, setTotalSum] = useState(null);
  const [currentType, setCurrentType] = useState(null);
  const [currentGlass, setCurrentGlass] = useState("");

  useEffect(() => {
    fetch("https://calc-shower.herokuapp.com/get-all-shower")
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
        setCurrentObject(data[0]);
      })
      .catch((error) => console.error(error));
  }, []);

  console.log("allData", allData);

  const selectTypeFunc = (e) => {
    const selectedType = JSON.parse(e.target.value);
    setCurrentType(selectedType);
  };
  const selectGlassFunc = (e) => {
    setCurrentGlass(e.target.value);
  };

  const calcTotalSumFunc = () => {
    const total = currentType.price;
    setTotalSum(total)
  }

  return (
    <div>
      <h1>Душові кабіни</h1>

      <h3>Виберіть тип</h3>
      <select
        value={currentType ? JSON.stringify(currentType) : ""}
        onChange={selectTypeFunc}
      >
        <option value="" disabled>
          Оберіть тип
        </option>
        {currentObject?.type &&
          currentObject.type.map((item) => (
            <option key={item.name} value={JSON.stringify(item)}>
              {item.name}
            </option>
          ))}
      </select>
      <p>Вибраний тип: {currentType?.name && currentType.name}</p>

      <h3>Виберіть скло</h3>
      <select value={currentGlass} onChange={selectGlassFunc}>
        <option value="" disabled>
          Оберіть скло
        </option>
        {currentObject &&
          currentObject.glassThickness &&
          currentObject.glassThickness.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
      </select>
      <p>Вибране скло: {currentGlass}</p>
      <div>
        <button onClick={calcTotalSumFunc}>Підрахувати вартість</button>
      </div>
      <div>
        <h3>Кінцева вартість {totalSum && totalSum}:</h3>
      </div>
    </div>
  );
};

export default ShowerCabin;
