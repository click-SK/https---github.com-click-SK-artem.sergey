import React, { useState } from "react";

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

    fetch('http://localhost:4444/update-shower-furniture-depends', {
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
      <div>
      <div key={el} className="edit_shower_color_block">
        {el}
        {!isEdit ? (
          <button onClick={handleEditButton}>Редагувати</button>
        ) : (
          <button onClick={handleEditButtonSave}>Зберегти зміни</button>
        )}
      </div>
      <div></div>
      {isEdit && (
        <div>
          <input value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} className="edit_input" />
        </div>
      )}
    </div>
    );
};

export default EditShowerFurnitureDepends;