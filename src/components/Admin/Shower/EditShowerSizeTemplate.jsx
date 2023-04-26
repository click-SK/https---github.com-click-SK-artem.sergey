import React, { useState } from "react";


const EditShowerSizeTemplate = ({el}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [currentPriceValue, setCurrentPriceValue] = useState(0);

    const handleEditButton = () => {
        setIsEdit((isEdit) => !isEdit);
        setCurrentPriceValue(el.price);
      };

    const handleEditButtonSave = () => {
        setIsEdit((isEdit) => !isEdit);
      }
    return (
        <div >
        <p>{el.name}</p>
        <p>{el.price}</p>
        {!isEdit ? (
          <button onClick={handleEditButton}>Редагувати</button>
        ) : (
          <button onClick={handleEditButtonSave}>Зберегти зміни</button>
        )}
        {isEdit && (
        <div>
          <input value={currentPriceValue} onChange={(e) => setCurrentPriceValue(e.target.value)} className="edit_input" />
        </div>
      )}
    </div>
    );
};

export default EditShowerSizeTemplate;