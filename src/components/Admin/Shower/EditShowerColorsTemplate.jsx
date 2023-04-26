import React, { useState } from "react";

const EditShowerColorsTemplate = ({ el, fullColors, showerId }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [currentValue, setCurrentValue] = useState('');

  const handleEditButton = () => {
    setIsEdit((isEdit) => !isEdit);
    setCurrentValue(el);
  };



  const handleEditButtonSave = () => {
    setIsEdit((isEdit) => !isEdit);

    let newArr = [...fullColors];
    const currentIndex = fullColors.indexOf(el);
    newArr.splice(currentIndex,1, currentValue);

    fetch('https://calc-shower.herokuapp.com/update-shower-colors', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        colors: newArr,
        showerCabinId: showerId
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

export default EditShowerColorsTemplate;
