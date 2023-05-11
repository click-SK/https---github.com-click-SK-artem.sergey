import React, { useState } from "react";
import {AiFillDelete} from 'react-icons/ai';
import '../../../style/admin.scss'

const O_EditColorTemplate = ({el, pathDelete, pathEdit, showerId, setIsFetch}) => {
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

        fetch(pathEdit, {
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
            // window.location.reload();
            setIsFetch(state=>!state);
          },1000)
      }

      const handleDelete = () => {
        fetch(pathDelete, {
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
            // window.location.reload();
            setIsFetch(state=>!state);
          },1000)
      }
    return (
        <div className="edit_type_wrap">
        <div className="edit_type_wrap-item" >
        <p>{el.name}</p>
        <p>{el.price}</p>
        {!isEdit ? (
          <>
          <button onClick={handleEditButton}>Редагувати</button>
          <AiFillDelete onClick={handleDelete} style={{cursor:'pointer',width:'auto', height:'20px', color:'rgb(44 44 44)'}}/>
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

export default O_EditColorTemplate;