import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCart, incrementCart, changeFurniture } from '../../store/cart';
import "../../style/modal.scss";

const DispalayModalItems = ({item}) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);

    const addFurniture = (i) => {
      let copyFurniture = {...i};
      let isCart = false
      cart.forEach((el) => {
        if(el.title == i.title) {
          isCart = true;
          dispatch(incrementCart(el.title))
        }
      })
  
      if(!isCart) {
        dispatch(addCart(copyFurniture))
      }
    }

    return (
        <div className="furniture_block">
        {/* <h4>Image main {item.mainImage}</h4> */}
        <img src={item.mainImage} style={{width:'120px'}} className='image_furniture'/>
        <div style={{maxWidth:'150px'}}>
        <h2 >{item.title}</h2>
          {item?.depends.map((depends) => (
            <div key={depends}>
              <p>{depends}</p>
            </div>
          ))}
        </div>
        {/* <h4>Image drawind {item.drawingImg}</h4> */}
        <img style={{width:'120px'}} src={item.drawingImg} className='image_furniture'/>
        <button className='add_furniture' onClick={() => addFurniture(item)}>Додати <br/> в кошик</button>
      </div>
    );
};

export default DispalayModalItems;