import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import DeliveryTemplate from "../DeliveryTemplate";
import "../../style/shower.scss";

const ClientShower = () => {
  const [currentObject, setCurrentObject] = useState({});
  const [currentType, setCurrentType] = useState(null);
  const [currentDorsHandles, setCurrentDorsHandles] = useState(null);
  const [widthValue, setWidthValue] = useState('');
  const [heightValue, setHeightValue] = useState('');
  const [depthValue, setDepthValue] = useState('');
  const [validationInput, setValidationInput] = useState(false);
  const [totalSum, setTotalSum] = useState(null);

  const deliveryFirstName = useSelector((state) => state.delivery.deliveryFirstName);
  const deliveryLastName = useSelector((state) => state.delivery.deliveryLastName);
  const deliverySurName = useSelector((state) => state.delivery.deliverySurName);
  const deliveryNumberPhone = useSelector((state) => state.delivery.deliveryNumberPhone);
  const deliveryOrderComent = useSelector((state) => state.delivery.deliveryOrderComent);
  const deliveryDistance = useSelector((state) => state.delivery.deliveryDistance);
  const deliveryAdress = useSelector((state) => state.delivery.deliveryAdress);
  const deliveryBoolean = useSelector((state) => state.delivery.deliveryBoolean);
  
  useEffect(() => {
    fetch("https://calc-shower.herokuapp.com/get-all-shower")
      .then((res) => res.json())
      .then((data) => {
        setCurrentObject(data[0]);
      })
      .catch((error) => console.error(error));
  }, []);

  const selectTypeFunc = (e) => {
    const selectedType = JSON.parse(e.target.value);
    setCurrentType(selectedType);
  };

  const selectDorsHandlesFunc = (e) => {
    const selectedType = JSON.parse(e.target.value);
    setCurrentDorsHandles(selectedType);
  };

  const testCrm = async () => {
    const url = 'https://openapi.keycrm.app/v1/order';
    const correlationId = '3c1cdba9-75bf-4a63-920b-80ff07f142c0';
    const token = 'ODQ0MDA5YjE3ZmJhMGYwNzQxMTFlN2FmYmRlZjE0MzEwNDljYzM5OQ';
  
    const data = {
      source_id: 10,
      buyer_comment: "I want this sentence to be my buyer comment on KeyCRM",
      discount_percent: 11.5,
      discount_amount: 9.99,
      shipping_price: 2.5,
      wrap_price: 3.5,
      taxes: 2.5,
      buyer: {
        full_name: "Test Kushnir",
        email: "john.doe@mail.app",
        phone: "+380635530117"
      }
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Correlation-Id': correlationId,
          'Accept': 'application/json',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error:', error.message);

    }
    console.log("press order");
  };

  const calcTotalSumFunc = () => {
    if(heightValue && widthValue) {
      setValidationInput(false);
      const calcSize = (depthValue ? (Number(widthValue) * Number(heightValue)) + (Number(heightValue) * Number(depthValue)) : (Number(widthValue) * Number(heightValue) * 2));
      const calcSquareMeter = calcSize/10000;

      let totalSumFurniture = 0;

      let intslPrice = 0;
      let deliveryPrice = 0;
      let deliveryPriceOverSity = 0;
      let deliveryFinalyPrice = 0;

     

      if (calcSquareMeter < 2){
        intslPrice =calcSquareMeter * 300
     } else if (calcSquareMeter > 2){
       intslPrice = calcSquareMeter * 350
     };
     
     if (deliveryAdress != ''){
       deliveryPrice = 200
     }

     if (deliveryBoolean){
       deliveryPriceOverSity = Number(deliveryDistance) * 26
     }

     const totalSum = 
     (currentType?.price || 0) + 
     totalSumFurniture +  
     (deliveryBoolean ? deliveryPriceOverSity : deliveryPrice);

  
      const finishedShower = {
      }

      setTotalSum(totalSum)
    } else {
      setValidationInput(true);
    }
  }

  return (
    <div className="shower_wrapper">
      <h1>Душові кабіни</h1>
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
          {/* <p>Вибраний тип: <span>{currentType?.name && currentType.name}</span>  </p> */}
        </div>
      </div>
      <div className="wrap_item size_shower">
        <h3>Вкажіть розміри (см)</h3>
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
          <div className="size_item">
            {/* <h4>Глубина:</h4> */}
            <input
              type="number"
              placeholder="Глибина"
              value={depthValue}
              onChange={(e) => setDepthValue(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="wrap_item type_shower">
        <h3>Виберіть ручки</h3>
        <div className="choose_item selected_shower">
          <select
            value={currentDorsHandles ? JSON.stringify(currentDorsHandles) : ""}
            onChange={selectDorsHandlesFunc}
          >
            <option value="" disabled>
              Оберіть ручки
            </option>
            {currentObject?.dorsHandles &&
              currentObject.dorsHandles.map((item) => (
                <option key={item.name} value={JSON.stringify(item)}>
                  {item.name}
                </option>
              ))}
          </select>
          {/* <p>Вибраний тип: <span>{currentType?.name && currentType.name}</span>  </p> */}
        </div>
      </div>
      <DeliveryTemplate/>
      <div className="footer_calc">
            <div className="summ">
              <div>
                <button onClick={calcTotalSumFunc}>Підрахувати вартість</button>
              </div>
              <div className="order_sum">
              <h3>Кінцева вартість: <span>{totalSum ? totalSum : 0} грн</span> </h3>
              </div>
            </div>
            <div className="send_order">
               <button onClick={testCrm}>Оформити</button>
            </div>
        </div> 
    </div>
  );
};

export default ClientShower;
