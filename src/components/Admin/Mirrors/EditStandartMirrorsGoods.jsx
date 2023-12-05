import React, { useState, useRef, useEffect } from "react";
import { AiFillEdit, AiFillCloseCircle, AiFillDelete } from "react-icons/ai";
import '../../../style/admin.scss'
import "../../../style/edir-shower.scss";

const EditStandartMirrorsGoods = ({el, idxType, idxGoods, showerId, typeName, updateGoodsPath, deleteGoodsPath, setIsFetch}) => {
  const [isEditGood, setIsEditGood] = useState(false);
  const [goodsNameValue, setGoodNameValue] = useState("");
  const [goodsPriceValue, setGoodPriceValue] = useState("");
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

  const handleEditImage = async () => {
    const formData = new FormData();   
    formData.append('mirrorsImage',image);
    formData.append('goodsIdx',idxGoods);
    formData.append('typeIdx',idxType);
    formData.append('name',el.name);
    formData.append('price',el.price);

    fetch('https://sklo-expert-server-v2-9a33eddf90a1.herokuapp.com/update-mirror-standart-goods-image', {
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
  
  const changeBlock = (item) => {
    setIsEditGood((isEditGood) => !isEditGood);
    setGoodNameValue(item.name);
    setGoodPriceValue(item.price);
  };

  const sendData = () => {
    fetch(updateGoodsPath, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        typeIndex: idxType,
        goodsIndex: idxGoods,
        name: goodsNameValue,
        price: goodsPriceValue
      })
    })
      .then((res) => res.json())
      setTimeout(() => {
        // window.location.reload();
        setIsFetch(state=>!state);
      },1000)
  }

  const handleDelete = () => {
    fetch(deleteGoodsPath, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: el.name,
        typeName: typeName,
      })
    })
      .then((res) => res.json())
      setTimeout(() => {
        // window.location.reload();
        setIsFetch(state=>!state);
      },1000)
  }

  return (
    <div >
      {!isEditGood ?
            <AiFillEdit
            style={{cursor:'pointer',width:'auto', height:'20px', color:'rgb(44 44 44)'}}
            onClick={() => changeBlock(el)}
          />
          :
          <AiFillCloseCircle
          style={{cursor:'pointer',width:'auto', height:'20px', color:'rgb(44 44 44)'}}
          onClick={() => setIsEditGood((isEditGood) => !isEditGood)}
        />
      }

<div className="img_shower_wrap_admin">          
      {imageSrc ? (
        <img src={imageSrc} />
        
      ) : (
        <img src={el.mirrorsImage} />
      )}
      </div>
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

      <p>{el.name}</p>
      <p>{el.price}</p>
      {isEditGood && (
        <div className="wrap">
          <input
          className="first_input"
          value={goodsNameValue}
          onChange={(e) => setGoodNameValue(e.target.value)}
          />
          <input
          className="second_input"
          value={goodsPriceValue}
          onChange={(e) => setGoodPriceValue(e.target.value)}
          />
          <button onClick={sendData} style={{cursor:'pointer'}}>Підтвердити зміни</button>
        </div>
      )}
      <AiFillDelete onClick={handleDelete} style={{cursor:'pointer',width:'auto', height:'20px', color:'rgb(44 44 44)'}}/>
    </div>
  );
};

export default EditStandartMirrorsGoods;
