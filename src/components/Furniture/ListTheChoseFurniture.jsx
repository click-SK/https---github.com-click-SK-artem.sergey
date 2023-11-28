import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import ListTheChoseCurrentFurniture from './ListTheChoseCurrentFurniture'
import "../../style/modal.scss";
import {
  incrementCart,
  decrementCart,
  removeAll,
  removeCart,
} from "../../store/cart";

const ListTheChoseFurniture = () => {
  const [copycart, setCopyCart] = useState([]);
  const cart = useSelector((state) => state.cart.items);

  useEffect(() => {
    setCopyCart(cart)
  },[cart])

  console.log('cart',cart);



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
        {copycart.length != 0 &&
          copycart.map((item) => (
            <ListTheChoseCurrentFurniture 
            key={item._id}
            item={item}/>
          ))}
      </div>
    </div>
  );
};

export default ListTheChoseFurniture;
