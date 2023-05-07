import React, { useState, useEffect } from "react";
import ModalGlassPartitions from "./ModalGlassPartitions";
import ListTheChoseFurniture from "./ListTheChoseFurniture";
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from "react-redux";
import DeliveryTemplate from "./DeliveryTemplate";
import "../style/shower.scss";

const CosmeticMirrors = ({ data }) => {
  const [currentType, setCurrentType] = useState(null);
  const [widthValue, setWidthValue] = useState("");
  const [heightValue, setHeightValue] = useState("");
  const [validationInput, setValidationInput] = useState(false);
  const [lightBulbsCount, setLightBulbsCount] = useState('');
  const [patronCount, setPatronCount] = useState('');
  const [currentProcessingСutout, setCurrentProcessingСutout] = useState(null);
  const [totalSum, setTotalSum] = useState(null);

  const deliveryFirstName = useSelector((state) => state.delivery.deliveryFirstName);
  const deliveryLastName = useSelector((state) => state.delivery.deliveryLastName);
  const deliverySurName = useSelector((state) => state.delivery.deliverySurName);
  const deliveryNumberPhone = useSelector((state) => state.delivery.deliveryNumberPhone);
  const deliveryOrderComent = useSelector((state) => state.delivery.deliveryOrderComent);

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
      (data?.lightBulbs * lightBulbsCount || 0) +
      (data?.patron * patronCount || 0) +
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
  console.log("data", data);
  return (
    <div>
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
            {data?.typeGlass &&
              data.typeGlass.map((item) => (
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

      <div className="wrap_item size_shower">
        <h3>Кількість лампочок</h3>
        <div className="size_input">
          <div className="size_item">
            <input
              type="number"
              placeholder="Кількість"
              value={lightBulbsCount}
              onChange={(e) => setLightBulbsCount(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="wrap_item size_shower">
        <h3>Кількість патронів</h3>
        <div className="size_input">
          <div className="size_item">
            <input
              type="number"
              placeholder="Кількість"
              value={patronCount}
              onChange={(e) => setPatronCount(e.target.value)}
            />
          </div>
        </div>
      </div>

        <div className="wrap_item type_shower">
            <h3>Виберіть обробку</h3>
            <div className="choose_item selected_shower">
              <select
                value={currentProcessingСutout ? JSON.stringify(currentProcessingСutout) : ""}
                onChange={selectProcessingСutoutFunc}
              >
                <option value="" disabled>
                  Оберіть обробку
                </option>
                {data?.processingСutout &&
                  data.processingСutout.map((item) => (
                    <option key={item.name} value={JSON.stringify(item)}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
        </div>
        <DeliveryTemplate/>
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

export default CosmeticMirrors;
