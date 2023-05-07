import React, { useState, useEffect } from "react";
import ModalGlassPartitions from ".././ModalGlassPartitions";
// import ListTheChoseFurniture from "../.ListTheChoseFurniture";
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from "react-redux";
import "../../style/shower.scss";

const ClientCosmeticMirrors = ({ data }) => {
  const [currentObject, setCurrentObject] = useState({});
  const [currentType, setCurrentType] = useState(null);
  const [widthValue, setWidthValue] = useState("");
  const [heightValue, setHeightValue] = useState("");
  const [validationInput, setValidationInput] = useState(false);
  const [lightBulbsCount, setLightBulbsCount] = useState('');
  const [patronCount, setPatronCount] = useState('');
  const [currentProcessingСutout, setCurrentProcessingСutout] = useState(null);
  const [totalSum, setTotalSum] = useState(null);

  useEffect(() => {
    fetch("https://calc-shower.herokuapp.com/get-all-cosmetic-mirrors")
      .then((res) => res.json())
      .then((data) => {
        setCurrentObject(data[0])
      })
      .catch((error) => console.error(error));
  }, []);

  const selectTypeFunc = (e) => {
    const selectedType = JSON.parse(e.target.value);
    setCurrentType(selectedType);
  };

  const selectProcessingСutoutFunc = (e) => {
    const selectedProcessing = JSON.parse(e.target.value);
    setCurrentProcessingСutout(selectedProcessing);
  };

  const calcTotalSumFunc = () => {
    if(heightValue && widthValue) {
      setValidationInput(false);
      const calcSize = Number(widthValue) * Number(heightValue);
      const calcSquareMeter = calcSize/1000000;
  

  
      const totalSum = (calcSquareMeter * currentType?.price || 0 ) +
      (currentObject?.lightBulbs * lightBulbsCount || 0) +
      (currentObject?.patron * patronCount || 0) +
      (currentProcessingСutout?.price || 0);
  
      const finishedShower = {
        // typeName: currentType?.name,
        // typePrice: currentType?.price,
        // glass: currentGlass,
        // glassColorName: currentGlassColor?.name,
        // glassColorPrice: currentGlassColor?.price,
        // width: widthValue,
        // height: heightValue,
        // volume: volumValue,
        // furniture: cart,
        // total: totalSum,
      }
      console.log('finishedShower',finishedShower);
      setTotalSum(totalSum)
    } else {
      setValidationInput(true);
    }
  }
  console.log("data", currentObject);
  return (
    <div>
      <h1>Косметичні дзеркала</h1>
      <div className="wrap_item type_shower">
        <h3>Виберіть тип</h3>
        <div className="choose_item selected_shower">
          <select
            value={currentType ? JSON.stringify(currentType) : ""}
            onChange={selectTypeFunc}
          >
            <option value="" disabled>
              Оберіть тип
            </option>
            {currentObject?.typeWordpress &&
              currentObject.typeWordpress.map((item) => (
                <option key={item.name} value={JSON.stringify(item)}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="wrap_item size_shower">
        <h3>Вкажіть розміри (мм)</h3>
        <div className="size_input">
          <div className="size_item">
            {/* <h4>Ширина:</h4> */}
            <input
              type="number"
              placeholder="Ширина"
              value={widthValue}
              onChange={(e) => setWidthValue(e.target.value)}
            />
            <p style={{ color: "red" }}>{validationInput && "Введіть данні"}</p>
          </div>
          <div className="size_item">
            {/* <h4>Висота:</h4> */}
            <input
              type="number"
              placeholder="Висота"
              value={heightValue}
              onChange={(e) => setHeightValue(e.target.value)}
            />
            <p style={{ color: "red" }}>{validationInput && "Введіть данні"}</p>
          </div>
        </div>
      </div>
        
        <div className="footer_calc">
            <div className="summ">
              <div>
              <button onClick={calcTotalSumFunc}>Підрахувати вартість</button>
              </div>
              <div className="order_sum">
              <h3>Кінцева вартість: <span>{totalSum ? totalSum.toFixed(0) : 0} грн</span> </h3>
              </div>
            </div>
            <div className="send_order">
            <button>Оформити</button>
            </div>
        </div> 
    </div>
  );
};

export default ClientCosmeticMirrors;
