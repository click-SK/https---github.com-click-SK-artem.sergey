import React, { useState } from "react";
import '../../../style/admin.scss'


const EditShowerSizeTemplate = ({el, pathEdit}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [currentPriceValue, setCurrentPriceValue] = useState(0);

    const handleEditButton = () => {
        setIsEdit((isEdit) => !isEdit);
        setCurrentPriceValue(el.price);
      };

      const handleEditButtonSave = () => {
        setIsEdit((isEdit) => !isEdit);

        fetch(pathEdit, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            price: currentPriceValue,
            name: el.name,
            typeId: el._id
          })
        })
          .then((res) => res.json())
          setTimeout(() => {
            window.location.reload();
          },1000)
      }

    return (
        <div className="edit_size_wrap" >
          <div className="edit_size_wrap-item">
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
    </div>
    );
};

export default EditShowerSizeTemplate;