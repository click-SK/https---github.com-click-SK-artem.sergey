import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementCart,
  decrementCart,
  removeAll,
  removeCart,
} from "../store/cart";

const ListTheChosenFurniture = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const remove = (name) => {
    dispatch(removeCart(name));
  };

  const handleInc = (name) => {
    dispatch(incrementCart(name));
  };

  const handleDec = (name) => {
    dispatch(decrementCart(name));
  };

  return (
    <div className="list_firnitur">
      <div className="list_firnitur_wrap">
        <div className="list_header">
          <p>фото</p>
          <p>Опис</p>
          <p>Креслення</p>
          <p>Колір</p>
          <p>Ціна</p>
        </div>
        {cart.length != 0 &&
          cart.map((item) => (
            <div key={item._id}>
              <div className="list_firnitur_item" key={item._id}>
                <img src="/HDL-301-main.png" className="image_furniture" />
                <div>
                  <h3>{item.title}</h3>
                  {item?.depends.map((dep) => (
                    <div key={dep}>
                      <p>{dep}</p>
                    </div>
                  ))}
                </div>
                <img src="/HDL-301-second.png" className="image_furniture" />
                <div>
                  {item?.colorsFurniture.map((el) => (
                    <div key={el._id}>
                      <p>{el.color}</p>
                      <p>{el.price}</p>
                    </div>
                  ))}
                </div>
                <div onClick={() => remove(item.title)}>X</div>
              </div>
              <div className="list_furniture_buttons_wrap">
                <div
                  className="list_furniture_button"
                  onClick={() => handleDec(item.title)}
                >
                  -
                </div>
                <h1>{item?.count}</h1>
                <div
                  className="list_furniture_button"
                  onClick={() => handleInc(item.title)}
                >
                  +
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListTheChosenFurniture;
