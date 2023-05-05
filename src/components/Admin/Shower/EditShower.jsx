import React, { useState, useEffect } from "react";
import '../../../style/edir-shower.scss';
import '../../../style/admin.scss'
import O_EditFurnitureTemplate from "../EditTemplate/O_EditFurnitureTemplate";
import A_EditColorsTemplate from "../EditTemplate/A_EditColorsTemplate";
import EditShowerMirrorsTemplate from "./EditShowerMirrorsTemplate";
import O_EditTypeTemplate from '../EditTemplate/O_EditTypeTemplate';
import O_EditSizeTemplate from "../EditTemplate/O_EditSizeTemplate";
import O_NamePriceTemplate from "../EditTemplate/O_NamePriceTemplate";

const EditShower = () => {
    const [currentObject, setCurrentObject] = useState({});
    const [showFurnitureBlock, setShowFurnitureBlock] = useState(true);
    const [showColorsBlock, setShowColorsBlock] = useState(false);
    const [showMirrorsBlock, setShowMirrorsBlock] = useState(false);
    const [showTypeBlock, setShowTypeBlock] = useState(false);
    const [showSizeBlock, setShowSizeBlock] = useState(false);
    const [newValueDepends, setNewValueDepends] = useState('');
    const [newValueGlassThicknessName, setNewValueGlassThicknessName] = useState('');
    const [newValueGlassThicknessPrice, setNewValueGlassThicknessPrice] = useState('');
    const [newValueTypeName, setNewValueTypeName] = useState('');
    const [newValueTypePrice, setNewValueTypePrice] = useState('');

    useEffect(() => {
        fetch("https://calc-shower.herokuapp.com/get-all-shower")
          .then((res) => res.json())
          .then((data) => {
            setCurrentObject(data[0]);
          })
          .catch((error) => console.error(error));
      }, []);

      const handleAddNewFurniture = () => {
        console.log('new furniture');
        fetch('https://calc-shower.herokuapp.com/add-new-furniture', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                showerId: currentObject._id
            })
          })
            .then((res) => res.json())
            setTimeout(() => {
              window.location.reload();
            },1000)
      }

      const handleAddNewColors = () => {
        let fullArray = currentObject.color;
        let newArr = [...fullArray];
        const currentIndex = fullArray.indexOf();
        newArr.push(newValueDepends);
    
        fetch('https://calc-shower.herokuapp.com/update-shower-colors', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            colors: newArr,
            showerCabinId: currentObject._id
          })
        })
          .then((res) => res.json())
          setTimeout(() => {
            window.location.reload();
          },1000)
      }

      const handleAddNewGlassThicknes = () => {    
        fetch('https://calc-shower.herokuapp.com/add-new-glass-thickness', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newValueGlassThicknessName,
            price: newValueGlassThicknessPrice,
            showerId: currentObject._id
          })
        })
          .then((res) => res.json())
          setTimeout(() => {
            window.location.reload();
          },1000)
      }

      const handleAddNewType = () => {    
        fetch('https://calc-shower.herokuapp.com/add-new-shower-type', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newValueTypeName,
            price: newValueTypePrice,
            showerId: currentObject._id
          })
        })
          .then((res) => res.json())
          setTimeout(() => {
            window.location.reload();
          },1000)
      }
      
    return (
        <div>
            <div className="shower-cabin-edit-header">
            <h1 className="header_item" onClick={() => setShowFurnitureBlock(showFurnitureBlock => !showFurnitureBlock)}>Фурнітура</h1>
            <h1 className="header_item"  onClick={() => setShowColorsBlock(showColorsBlock => !showColorsBlock)}>Скло</h1>
            <h1 className="header_item"  onClick={() => setShowMirrorsBlock(showMirrorsBlock => !showMirrorsBlock)}>Кольори</h1>
            <h1 className="header_item"  onClick={() => setShowTypeBlock(showTypeBlock => !showTypeBlock)}>Типи</h1>
            <h1 className="header_item"  onClick={() => setShowSizeBlock(showSizeBlock => !showSizeBlock)}>Розміри</h1>
            </div>
            {currentObject?.furniture && showFurnitureBlock && currentObject.furniture.map((el, furnitureIdx) => (
                <O_EditFurnitureTemplate key={el.title} el={el} 
                furnitureIdx={furnitureIdx} showerId={currentObject._id}
                pathUpdateMainImg='https://calc-shower.herokuapp.com/update-shower-furniture-main-image'
                pathUpdateSecondImg='https://calc-shower.herokuapp.com/update-shower-furniture-second-image'
                pathUpdateTitle='https://calc-shower.herokuapp.com/update-shower-furniture-title'
                pathAddNewDepends='https://calc-shower.herokuapp.com/update-shower-furniture-depends'
                pathAddNewColors='https://calc-shower.herokuapp.com/add-new-shower-furniture-colors'
                pathDeleteFurniture='https://calc-shower.herokuapp.com/remove-shower-furniture'
                pathUpdateFurnitureColors='https://calc-shower.herokuapp.com/update-furniture-color'
                pathDeleteFurnitureColors='https://calc-shower.herokuapp.com/remove-shower-furniture-colors'
                pathUpdateFurnituredepends='https://calc-shower.herokuapp.com/update-shower-furniture-depends'
                pathDeleteFurnituredepends='https://calc-shower.herokuapp.com/update-shower-furniture-depends'
                />
            ))}
            {showFurnitureBlock && <button className="add_new_furniture" onClick={handleAddNewFurniture}>Додати нову фурнітуру</button>}
            {currentObject?.color && showColorsBlock && currentObject.color.map((el, idx) => (
                 <A_EditColorsTemplate el={el} key={idx} 
                 fullColors={currentObject.color} showerId={currentObject._id}
                 pathDelete='https://calc-shower.herokuapp.com/update-shower-colors'
                 pathEdit='https://calc-shower.herokuapp.com/update-shower-colors'
                 />
            ))
            }
            {currentObject?.color && showColorsBlock && 
            <>
            <input className="edit_new_glass_input" placeholder="Назва" value={newValueDepends} onChange={(e) => setNewValueDepends(e.target.value)}/>
            <button className="edit_new_glass_button" onClick={handleAddNewColors}>Додати новий</button>
            </>
            }
            {currentObject?.glassThickness && showMirrorsBlock && currentObject.glassThickness.map((el, idx) => (
                <EditShowerMirrorsTemplate el={el} key={idx} showerId={currentObject._id}/>
            ))
            }
            {currentObject?.glassThickness && showMirrorsBlock &&
            <>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Назва" value={newValueGlassThicknessName} onChange={(e) => setNewValueGlassThicknessName(e.target.value)}/>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Ціна" value={newValueGlassThicknessPrice} onChange={(e) => setNewValueGlassThicknessPrice(e.target.value)}/>
            <button className=" edit_new_glass_button edit_new_glass-color_button" onClick={handleAddNewGlassThicknes}>Додати новий</button>
            </>
            }
            {currentObject?.type && showTypeBlock && currentObject.type.map((el, idx) => (
                <O_EditTypeTemplate el={el} key={idx} showerId={currentObject._id}
                pathDelete='https://calc-shower.herokuapp.com/update-shower-type'
                pathEdit='https://calc-shower.herokuapp.com/remove-shower-type'/>
            ))
            }
            {currentObject?.type && showTypeBlock && 
            <>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Назва" value={newValueTypeName} onChange={(e) => setNewValueTypeName(e.target.value)}/>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Ціна" value={newValueTypePrice} onChange={(e) => setNewValueTypePrice(e.target.value)}/>
            <button className=" edit_new_glass_button edit_new_glass-color_button" onClick={handleAddNewType}>Додати новий</button>
            </>
            }
            {currentObject?.sizeOfTheShower && showSizeBlock && currentObject.sizeOfTheShower.map((el, idx) => (
                <O_EditSizeTemplate el={el} key={idx}
                pathEdit='https://calc-shower.herokuapp.com/update-shower-size'/>
            ))
            }
        </div>
    );
};

export default EditShower;