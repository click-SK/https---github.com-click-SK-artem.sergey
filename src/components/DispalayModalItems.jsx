import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCart, incrementCart, changeFurniture } from '../store/cart';

const DispalayModalItems = ({item}) => {
    const [colorAndPrice, setColorAndPrice] = useState(null);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);

    const addFurniture = (i) => {
      let copyFurniture = {...i};
      let isCart = false
      cart.forEach((el) => {
        if(el.title == i.title) {
          dispatch(changeFurniture(colorAndPrice))
          // el?.colorsFurniture = [colorAndPrice];
          isCart = true;
          dispatch(incrementCart(el.title))
        }
      })
  
      if(!isCart) {
        if(colorAndPrice) {
          copyFurniture.colorsFurniture = [colorAndPrice];
        }
        dispatch(addCart(copyFurniture))
      }
    }

    const handleColorAndPrice = (e) => {
        const selectedColor = JSON.parse(e.target.value);
        setColorAndPrice(selectedColor)
    }


    return (
        <div className="furniture_block">
        {/* <h4>Image main {item.mainImage}</h4> */}
        <img src='/HDL-301-main.png' className='image_furniture'/>
        <div>
        <h2>{item.title}</h2>
          {item?.depends.map((depends) => (
            <div key={depends}>
              <p>{depends}</p>
            </div>
          ))}
        </div>
        {/* <h4>Image drawind {item.drawingImg}</h4> */}
        <img src='/HDL-301-second.png' className='image_furniture'/>
        <select value={colorAndPrice ? JSON.stringify(colorAndPrice) : ""} onChange={(e) => handleColorAndPrice(e)}>
        <option value="" disabled>
                  Оберіть колір
                </option>
          {item?.colorsFurniture.map((col, idx) =>(
            <option key={idx} value={JSON.stringify(col)}>
              {col.color} - 
              {col.price}$
            </option>
          ))}
        </select>
        <button onClick={() => addFurniture(item)}>Add</button>
      </div>
    );
};

export default DispalayModalItems;