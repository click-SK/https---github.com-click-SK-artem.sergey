import React, { useState } from "react";
import { AiFillEdit, AiFillCloseCircle } from "react-icons/ai";
import {BsFillArrowDownCircleFill, BsFillArrowUpCircleFill} from 'react-icons/bs';
import EditShowerFurnitureDepends from "./EditShowerFurnitureDepends";
import EditShowerFurnitureColorAndPrice from "./EditShowerFurnitureColorAndPrice";
const EditShowerFurnitureTemplate = ({ el, showerId }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isFurniture, setIsFurniture] = useState(false);
  const [titleValue, setTitlevalue] = useState('');

  const handleEdit = () => {
    setIsEdit((isEdit) => !isEdit)
    setTitlevalue(el.title);
  }
  

  return (
    <>
      <div className="furniture_edit_block">
        <img src="/HDL-301-main.png" />
        <p>{el.title}</p>
        <img src="/HDL-301-second.png" />
        <AiFillEdit
          className="edit_icon"
          onClick={handleEdit}
        />
        {!isFurniture ? (
          <BsFillArrowDownCircleFill
            onClick={() => setIsFurniture((isFurniture) => !isFurniture)}
          />
        ) : (
          <BsFillArrowUpCircleFill
            onClick={() => setIsFurniture((isFurniture) => !isFurniture)}
          />
        )}
      </div>
      {isEdit && (
        <div className="edit_furniture">
          <div>
            <button>Змінити фото</button>
          </div>
          <div>
            <p>Змінити заголовок</p>
            <input value={titleValue} onChange={(e) => setTitlevalue(e.target.value)}/>
          </div>
          <div>
            <button>Змінити фото</button>
          </div>
          <button>Підтвердити зміни</button>
        </div>
      )}
      {isFurniture && (
        <div>
          <div>
            <h1>Редагування підзаголовків:</h1>
                <EditShowerFurnitureDepends el={el && el}/>
          </div>
          <div>
            <h1>Редагування кольорів та цін:</h1>
            {el.colorsFurniture.map((item, idx) => (
                <EditShowerFurnitureColorAndPrice key={idx} item={item} showerFurnitureId={el._id} showerId={showerId}/>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default EditShowerFurnitureTemplate;
