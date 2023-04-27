import React, { useState } from "react";

const EditShowerFurnitureColorAndPrice = ({item, showerFurnitureId, showerId}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [currentColorValue, setCurrentColorValue] = useState('');
    const [currentPriceValue, setCurrentPriceValue] = useState(0);

    const handleEditButton = () => {
        setIsEdit((isEdit) => !isEdit);
        setCurrentColorValue(item.color);
        setCurrentPriceValue(item.price);
      };
    

    const handleEditButtonSave = () => {
        setIsEdit((isEdit) => !isEdit);

        fetch('https://calc-shower.herokuapp.com/update-furniture-color', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            color: currentColorValue,
            price: currentPriceValue,
            showerCabinId: showerId,
            furnitureId: showerFurnitureId,
            currentId: item._id
          })
        })
          .then((res) => res.json())
          setTimeout(() => {
            window.location.reload();
          },1000)
      }

    return (
    <div >
        <p>{item.color}</p>
        <p>{item.price}</p>
        {!isEdit ? (
          <button onClick={handleEditButton}>Редагувати</button>
        ) : (
          <button onClick={handleEditButtonSave}>Зберегти зміни</button>
        )}
        {isEdit && (
        <div>
          <input value={currentColorValue} onChange={(e) => setCurrentColorValue(e.target.value)} className="edit_input" />
          <input value={currentPriceValue} onChange={(e) => setCurrentPriceValue(e.target.value)} className="edit_input" />
        </div>
      )}
    </div>
    );
};

export default EditShowerFurnitureColorAndPrice;