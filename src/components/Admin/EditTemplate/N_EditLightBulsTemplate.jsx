import React, { useState } from "react";
import '../../../style/admin.scss'

const N_EditLightBulsTemplate = ({currentValue, showerId, pathEdit, setIsFetch}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [newValue, setNewValue] = useState('');

    const handleEditButton = () => {
        setIsEdit((isEdit) => !isEdit);
        setNewValue(currentValue)
      };

    const handleEditButtonSave = () => {
        setIsEdit((isEdit) => !isEdit);
    
        fetch(pathEdit, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            lightBulbs: newValue,
            showerId: showerId
          })
        })
          .then((res) => res.json())
          setTimeout(() => {
            // window.location.reload();
            setIsFetch(state=>!state);
          },1000)
      }

    return (
        <div className="edit_glass_wrap">
        <div className="edit_glass_item">
          <p>{currentValue}</p>
          {!isEdit ? (
            <button onClick={handleEditButton}>Редагувати</button>
          ) : (
            <button onClick={handleEditButtonSave}>Зберегти зміни</button>
          )}
        </div>
        {isEdit && (
          <div>
            <input value={newValue} onChange={(e) => setNewValue(e.target.value)} className="edit_input" />
          </div>
        )}
      </div>
    );
};

export default N_EditLightBulsTemplate;