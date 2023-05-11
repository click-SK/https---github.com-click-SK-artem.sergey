import React, { useEffect, useState } from "react";
import { AiFillEdit, AiFillCloseCircle } from "react-icons/ai";
import {BsFillArrowDownCircleFill, BsFillArrowUpCircleFill} from 'react-icons/bs';
import EditStandartMirrorsGoods from './EditStandartMirrorsGoods';
import '../../../style/admin.scss'

const EditStandartMirrorsType = ({item, idxType, typeName, showerId, updateTypePath, deleteGoodsPath, addNewGoodsPath, updateGoodsPath, setIsFetch}) => {
    const [showBlock, setShowblock] = useState(false);
    const [isShowInput, setIsShowInput] = useState(false);
    const [typeNameValue, setTypeNameValue] = useState("");
    const [typeGoodsValue, setTypeGoodsValue] = useState([]);
    const [newValueGoodsName, setNewValueGoodsName] = useState('');
    const [newValueGoodsPrice, setNewValueGoodsPrice] = useState('');
    const changeNameSection = (item) => {
        setTypeNameValue(item.name);
        setTypeGoodsValue(item.goods)
      };

      const sendData = () => {
        fetch(updateTypePath, {
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
            // window.location.reload();
            setIsFetch(state=>!state);
          },1000)
      }

      const handleAddNewGoods = () => {    
        fetch(addNewGoodsPath, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newValueGoodsName,
            price: newValueGoodsPrice,
            typeName: typeName
          })
        })
          .then((res) => res.json())
          setTimeout(() => {
            // window.location.reload();
            setIsFetch(state=>!state);
            setNewValueGoodsName('');
            setNewValueGoodsPrice('');
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
          style={{cursor:'pointer',width:'auto', height:'20px', color:'rgb(44 44 44)'}} 
          onClick={() => setIsShowInput(isShowInput => !isShowInput)}/>
          :
          <AiFillEdit 
          style={{cursor:'pointer',width:'auto', height:'20px', color:'rgb(44 44 44)'}} 
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
        style={{cursor:'pointer',width:'auto', height:'20px', color:'rgb(44 44 44)'}} 
        onClick={() => setShowblock(showBlock => !showBlock)}/> 
        :
        <BsFillArrowDownCircleFill 
        className="arrow_whow_block"
        style={{cursor:'pointer',width:'auto', height:'20px', color:'rgb(44 44 44)'}} 
        onClick={() => setShowblock(showBlock => !showBlock)}/> 
        }
        {showBlock &&
                <div className="edit_option_wrap">
                {item.goods.map((el, idxGoods) => (
                  <>
                      <EditStandartMirrorsGoods el={el} idxType={idxType} idxGoods={idxGoods} 
                      key={el.name} showerId={showerId}
                      typeName={typeName}
                      setIsFetch={setIsFetch}
                      updateGoodsPath={updateGoodsPath}
                      deleteGoodsPath={deleteGoodsPath}/>
                  </>
                ))}
                        <>
        <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Назва" value={newValueGoodsName} onChange={(e) => setNewValueGoodsName(e.target.value)}/>
        <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Ціна" value={newValueGoodsPrice} onChange={(e) => setNewValueGoodsPrice(e.target.value)}/>
        <button className=" edit_new_glass_button edit_new_glass-color_button" onClick={handleAddNewGoods}>Додати новий</button>
        </>
              </div>
        }
      </div>
    );
};

export default EditStandartMirrorsType;