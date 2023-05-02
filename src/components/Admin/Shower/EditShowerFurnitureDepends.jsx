import React, { useState } from "react";
import {AiFillDelete} from 'react-icons/ai';
import '../../../style/admin.scss'

const EditShowerFurnitureDepends = ({el, showerId, showerFurnitureId, fullArray, idx}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [currentValue, setCurrentValue] = useState('');


  const handleEditButton = () => {
    setIsEdit((isEdit) => !isEdit);
    setCurrentValue(el)
  };

  console.log('idx',idx);

  const handleEditButtonSave = () => {
    let newArr = [...fullArray];
    const currentIndex = fullArray.indexOf(el);
    newArr.splice(currentIndex,1, currentValue);

    // setIsEdit((isEdit) => !isEdit);

    fetch('https://calc-shower.herokuapp.com/update-shower-furniture-depends', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        colors: newArr,
        showerCabinId: showerId,
        furnitureId: showerFurnitureId,
        idx: idx
      })
    })
      .then((res) => res.json())
      setTimeout(() => {
        window.location.reload();
      },1000)
  }

  const handleDeleteDepends = () => {
    let newArr = [...fullArray];
    const currentIndex = fullArray.indexOf(el);
    newArr.splice(currentIndex,1);

    fetch('https://calc-shower.herokuapp.com/update-shower-furniture-depends', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        colors: newArr,
        showerCabinId: showerId,
        furnitureId: showerFurnitureId,
        idx: idx
      })
    })
    .then((res) => res.json())
    setTimeout(() => {
      window.location.reload();
    },1000)
  }

    return (
      <div className="edit_wraper_title-color">
      <div key={el} className="edit_shower_color_block">
        {el}
        {!isEdit ? (
        <>
          <button onClick={handleEditButton}>Редагувати</button>
          <AiFillDelete onClick={handleDeleteDepends}/>
        </>
        ) : (
          <button onClick={handleEditButtonSave}>Зберегти зміни</button>
        )}
      </div>
      {/* <div></div> */}
      {isEdit && (
        <div>
          <input value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} className="edit_input" />
        </div>
      )}
    </div>
    );
};

export default EditShowerFurnitureDepends;