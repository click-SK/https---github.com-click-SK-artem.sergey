import React, { useState, useEffect } from "react";
import '../../../style/edir-shower.scss';
import '../../../style/admin.scss'
import O_EditTypeTemplate from "../EditTemplate/O_EditTypeTemplate";
import O_EditSizeTemplate from "../EditTemplate/O_EditSizeTemplate";
import O_EditColorTemplate from "../EditTemplate/O_EditColorTemplate";
import O_EditFurnitureTemplate from "../EditTemplate/O_EditFurnitureTemplate";
import O_EditProcessingStandartTempalte from "../EditTemplate/O_EditProcessingStandartTempalte";
import O_EditProcessingСutoutTempalte from "../EditTemplate/O_EditProcessingСutoutTempalte";
import AdminHeader from '../AdminHeader';

const EditDashki = () => {
    const [showFurnitureBlock, setShowFurnitureBlock] = useState(true);
    const [showColorBlock, setShowColorBlock] = useState(false);
    const [showTypeBlock, setShowTypeBlock] = useState(false);
    const [showSizeBlock, setShowSizeBlock] = useState(false);
    const [showProcessingStandartBlock, setshowProcessingStandartBlock] = useState(false);
    const [showProcessingСutoutBlock, setshowProcessingСutoutBlock] = useState(false);
    const [currentObject, setCurrentObject] = useState({});
    const [newValueTypeName, setNewValueTypeName] = useState('');
    const [newValueTypePrice, setNewValueTypePrice] = useState('');
    const [newValueColorName, setNewValueColorName] = useState('');
    const [newValueColorPrice, setNewValueColorPrice] = useState('');
    const [newValueProcessingStandartName, setNewValueProcessingStandartName] = useState('');
    const [newValueProcessingStandartPrice, setNewValueProcessingStandartPrice] = useState('');
    const [newValueProcessingСutoutName, setNewValueProcessingСutoutName] = useState('');
    const [newValueProcessingСutoutPrice, setNewValueProcessingСutoutPrice] = useState('');


    useEffect(() => {
        fetch("https://calc-shower.herokuapp.com/get-all-dashki")
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

      const handleAddNewType = () => {    
        fetch('https://calc-shower.herokuapp.com/add-new-dashki-type', {
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

      const handleAddNewColor = () => {
        fetch('https://calc-shower.herokuapp.com/add-new-dashki-color', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newValueColorName,
            price: newValueColorPrice,
            showerId: currentObject._id
          })
        })
          .then((res) => res.json())
          setTimeout(() => {
            window.location.reload();
          },1000)
      }

      const handleAddNewProcessingStandart = () => {
        fetch('https://calc-shower.herokuapp.com/add-new-dashki-processing-standart', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newValueProcessingStandartName,
            price: newValueProcessingStandartPrice,
            showerId: currentObject._id
          })
        })
          .then((res) => res.json())
          setTimeout(() => {
            window.location.reload();
          },1000)
      }

      const handleAddNewProcessingСutout = () => {
        fetch('https://calc-shower.herokuapp.com/add-new-dashki-processing-cutout', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newValueProcessingСutoutName,
            price: newValueProcessingСutoutPrice,
            count: 1,
            showerId: currentObject._id
          })
        })
          .then((res) => res.json())
          setTimeout(() => {
            window.location.reload();
          },1000)
      }

      const handleShowFurnitureBlock = () => {
        setShowFurnitureBlock(true);
        setShowColorBlock(false);
        setShowTypeBlock(false);
        setShowSizeBlock(false);
        setshowProcessingStandartBlock(false);
        setshowProcessingСutoutBlock(false);
      };

      const handleShowTypeBlock = () => {
        setShowFurnitureBlock(false);
        setShowColorBlock(false);
        setShowTypeBlock(true);
        setShowSizeBlock(false);
        setshowProcessingStandartBlock(false);
        setshowProcessingСutoutBlock(false);
      };

      const handleShowSizeBlock = () => {
        setShowFurnitureBlock(false);
        setShowColorBlock(false);
        setShowTypeBlock(false);
        setShowSizeBlock(true);
        setshowProcessingStandartBlock(false);
        setshowProcessingСutoutBlock(false);
      };

      const handleShowColorsBlock = () => {
        setShowFurnitureBlock(false);
        setShowColorBlock(true);
        setShowTypeBlock(false);
        setShowSizeBlock(false);
        setshowProcessingStandartBlock(false);
        setshowProcessingСutoutBlock(false);
      };

      const handleShowProcessingStandartBlock = () => {
        setShowFurnitureBlock(false);
        setShowColorBlock(false);
        setShowTypeBlock(false);
        setShowSizeBlock(false);
        setshowProcessingStandartBlock(true);
        setshowProcessingСutoutBlock(false);
      };

      const handleShowProcessingСutoutBlock = () => {
        setShowFurnitureBlock(false);
        setShowColorBlock(false);
        setShowTypeBlock(false);
        setShowSizeBlock(false);
        setshowProcessingStandartBlock(false);
        setshowProcessingСutoutBlock(true);
      };

    return (
        <div>
          <AdminHeader/>
            <div className="shower-cabin-edit-header">
            <h1 className={`header_item ${showFurnitureBlock ? 'active_tab' : ''}`} onClick={handleShowFurnitureBlock}>Фурнітура</h1>
            <h1 className={`header_item ${showTypeBlock ? 'active_tab' : ''}`}  onClick={handleShowTypeBlock}>Типи</h1>
            <h1 className={`header_item ${showSizeBlock ? 'active_tab' : ''}`}  onClick={handleShowSizeBlock}>Розміри</h1>
            <h1 className={`header_item ${showColorBlock ? 'active_tab' : ''}`}  onClick={handleShowColorsBlock}>Колір</h1>
            <h1 className={`header_item ${showProcessingStandartBlock ? 'active_tab' : ''}`}  onClick={handleShowProcessingStandartBlock}>Обробка 1</h1>
            <h1 className={`header_item ${showProcessingСutoutBlock ? 'active_tab' : ''}`}  onClick={handleShowProcessingСutoutBlock}>Обробка 2</h1>
            </div>
            {currentObject?.furniture && showFurnitureBlock && currentObject.furniture.map((el, furnitureIdx) => (
                <O_EditFurnitureTemplate key={el.title} el={el} 
                furnitureIdx={furnitureIdx} showerId={currentObject._id}
                pathUpdateMainImg='https://calc-shower.herokuapp.com/update-dashki-furniture-main-image'
                pathUpdateSecondImg='https://calc-shower.herokuapp.com/update-dashki-furniture-second-image'
                pathUpdateTitle='https://calc-shower.herokuapp.com/update-dashki-furniture-title'
                pathAddNewDepends='https://calc-shower.herokuapp.com/update-dashki-furniture-depends'
                pathAddNewColors='https://calc-shower.herokuapp.com/add-new-dashki-furniture-colors'
                pathDeleteFurniture='https://calc-shower.herokuapp.com/remove-dashki-furniture'
                pathUpdateFurnitureColors='https://calc-shower.herokuapp.com/update-furniture-color'
                pathDeleteFurnitureColors='https://calc-shower.herokuapp.com/remove-dashki-furniture-colors'
                pathUpdateFurnituredepends='https://calc-shower.herokuapp.com/update-dashki-furniture-depends'
                pathDeleteFurnituredepends='https://calc-shower.herokuapp.com/update-dashki-furniture-depends'
                />
            ))}
            {showFurnitureBlock && <button className="add_new_furniture" onClick={handleAddNewFurniture}>Додати нову фурнітуру</button>}
            {showTypeBlock && currentObject.typeGlass.map((el, idx) => (
                <O_EditTypeTemplate el={el} key={idx} showerId={currentObject._id}
                pathEdit='https://calc-shower.herokuapp.com/update-dashki-type'
                pathDelete='https://calc-shower.herokuapp.com/remove-dashki-type'/>
            ))
            }
            {showTypeBlock && 
            <>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Назва" value={newValueTypeName} onChange={(e) => setNewValueTypeName(e.target.value)}/>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Ціна" value={newValueTypePrice} onChange={(e) => setNewValueTypePrice(e.target.value)}/>
            <button className=" edit_new_glass_button edit_new_glass-color_button" onClick={handleAddNewType}>Додати новий</button>
            </>
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
            {showColorBlock &&
            <>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Назва" value={newValueColorName} onChange={(e) => setNewValueColorName(e.target.value)}/>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Ціна" value={newValueColorPrice} onChange={(e) => setNewValueColorPrice(e.target.value)}/>
            <button className=" edit_new_glass_button edit_new_glass-color_button" onClick={handleAddNewColor}>Додати новий</button>
            </>
            }
          {showProcessingStandartBlock && currentObject.processingStandart.map((el, idx) => (
                <O_EditProcessingStandartTempalte el={el} key={idx} showerId={currentObject._id}
                pathEdit='https://calc-shower.herokuapp.com/update-dashki-processing-standart'
                pathDelete='https://calc-shower.herokuapp.com/remove-dashki-processing-standart'/>
            ))
            }
            {showProcessingStandartBlock && 
            <>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Назва" value={newValueProcessingStandartName} onChange={(e) => setNewValueProcessingStandartName(e.target.value)}/>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Ціна" value={newValueProcessingStandartPrice} onChange={(e) => setNewValueProcessingStandartPrice(e.target.value)}/>
            <button className=" edit_new_glass_button edit_new_glass-color_button" onClick={handleAddNewProcessingStandart}>Додати новий</button>
            </>
            }
            {showProcessingСutoutBlock && currentObject.processingСutout.map((el, idx) => (
                <O_EditProcessingСutoutTempalte el={el} key={idx} showerId={currentObject._id}
                pathEdit='https://calc-shower.herokuapp.com/update-dashki-processing-cutout'
                pathDelete='https://calc-shower.herokuapp.com/remove-dashki-processing-cutout'/>
            ))
            }
            {showProcessingСutoutBlock && 
            <>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Назва" value={newValueProcessingСutoutName} onChange={(e) => setNewValueProcessingСutoutName(e.target.value)}/>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Ціна" value={newValueProcessingСutoutPrice} onChange={(e) => setNewValueProcessingСutoutPrice(e.target.value)}/>
            <button className=" edit_new_glass_button edit_new_glass-color_button" onClick={handleAddNewProcessingСutout}>Додати новий</button>
            </>
            }
        </div>
    );
};

export default EditDashki;