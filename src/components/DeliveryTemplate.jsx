import React, { useState, useEffect } from "react";
import "../style/shower.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setFirstNameFunc,
  setLastNameFunc,
  setSurNameFunc,
  setOrderComentFunc,
  setNumberPhoneFunc
} from "../store/delivery";
const DeliveryTemplate = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [surname, setSurname] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [orderComent, setOrderComent] = useState("");
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
  return (
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
  );
};

export default DeliveryTemplate;
