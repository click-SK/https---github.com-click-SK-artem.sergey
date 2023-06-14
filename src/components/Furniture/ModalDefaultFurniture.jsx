import React, {useState, useEffect} from "react";
import "../../style/modal.scss";
import DispalayModalItems from "./DispalayModalItems";
import DispalayModalItemsDefaultFurniture from './DispalayModalItemsDefaultFurniture';
import DispalayModalItemsDefaultAllFurniture from './DispalayModalItemsDefaultAllFurniture';
import {AiOutlineClose} from 'react-icons/ai';

const ModalDefaultFurniture = ({ isOpen, onClose, defaultFurnitureProps, allFurniture, idx, setIsFetch }) => {
  const [defaultFurnitureArray, setDefaultFurnitureArray] = useState([]);
  useEffect(() => {
    setDefaultFurnitureArray(defaultFurnitureProps);
  },[])
  if (!isOpen) return null;

  const handleAddNewType = () => {    
    fetch('https://sklo-expert.herokuapp.com/update-default-furniture', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        index: idx,
        newDefaultFurniture: defaultFurnitureArray
      })
    })
      .then((res) => res.json())
      setTimeout(() => {
        setIsFetch(state=>!state);
        alert('Фурнітуру оновлено')
      },1000)
  }


  const deleteElementInArrayFunc = (item) => {
    console.log('delete item',item);
    let newArray = [...defaultFurnitureArray];
    newArray = newArray.filter(el => item.title !== el.title)
    console.log('newArrayAfterDelete',newArray);
    setDefaultFurnitureArray(newArray);
  }

  const addElementInArrayFunc = (item) => {
    const isAlreadyAdded = defaultFurnitureArray.some((el) => el.title === item.title);
  
    if (isAlreadyAdded) {
      alert('Фурнітура вже додана');
      return;
    }
  
    const newArray = [...defaultFurnitureArray, item];
    setDefaultFurnitureArray(newArray);
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
      <button onClick={handleAddNewType}>Зберегти зміни</button>
        <button className="close-btn" onClick={onClose}>
        <AiOutlineClose className="cross"/>
        </button>
        <div style={{display:'flex',justifyContent:'center', borderBottom: '1px solid #0c71a5'}}>
        <p style={{fontSize: '16px',minWidth: '100%',textAlign:'center'}}>Моя фурнітура</p>
        </div>
        <div className="furniture_wrap">
          {defaultFurnitureArray.map((item) => (
            <DispalayModalItemsDefaultFurniture key={item._id} item={item}
            deleteElementInArrayFunc={deleteElementInArrayFunc}/>
          ))}
        </div>
        <div style={{display:'flex',justifyContent:'center', borderBottom: '1px solid #0c71a5'}}>
        <p style={{fontSize: '16px',minWidth: '100%',textAlign:'center'}}>Вся фурнітура</p>
        </div>
        <div className="furniture_wrap">
          {allFurniture.map((item) => (
            <DispalayModalItemsDefaultAllFurniture 
            ey={item._id} item={item}
            addElementInArrayFunc={addElementInArrayFunc}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalDefaultFurniture;
