import React, { useState, useRef, useEffect } from "react";
import ModalDefaultFurniture from '../../Furniture/ModalDefaultFurniture'
import {AiFillDelete} from 'react-icons/ai';
import '../../../style/admin.scss'

const EditShowerTypeWithFurniture = ({el,showerId, pathDelete, pathEdit, setIsFetch, allFurniture, idx}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [currentColorValue, setCurrentColorValue] = useState('');
    const [currentPriceValue, setCurrentPriceValue] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [inputKey, setInputKey] = useState(0); // Додано стан для key атрибуту
    const inputFileRef = useRef(null);

    useEffect(() => {
      if (image) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageSrc(reader.result);
        };
        reader.readAsDataURL(image);
      }
    }, [image]);

    const handleImageChange = (e) => {
      // const file = e.target.files[0];
      setImage(e.target.files[0]);
    };

    const removeImage = () => {
      setImage(null);
      setImageSrc(null);
      setInputKey((prevKey) => prevKey + 1); // Збільшуємо значення key атрибуту
    };
  

    const handleOpenModal = () => {
      setModalIsOpen(true);
    };

    const handleCloseModal = () => {
      setModalIsOpen(false);
    };

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
            setIsFetch(state=>!state)
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
            setIsFetch(state=>!state)
          },1000)
      }

      const handleEditImage = async () => {
        const formData = new FormData();   
        formData.append('showerImage',image);
        formData.append('typeId',el?._id);
        formData.append('showerId',showerId);
    
        fetch('update-shower-type-image', {
          method: 'PATCH',
          body: formData
        })
          .then((res) => res.json())
          .then((res) => {
            console.log('res',res);
            if(res?.message == 'No photo chosen') {
              console.log('1');
              alert('Виникла помилка')
            } else {
              console.log('2');
              alert('Фото додано')
            }
          })
          setTimeout(() => {
            // window.location.reload();
            setIsFetch(state=>!state);
          },1000)
      }

    //   const changeFunc = (e) => {
    //     setSelectedFile(e.target.files[0]);
    // }
    

    return (
      <div className="edit_type_wrap_with_photo">
      <div className="img_shower_wrap_admin">
      {imageSrc ? (
            <img src={imageSrc} />
            
          ) : (
            <img src={el.showerImage} />
          )}
      </div>
        <div className="edit_type_wrap-item" >
        <p>{el.name}</p>
        <p>{el.price}</p>
        {!isEdit ? (
          <>
          <button onClick={handleEditButton}>Редагувати</button>
          <button style={{background:'orange'}} onClick={handleOpenModal}>Додати фурнітуру</button>
          {/* <button style={{margin: '5px 0px'}} onClick={() => inputFileRef.current.click()}>Змінити фото</button> */}
          {!imageSrc && (
            <button style={{margin: '5px 0px', background:'red'}} onClick={() => inputFileRef.current.click()}>Змінити фото</button>
          )}
                      {imageSrc && (
              <>
                {/* <img src={imageSrc} alt="Selected" /> */}
                <button style={{background:'red'}} onClick={removeImage}>Видалити</button>
              </>
            )}
          <button style={{background:'green'}} onClick={handleEditImage}>Зберегти фото</button>
          <input type='file'
                        hidden
                        ref={inputFileRef}
                        onChange={handleImageChange}
                        key={inputKey}
                    />
          <ModalDefaultFurniture
          isOpen={modalIsOpen}
          onClose={handleCloseModal}
          defaultFurnitureProps={el?.defaultFurniture}
          allFurniture={allFurniture}
          idx={idx}
          setIsFetch={setIsFetch}
        />
          <AiFillDelete onClick={handleDelete} style={{cursor:'pointer',width:'auto', height:'20px', color:'rgb(44 44 44)'}}/>
          </>
        ) : (
          <div>
          <button style={{margin: '5px 0px'}} onClick={handleEditButtonSave}>Зберегти зміни</button>
          </div>
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

export default EditShowerTypeWithFurniture;