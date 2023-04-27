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

    useEffect(() => {
        fetch("https://calc-shower.herokuapp.com/get-all-shower")
          .then((res) => res.json())
          .then((data) => {
            setCurrentObject(data[0]);
          })
          .catch((error) => console.error(error));
      }, []);
      
    return (
        <div>
            <div className="shower-cabin-edit-header">
            <h1 onClick={() => setShowFurnitureBlock(showFurnitureBlock => !showFurnitureBlock)}>Фурнітура</h1>
            <h1 onClick={() => setShowColorsBlock(showColorsBlock => !showColorsBlock)}>Кольори</h1>
            <h1 onClick={() => setShowMirrorsBlock(showMirrorsBlock => !showMirrorsBlock)}>Скло</h1>
            <h1 onClick={() => setShowTypeBlock(showTypeBlock => !showTypeBlock)}>Типи</h1>
            <h1 onClick={() => setShowSizeBlock(showSizeBlock => !showSizeBlock)}>Розміри</h1>
            </div>
            {currentObject?.furniture && showFurnitureBlock && currentObject.furniture.map((el) => (
                <EditShowerFurnitureTemplate key={el.title} el={el} showerId={currentObject._id}/>
            ))}
            {currentObject?.color && showColorsBlock && currentObject.color.map((el, idx) => (
                 <EditShowerColorsTemplate el={el} key={idx} fullColors={currentObject.color} showerId={currentObject._id}/>
            ))
            }
            {currentObject?.glassThickness && showMirrorsBlock && currentObject.glassThickness.map((el, idx) => (
                <EditShowerMirrorsTemplate el={el} key={idx}/>
            ))
            }
            {currentObject?.type && showTypeBlock && currentObject.type.map((el, idx) => (
                <EditShowerTypeTemplate el={el} key={idx}/>
            ))
            }
            {currentObject?.sizeOfTheShower && showSizeBlock && currentObject.sizeOfTheShower.map((el, idx) => (
                <EditShowerSizeTemplate el={el} key={idx}/>
            ))
            }
        </div>
    );
};

export default EditShower;