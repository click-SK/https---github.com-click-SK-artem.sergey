import React, { useState, useEffect } from "react";
import '../../../style/edir-shower.scss';
import '../../../style/admin.scss'
import O_EditTypeTemplate from "../EditTemplate/O_EditTypeTemplate";
import O_EditSizeTemplate from "../EditTemplate/O_EditSizeTemplate";
import O_EditColorTemplate from "../EditTemplate/O_EditColorTemplate";
const EditDashki = () => {
    const [showFurnitureBlock, setShowFurnitureBlock] = useState(true);
    const [showColorBlock, setShowColorBlock] = useState(false);
    const [showTypeBlock, setShowTypeBlock] = useState(false);
    const [showSizeBlock, setShowSizeBlock] = useState(false);
    const [showProcessingStandartBlock, setshowProcessingStandartBlock] = useState(null);
    const [showProcessingСutoutBlock, setshowProcessingСutoutBlock] = useState(null);
    const [currentObject, setCurrentObject] = useState({});

    useEffect(() => {
        fetch("https://calc-shower.herokuapp.com/get-all-dashki")
          .then((res) => res.json())
          .then((data) => {
            setCurrentObject(data[0]);
          })
          .catch((error) => console.error(error));
      }, []);

    return (
        <div>
            <div className="shower-cabin-edit-header">
            <h1 className="header_item" onClick={() => setShowFurnitureBlock(showFurnitureBlock => !showFurnitureBlock)}>Фурнітура</h1>
            <h1 className="header_item"  onClick={() => setShowTypeBlock(showTypeBlock => !showTypeBlock)}>Типи</h1>
            <h1 className="header_item"  onClick={() => setShowSizeBlock(showSizeBlock => !showSizeBlock)}>Розміри</h1>
            <h1 className="header_item"  onClick={() => setShowColorBlock(showColorBlock => !showColorBlock)}>Колір</h1>
            <h1 className="header_item"  onClick={() => setshowProcessingStandartBlock(showProcessingStandartBlock => !showProcessingStandartBlock)}>Обробка 1</h1>
            <h1 className="header_item"  onClick={() => setshowProcessingСutoutBlock(showProcessingСutoutBlock => !showProcessingСutoutBlock)}>Обробка 2</h1>
            </div>
            {showTypeBlock && currentObject.typeGlass.map((el, idx) => (
                <O_EditTypeTemplate el={el} key={idx} showerId={currentObject._id}
                pathEdit='https://calc-shower.herokuapp.com/update-dashki-type'
                pathDelete='https://calc-shower.herokuapp.com/remove-dashki-type'/>
            ))
            }
            
            {showSizeBlock && currentObject.size.map((el, idx) => (
                <O_EditSizeTemplate el={el} key={idx} 
                pathEdit='https://calc-shower.herokuapp.com/update-dashki-size'/>
            ))
            }
            {showColorBlock && currentObject.color.map((el, idx) => (
                <O_EditColorTemplate el={el} key={idx} showerId={currentObject._id}
                pathEdit='https://calc-shower.herokuapp.com/update-dashki-color'
                pathDelete='https://calc-shower.herokuapp.com/remove-dashki-color'/>
            ))
            }
        </div>
    );
};

export default EditDashki;