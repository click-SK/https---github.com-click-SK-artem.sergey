import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../style/modal.scss";
import {
  incrementCart,
  decrementCart,
  removeAll,
  removeCart,
} from "../store/cart";

const ListTheChoseFurniture = () => {
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
          <p className="list_header_item photo">фото</p>
          <p className="list_header_item discr">Опис</p>
          <p className="list_header_item img_discr">Креслення</p>
          <p className="list_header_item color_item">Колір</p>
          <p className="list_header_item price_item">Ціна</p>
          <p className="list_header_item counter">Кількість</p>
        </div>
        {cart.length != 0 &&
          cart.map((item) => (
            <div className="list_firnitur_choosen" key={item._id}>
              <div className="list_firnitur_item" key={item._id}>
                <img src="/HDL-301-main.png" className="image_furniture" />
                <div className="title_item">
                  <h3>{item.title}</h3>
                  {item?.depends.map((dep) => (
                    <div key={dep}>
                      <p>{dep}</p>
                    </div>
                  ))}
                </div>
                <div className="image_second">
                    <img src="/HDL-301-second.png" className="image_furniture" />
                </div>
                <div>
                  {item?.colorsFurniture.map((el) => (
                    <div className="color_prise" key={el._id}>
                      <p className="el_color">{el.color}</p>
                      <p className="el_price">{el.price} грн</p>
                    </div>
                  ))}
                </div>
                <div className="list_furniture_buttons_wrap">
                <div
                  className="list_furniture_button left_button"
                  onClick={() => handleDec(item.title)}
                >
                  -
                </div>
                <p>{item?.count}</p>
                <div
                  className="list_furniture_button right_button"
                  onClick={() => handleInc(item.title)}
                >
                  +
                </div>
              </div>
                <div className="del_item_furniture" onClick={() => remove(item.title)}>X</div>
              </div>
              {/* <div className="list_furniture_buttons_wrap">
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
              </div> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListTheChoseFurniture;
