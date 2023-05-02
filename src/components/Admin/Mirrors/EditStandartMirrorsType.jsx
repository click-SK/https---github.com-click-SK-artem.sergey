import React, { useEffect, useState } from "react";
import { AiFillEdit, AiFillCloseCircle } from "react-icons/ai";
import {BsFillArrowDownCircleFill, BsFillArrowUpCircleFill} from 'react-icons/bs';
import EditStandartMirrorsGoods from './EditStandartMirrorsGoods';
import '../../../style/admin.scss'

const EditStandartMirrorsType = ({item, idxType}) => {
    const [showBlock, setShowblock] = useState(false);
    const [isShowInput, setIsShowInput] = useState(false);
    const [typeNameValue, setTypeNameValue] = useState("");
    const [typeGoodsValue, setTypeGoodsValue] = useState([]);
    const changeNameSection = (item) => {
        setTypeNameValue(item.name);
        setTypeGoodsValue(item.goods)
      };

      const sendData = () => {
        fetch('https://calc-shower.herokuapp.com/update-type', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            typeIndex: idxType,
            name: typeNameValue,
            goods: typeGoodsValue
          })
        })
          .then((res) => res.json())
          setTimeout(() => {
            window.location.reload();
          },1000)
      }
      
    return (
        <div className="mirrors_item_edit">
        <div className="edit_item_wrap"
          // style={{
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          // }}
          onClick={() => changeNameSection(item)}
        >
          <h3>{item.name}</h3>
          {isShowInput ?
          <AiFillCloseCircle 
          style={{ height: "30px", width: "20px", cursor:'pointer' }} 
          onClick={() => setIsShowInput(isShowInput => !isShowInput)}/>
          :
          <AiFillEdit 
          style={{ height: "30px", width: "20px", cursor:'pointer' }} 
          onClick={() => setIsShowInput(isShowInput => !isShowInput)}/>
          }
        </div>
        <div>
          {isShowInput &&
           <div>
            <input value={typeNameValue} onChange={(e) => setTypeNameValue(e.target.value)}/>
            <button onClick={sendData} style={{ cursor:'pointer' }}>Підтвердити зміни</button>
           </div>
           }
          </div>
        {showBlock ?
        <BsFillArrowUpCircleFill 
        style={{ height: "30px", width: "20px", cursor: 'pointer' }} 
        onClick={() => setShowblock(showBlock => !showBlock)}/> 
        :
        <BsFillArrowDownCircleFill 
        className="arrow_whow_block"
        style={{ height: "30px", width: "20px", cursor: 'pointer' }} 
        onClick={() => setShowblock(showBlock => !showBlock)}/> 
        }
        {showBlock &&
                <div className="edit_option_wrap">
                {item.goods.map((el, idxGoods) => (
                  <EditStandartMirrorsGoods el={el} idxType={idxType} idxGoods={idxGoods} key={el.name}/>
                ))}
              </div>
        }
      </div>
    );
};

export default EditStandartMirrorsType;