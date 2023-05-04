import React, { useState, useRef } from "react";
import { AiFillEdit, AiFillCloseCircle, AiFillDelete } from "react-icons/ai";
import {BsFillArrowDownCircleFill, BsFillArrowUpCircleFill} from 'react-icons/bs';
import O_EditFurnitureDepends from "./O_EditFurnitureDepends";
import O_EditFurnitureColorAndPrice from "./O_EditFurnitureColorAndPrice";
import '../../../style/admin.scss'

const O_EditFurnitureTemplate = ({ el, showerId, furnitureIdx, 
  pathUpdateMainImg, pathUpdateSecondImg, pathUpdateTitle, pathAddNewDepends, 
  pathAddNewColors, pathDeleteFurniture, pathUpdateFurnitureColors, pathDeleteFurnitureColors,
  pathUpdateFurnituredepends, pathDeleteFurnituredepends, partitionsType }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isFurniture, setIsFurniture] = useState(false);
  const [titleValue, setTitlevalue] = useState('');
  const [partitionsTypeValue, setPartitionsTypevalue] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [newValueDepends, setNewValueDepends] = useState('');
  const [furnitureColorName, setFurnitureColorName] = useState('')
  const [furnitureColorPrice, setFurnitureColorPrice] = useState('');
  const inputFileRef = useRef(null);

  const handleEdit = () => {
    setIsEdit((isEdit) => !isEdit)
    setTitlevalue(el.title);
    setPartitionsTypevalue(el.partitionsType)
  }

  const handleEditMainImage = async () => {
    setIsEdit((isEdit) => !isEdit);
    const formData = new FormData();   
    formData.append('mainImage',selectedFile);
    formData.append('furnitureId',el?._id);
    formData.append('showerId',showerId);

    fetch(pathUpdateMainImg, {
      method: 'PATCH',
      body: formData
    })
      .then((res) => res.json())
      setTimeout(() => {
        window.location.reload();
      },1000)
  }

  const handleEditSecondImage = async () => {
    setIsEdit((isEdit) => !isEdit);
    const formData = new FormData();   
    formData.append('drawingImg',selectedFile);
    formData.append('furnitureId',el?._id);
    formData.append('showerId',showerId);

    fetch(pathUpdateSecondImg, {
      method: 'PATCH',
      body: formData
    })
      .then((res) => res.json())
      setTimeout(() => {
        window.location.reload();
      },1000)
  }

  const handleEditFurnitureTitle = async () => {
    setIsEdit((isEdit) => !isEdit);

    fetch(pathUpdateTitle, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: titleValue,
        partitionsType: partitionsTypeValue,
        furnitureId: el?._id,
        showerId: showerId
      })
    })
      .then((res) => res.json())
      setTimeout(() => {
        window.location.reload();
      },1000)
  }

  const handleAddNewDepends = () => {
    let fullArray = el?.depends;
    let newArr = [...fullArray];
    const currentIndex = fullArray.indexOf(el);
    newArr.push(newValueDepends);

    fetch(pathAddNewDepends, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        colors: newArr,
        showerCabinId: showerId,
        furnitureId: el._id,
        idx: furnitureIdx
      })
    })
      .then((res) => res.json())
      setTimeout(() => {
        window.location.reload();
      },1000)
  }

  const handleAddNewColorsFurniture = () => {
    fetch(pathAddNewColors, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        color: furnitureColorName,
        price: furnitureColorPrice,
        showerId: showerId,
        furnitureId: el?._id,

      })
    })
      .then((res) => res.json())
      setTimeout(() => {
        window.location.reload();
      },1000)
  }

  const handleDeleteFurniture = () => {
    fetch(pathDeleteFurniture, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        showerId: showerId,
        furnitureId: el?._id
      })
    })
      .then((res) => res.json())
      setTimeout(() => {
        window.location.reload();
      },1000)
  }

  const changeFunc = (e) => {
    setSelectedFile(e.target.files[0]);
    const reader = new FileReader();

    reader.onload = (event) => {
        const fileUrl = event.target.result;
        setImageUrl(fileUrl);
    };

    reader.readAsDataURL(e.target.files[0]);
}

  
  return (
    <>
      <div className="furniture_edit_block">
        <div className="main_img_wrap">
        <img src={`${el.mainImage}`} className="main_img"/>
        </div>
        <p>{el.title}</p>
        <div className="main_img_wrap">
        <img src={`${el.drawingImg}`} className="main_img"/>
        </div>
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
        <AiFillDelete onClick={handleDeleteFurniture}/>
      </div>
      {isEdit && (
        <div className="edit_furniture">
          <div >
          <div>
            <button onClick={() => inputFileRef.current.click()}>Змінити фото</button>
          </div>
          <div>
          <button onClick={handleEditMainImage}>Підтвердити зміни</button>
          </div>
          </div>
          <input type='file'
                        hidden
                        ref={inputFileRef}
                        onChange={changeFunc}
                    />
          <div>
            <p>Змінити заголовок</p>
            <input className="edit_name" value={titleValue} onChange={(e) => setTitlevalue(e.target.value)}/>
            <p>Змінити тип</p>
            <input className="edit_name" value={partitionsTypeValue} onChange={(e) => setPartitionsTypevalue(e.target.value)}/>
            <div>
            <button onClick={handleEditFurnitureTitle}>Підтвердити зміни</button>
            </div>
          </div>
          <div >
          <div>
            <button onClick={() => inputFileRef.current.click()}>Змінити фото</button>
          </div>
          <div>
          <button onClick={handleEditSecondImage}>Підтвердити зміни</button>
          </div>
          </div>
          {/* <button onClick={handleEditMainImage}>Підтвердити зміни</button> */}
        </div>
      )}
      {isFurniture && (
        <div className="edit_item">
          <div className="edit_title" >
            <h3>Редагування підзаголовків:</h3>
            {el?.depends.map((item,idx) => (
              <O_EditFurnitureDepends key={idx} idx={furnitureIdx} 
              fullArray={el?.depends} el={item} showerId={showerId} 
              showerFurnitureId={el._id}
              pathUpdateFurnituredepends={pathUpdateFurnituredepends}
              pathDeleteFurnituredepends={pathDeleteFurnituredepends}
              />

            ))}
            <input placeholder="Назва" value={newValueDepends} onChange={(e) => setNewValueDepends(e.target.value)}/>
            <button onClick={handleAddNewDepends}>Додати новий</button>
          </div>
          <div className="edit_color">
            <h3>Редагування кольорів та цін:</h3>
            {el.colorsFurniture.map((item, idx) => (
                <O_EditFurnitureColorAndPrice key={idx} item={item} 
                showerFurnitureId={el._id} showerId={showerId}
                pathUpdateFurnitureColors={pathUpdateFurnitureColors}
                pathDeleteFurnitureColors={pathDeleteFurnitureColors}
                />
            ))}
            <div className="add_new_color">
              <input placeholder="Назва" value={furnitureColorName} onChange={(e) => setFurnitureColorName(e.target.value)}/>
              <input placeholder="Ціна" value={furnitureColorPrice} onChange={(e) => setFurnitureColorPrice(e.target.value)}/>
              <button onClick={handleAddNewColorsFurniture}>Додати новий</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default O_EditFurnitureTemplate;