import React, { useState } from "react";
import {AiFillDelete} from 'react-icons/ai';
import '../../../style/admin.scss'

const EditShowerMirrorsTemplate = ({el, showerId}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [currentColorValue, setCurrentColorValue] = useState('');
    const [currentPriceValue, setCurrentPriceValue] = useState(0);

    const handleEditButton = () => {
        setIsEdit((isEdit) => !isEdit);
        setCurrentColorValue(el.name);
        setCurrentPriceValue(el.price);
      };

      const handleEditButtonSave = () => {
        setIsEdit((isEdit) => !isEdit);

        fetch('https://calc-shower.herokuapp.com/update-shower-color', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: currentColorValue,
            price: currentPriceValue,
            typeId: el._id
          })
        })
          .then((res) => res.json())
          setTimeout(() => {
            window.location.reload();
          },1000)
      }

      const handleDelete = () => {
        fetch('https://calc-shower.herokuapp.com/remove-shower-glass-thickness', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            currentId: el._id,
            showerId: showerId,
          })
        })
          .then((res) => res.json())
          setTimeout(() => {
            window.location.reload();
          },1000)
      }

    return (
        <div className="color_galas_wrap">
          <div className="edite" >
          <p>{el.name}</p>
          <p>{el.price}</p>
          {!isEdit ? (
            <>
            <button onClick={handleEditButton}>Редагувати</button>
            <AiFillDelete onClick={handleDelete}/>
            </>
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
        </div>
        
    );
};

export default EditShowerMirrorsTemplate;