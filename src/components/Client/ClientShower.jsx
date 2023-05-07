import React, { useState, useEffect } from "react";
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
  const [adress, setAdress] = useState('');
  const [delivery, setDelivery] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [surname, setSurname] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  const [orderComent, setOrderComent] = useState('');
  const [deliveryRoadDistance, setDeliveryRoadDistance] = useState('');
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
     
     if (adress != ''){
       deliveryPrice = 200
     }

     if (delivery){
       deliveryPriceOverSity = Number(deliveryRoadDistance) * 26
     }

      const totalSum = 0;

  
      const finishedShower = {
      }

      setTotalSum(totalSum)
    } else {
      setValidationInput(true);
    }
  }

  const addFirstName = (e) => {
    // const cordObj = data?.option?.cord;
    setFirstName(e.target.value);
  }
  const addLastName = (e) => {
    // const cordObj = data?.option?.cord;
    setLastName(e.target.value);
  }
  const addSurname = (e) => {
    // const cordObj = data?.option?.cord;
    setSurname(e.target.value);
  }
  const addPhone = (e) => {
    // const cordObj = data?.option?.cord;
    setNumberPhone(e.target.value);
  }
  const addComent = (e) => {
    // const cordObj = data?.option?.cord;
    setOrderComent(e.target.value);
  }
  const isDelivery = () => {
    // const paintingObj = data?.option?.painting;
    setDelivery(delivery => !delivery)
  }

  const addAdress = (e) => {
    // const cordObj = data?.option?.cord;
    setAdress(e.target.value);
  }

  const roadDistance = (e) => {
    // const cordObj = data?.option?.cord;
    setDeliveryRoadDistance(e.target.value);
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
      <div className="choose_item item_mirrors item_delivery">
      <h3>Доставка</h3>
              <div className="delivery_wrap">
                  <input className="cabel" placeholder="Адреса доставки" value={adress} onChange={(e) => addAdress(e)}/>
                  <div className="delivery_addres">
                      <div className="checkbox_wrap ">
                        <input id="checkbox5"  className="checkbox" type='checkbox' checked={delivery} onChange={isDelivery}/>
                        <label className="checkbox-label" htmlFor="checkbox5"></label>
                        <p style={{marginTop: 5}}>За місто</p> 
                      </div>
                      <input className="cabel width_delivery" type="number" placeholder="Відстань - км" value={deliveryRoadDistance} onChange={(e) => roadDistance(e)}/>
                  </div>
              </div>
      </div>
      <div className="choose_item item_mirrors item_fullname">
      <h3>ПІБ:</h3>
        <div className="fullname_wrap">
          <div className="name_lastname">
            <input className="cabel" placeholder="Ім'я" value={firstName} onChange={(e) => addFirstName (e)} />
            <input className="cabel" placeholder="Прізвище" value={lastName} onChange={(e) => addLastName(e)}/>
          </div>
          <input className="cabel" placeholder="По батькові" value={surname} onChange={(e) => addSurname(e)}/>
        </div>
      </div>
      <div className="choose_item item_mirrors">
      <h3>Телефон</h3>
        <input className="cabel" placeholder="+ 38 (0ХХ) ХХХ ХХ ХХ " value={numberPhone} onChange={(e) => addPhone(e)}/>
      </div>
      <div className="choose_item item_mirrors item_textarea">
      <h3>Деталі замовлення</h3>
        <textarea className="cabel" style={{width: "70%", height:"100%"}} value={orderComent} name="" id="" cols="30" rows="10" onChange={(e) => addComent(e)}></textarea>
      </div>
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
