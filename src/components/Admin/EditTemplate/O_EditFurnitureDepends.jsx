import React, { useState } from "react";
import {AiFillDelete} from 'react-icons/ai';
import '../../../style/admin.scss'

const O_EditFurnitureDepends = ({el, showerId, showerFurnitureId, fullArray, idx,pathUpdateFurnituredepends, pathDeleteFurnituredepends, setIsFetch }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [currentValue, setCurrentValue] = useState('');


  const handleEditButton = () => {
    setIsEdit((isEdit) => !isEdit);
    setCurrentValue(el)
  };

  console.log('fullArray',fullArray);

  const handleEditButtonSave = () => {
    setIsEdit((isEdit) => !isEdit);
    let newArr = [...fullArray];
    const currentIndex = fullArray.indexOf(el);
    newArr.splice(currentIndex,1, currentValue);

    // setIsEdit((isEdit) => !isEdit);

    fetch(pathUpdateFurnituredepends, {
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
        // window.location.reload();
        setIsFetch(state=>!state);
      },1000)
  }

  const handleDeleteDepends = () => {
    let newArr = [...fullArray];
    const currentIndex = fullArray.indexOf(el);
    newArr.splice(currentIndex,1);

    fetch(pathDeleteFurnituredepends, {
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
      // window.location.reload();
      setIsFetch(state=>!state);
    },1000)
  }

    return (
      <div className="edit_wraper_title-color">
      <div key={el} className="edit_shower_color_block">
        {el}
        {!isEdit ? (
        <>
          <button onClick={handleEditButton}>Редагувати</button>
          <AiFillDelete onClick={handleDeleteDepends} style={{cursor:'pointer',width:'auto', height:'20px', color:'rgb(44 44 44)'}}/>
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

export default O_EditFurnitureDepends;