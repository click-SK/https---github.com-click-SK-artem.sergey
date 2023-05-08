import React, { useEffect, useState } from "react";
import { AiFillEdit, AiFillCloseCircle, AiFillDelete } from "react-icons/ai";
import '../../../style/admin.scss'

const EditStandartMirrorsGoods = ({el, idxType, idxGoods, showerId, typeName, updateGoodsPath, deleteGoodsPath, setIsFetch}) => {
  const [isEditGood, setIsEditGood] = useState(false);
  const [goodsNameValue, setGoodNameValue] = useState("");
  const [goodsPriceValue, setGoodPriceValue] = useState("");

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
            style={{ height: "30px", width: "30px", cursor:'pointer' }}
            onClick={() => changeBlock(el)}
          />
          :
          <AiFillCloseCircle
          style={{ height: "30px", width: "30px", cursor:'pointer' }}
          onClick={() => setIsEditGood((isEditGood) => !isEditGood)}
        />
      }

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
      <AiFillDelete onClick={handleDelete}/>
    </div>
  );
};

export default EditStandartMirrorsGoods;
