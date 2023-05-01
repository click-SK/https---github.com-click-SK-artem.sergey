import React, { useState, useEffect } from "react";
import '../../../style/edir-shower.scss';
import EditShowerFurnitureTemplate from "./EditShowerFurnitureTemplate";
import EditShowerColorsTemplate from "./EditShowerColorsTemplate";
import EditShowerMirrorsTemplate from "./EditShowerMirrorsTemplate";
import EditShowerTypeTemplate from './EditShowerTypeTemplate';
import EditShowerSizeTemplate from "./EditShowerSizeTemplate";

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
        fetch('https://calc-shower.herokuapp.com/add-furniture', {
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
            <h1 onClick={() => setShowFurnitureBlock(showFurnitureBlock => !showFurnitureBlock)}>Фурнітура</h1>
            <h1 onClick={() => setShowColorsBlock(showColorsBlock => !showColorsBlock)}>Скло</h1>
            <h1 onClick={() => setShowMirrorsBlock(showMirrorsBlock => !showMirrorsBlock)}>Кольори</h1>
            <h1 onClick={() => setShowTypeBlock(showTypeBlock => !showTypeBlock)}>Типи</h1>
            <h1 onClick={() => setShowSizeBlock(showSizeBlock => !showSizeBlock)}>Розміри</h1>
            </div>
            {currentObject?.furniture && showFurnitureBlock && currentObject.furniture.map((el, furnitureIdx) => (
                <EditShowerFurnitureTemplate key={el.title} el={el} furnitureIdx={furnitureIdx} showerId={currentObject._id}/>
            ))}
            {showFurnitureBlock && <button onClick={handleAddNewFurniture}>Додати нову фурнітуру</button>}
            {currentObject?.color && showColorsBlock && currentObject.color.map((el, idx) => (
                 <EditShowerColorsTemplate el={el} key={idx} fullColors={currentObject.color} showerId={currentObject._id}/>
            ))
            }
            {currentObject?.color && showColorsBlock && 
            <>
            <input placeholder="Назва" value={newValueDepends} onChange={(e) => setNewValueDepends(e.target.value)}/>
            <button onClick={handleAddNewColors}>Додати новий</button>
            </>
            }
            {currentObject?.glassThickness && showMirrorsBlock && currentObject.glassThickness.map((el, idx) => (
                <EditShowerMirrorsTemplate el={el} key={idx} showerId={currentObject._id}/>
            ))
            }
            {currentObject?.glassThickness && showMirrorsBlock &&
            <>
            <input placeholder="Назва" value={newValueGlassThicknessName} onChange={(e) => setNewValueGlassThicknessName(e.target.value)}/>
            <input placeholder="Ціна" value={newValueGlassThicknessPrice} onChange={(e) => setNewValueGlassThicknessPrice(e.target.value)}/>
            <button onClick={handleAddNewGlassThicknes}>Додати новий</button>
            </>
            }
            {currentObject?.type && showTypeBlock && currentObject.type.map((el, idx) => (
                <EditShowerTypeTemplate el={el} key={idx} showerId={currentObject._id}/>
            ))
            }
            {currentObject?.type && showTypeBlock && 
            <>
            <input placeholder="Назва" value={newValueTypeName} onChange={(e) => setNewValueTypeName(e.target.value)}/>
            <input placeholder="Ціна" value={newValueTypePrice} onChange={(e) => setNewValueTypePrice(e.target.value)}/>
            <button onClick={handleAddNewType}>Додати новий</button>
            </>
            }
            {currentObject?.sizeOfTheShower && showSizeBlock && currentObject.sizeOfTheShower.map((el, idx) => (
                <EditShowerSizeTemplate el={el} key={idx}/>
            ))
            }
        </div>
    );
};

export default EditShower;