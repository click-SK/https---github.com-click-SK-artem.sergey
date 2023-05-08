import React, { useState, useEffect } from "react";
import "../style/shower.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setFirstNameFunc,
  setLastNameFunc,
  setSurNameFunc,
  setOrderComentFunc,
  setNumberPhoneFunc,
  setDistanceFunc, 
  setAdressFunc, 
  setBooleanFunc
} from "../store/delivery";
const DeliveryTemplate = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [surname, setSurname] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [orderComent, setOrderComent] = useState("");
  const [adress, setAdress] = useState('');
  const [delivery, setDelivery] = useState(false);
  const [deliveryRoadDistance, setDeliveryRoadDistance] = useState('');
  const disptch = useDispatch();

  const addFirstName = (e) => {
    setFirstName(e);
    disptch(setFirstNameFunc(e));
  };

  const addLastName = (e) => {
    setLastName(e);
    disptch(setLastNameFunc(e));
  };

  const addSurtName = (e) => {
    setSurname(e);
    disptch(setSurNameFunc(e));
  };

  const addNumberPhone = (e) => {
    setNumberPhone(e);
    disptch(setNumberPhoneFunc(e));
  };

  const addOrderComent = (e) => {
    setOrderComent(e);
    disptch(setOrderComentFunc(e));
  };

  const isDelivery = (e) => {
    setDelivery(delivery => !delivery)
    disptch(setBooleanFunc(delivery))
  }

  const addAdress = (e) => {
    setAdress(e);
    disptch(setAdressFunc(e))
  }

  const roadDistance = (e) => {
    setDeliveryRoadDistance(e);
    disptch(setDistanceFunc(e))
  }
  console.log('adress',adress);
  console.log('delivery',delivery);
  console.log('deliveryRoadDistance',deliveryRoadDistance);
  return (
    <div>
          <div className="choose_item item_mirrors item_delivery">
    <h3>Доставка</h3>
            <div className="delivery_wrap">
                <input className="cabel" placeholder="Адреса доставки" value={adress} onChange={(e) => addAdress(e.target.value)}/>
                <div className="delivery_addres">
                    <div className="checkbox_wrap ">
                      <input id="checkboxdelivery"  className="checkbox" type='checkbox' checked={delivery} onChange={isDelivery}/>
                      <label className="checkbox-label" htmlFor="checkboxdelivery"></label>
                      <p style={{marginTop: 5}}>За місто</p> 
                    </div>
                    <input className="cabel width_delivery" type="number" placeholder="Відстань - км" value={deliveryRoadDistance} onChange={(e) => roadDistance(e.target.value)}/>
                </div>
            </div>
    </div>
    <div>
      <div className="choose_item item_mirrors item_fullname">
        <h3>ПІБ:</h3>
        <div className="fullname_wrap">
          <div className="name_lastname">
            <input
              className="cabel"
              placeholder="Ім'я"
              value={firstName}
              onChange={(e) => addFirstName(e.target.value)}
            />
            <input
              className="cabel"
              placeholder="Прізвище"
              value={lastName}
              onChange={(e) => addLastName(e.target.value)}
            />
          </div>
          <input
            className="cabel"
            placeholder="По батькові"
            value={surname}
            onChange={(e) => addSurtName(e.target.value)}
          />
        </div>
      </div>
      <div className="choose_item item_mirrors">
        <h3>Телефон</h3>
        <input
          className="cabel"
          placeholder="+ 38 (0ХХ) ХХХ ХХ ХХ "
          value={numberPhone}
          onChange={(e) => addNumberPhone(e.target.value)}
        />
      </div>
      <div className="choose_item item_mirrors item_textarea">
        <h3>Деталі замовлення</h3>
        <textarea
          className="cabel"
          style={{ width: "70%", height: "100%" }}
          value={orderComent}
          onChange={(e) => addOrderComent(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </div>
    </div>
    </div>
  );
};

export default DeliveryTemplate;
