import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    incrementCart,
    decrementCart,
    removeAll,
    removeCart,
    changeFurniture
  } from "../../store/cart";
const ListTheChoseCurrentFurniture = ({item}) => {
    const [colorAndPrice, setColorAndPrice] = useState(null);
    const dispatch = useDispatch();
    const remove = (name) => {
        dispatch(removeCart(name));
      };
    
      const handleInc = (name) => {
        dispatch(incrementCart(name));
      };
    
      const handleDec = (name) => {
        dispatch(decrementCart(name));
      };
    
          const handleColorAndPrice = (e) => {
            const selectedColor = JSON.parse(e.target.value);
            setColorAndPrice(selectedColor)
            dispatch(changeFurniture({
              selectedColor,
              item
            }))
        }

        console.log('colorAndPrice',colorAndPrice);
    
    return (
        <div className="list_firnitur_choosen">
        <div className="list_firnitur_item">
          <img src={item.mainImage} className="image_furniture" />
          <div className="title_item">
            <h3>{item.title}</h3>
            {item?.depends.map((dep) => (
              <div key={dep}>
                <p>{dep}</p>
              </div>
            ))}
          </div>
          <div className="image_second">
            <img src={item.drawingImg} className="image_furniture" />
          </div>
          <select
            className="choose_color"
            value={colorAndPrice ? JSON.stringify(colorAndPrice) : ""}
            onChange={(e) => handleColorAndPrice(e)}
          >
            <option value="" disabled>
              Оберіть колір
            </option>
            {item?.colorsFurniture.map((col, idx) => (
              <option key={idx} value={JSON.stringify(col)}>
                {col.color} -{col.price}
              </option>
            ))}
          </select>
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
          <div
            className="del_item_furniture"
            onClick={() => remove(item.title)}
          >
            X
          </div>
        </div>
      </div>
    );
};

export default ListTheChoseCurrentFurniture;