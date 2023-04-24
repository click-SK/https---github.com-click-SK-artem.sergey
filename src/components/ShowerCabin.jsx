import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const ShowerCabin = () => {
  const [allData, setAllData] = useState([]);
  const [currentObject, setCurrentObject] = useState({});
  const [totalSum, setTotalSum] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentType, setCurrentType] = useState(null);
  const [currentGlass, setCurrentGlass] = useState("");
  const [currentGlassColor, setCurrentGlassColor] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  // const selectNameFunc = (e) => {
  //   setCurrentCategory(e.target.value);
  //   const arr = allData.filter((item) => item.name === e.target.value);
  //   console.log("arr", arr[0]);
  //   setCurrentObject(arr[0]);
  // };

  const selectTypeFunc = (e) => {
    const selectedType = JSON.parse(e.target.value);
    setCurrentType(selectedType);
  };
  const selectGlassFunc = (e) => {
    setCurrentGlass(e.target.value);
  };
  const selectGlassColorFunc = (e) => {
    setCurrentGlassColor(e.target.value);
  };

  const calcTotalSumFunc = () => {
    const total = currentType.price;
    setTotalSum(total)
  }

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

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

      <h3>Виберіть колір скла</h3>
      <select value={currentGlassColor} onChange={selectGlassColorFunc}>
        <option value="" disabled>
          Оберіть колір скла
        </option>
        {currentObject &&
          currentObject.color &&
          currentObject.color.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
      </select>
      <p>Вибраний колір скла: {currentGlassColor}</p>

      <h3>Вкажіть розміри:</h3>
      <div>
        <div>
          <h4>Ширина:</h4>
          <input />
        </div>
        <div>
          <h4>Висота:</h4>
          <input />
        </div>
        <div>
          <h4>Обєм:</h4>
          <input />
        </div>
      </div>

      <div>
        <button onClick={handleOpenModal}>Обрати фурнітуру</button>
        <Modal isOpen={modalIsOpen} onClose={handleCloseModal}/>
      </div>
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
