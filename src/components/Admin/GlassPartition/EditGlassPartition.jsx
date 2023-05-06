import React, { useState, useEffect } from "react";
import '../../../style/edir-shower.scss';
import '../../../style/admin.scss'
import O_EditProcessingStandartTempalte from "../EditTemplate/O_EditProcessingStandartTempalte";
import O_EditProcessingСutoutTempalte from "../EditTemplate/O_EditProcessingСutoutTempalte";
import O_EditColorTemplate from "../EditTemplate/O_EditColorTemplate";
import O_EditSizeTemplate from "../EditTemplate/O_EditSizeTemplate";
import O_EditTypeTemplate from "../EditTemplate/O_EditTypeTemplate";
import A_EditColorsTemplate from "../EditTemplate/A_EditColorsTemplate";
import O_EditFurnitureTemplate from "../EditTemplate/O_EditFurnitureTemplate";

const EditGlassPartition = () => {
    const [currentObject, setCurrentObject] = useState({});
    const [showFurnitureBlock, setShowFurnitureBlock] = useState(true);
    const [showColorBlock, setShowColorBlock] = useState(false);
    const [showTypeBlock, setShowTypeBlock] = useState(false);
    const [showTypePartitionBlock, setShowTypePartitionBlock] = useState(false);
    const [showSizeBlock, setShowSizeBlock] = useState(false);
    const [showProcessingStandartBlock, setshowProcessingStandartBlock] = useState(null);
    const [showProcessingСutoutBlock, setshowProcessingСutoutBlock] = useState(null);
    const [newValueProcessingStandartName, setNewValueProcessingStandartName] = useState('');
    const [newValueProcessingStandartPrice, setNewValueProcessingStandartPrice] = useState('');
    const [newValueProcessingСutoutName, setNewValueProcessingСutoutName] = useState('');
    const [newValueProcessingСutoutPrice, setNewValueProcessingСutoutPrice] = useState('');
    const [newValueColorName, setNewValueColorName] = useState('');
    const [newValueColorPrice, setNewValueColorPrice] = useState('');
    const [newValueTypeName, setNewValueTypeName] = useState('');
    const [newValueTypePrice, setNewValueTypePrice] = useState('');
    const [newValueTypePartition, setNewValueTypePartition] = useState('');

    useEffect(() => {
        fetch("https://calc-shower.herokuapp.com/get-all-glass-partitions")
          .then((res) => res.json())
          .then((data) => {
            setCurrentObject(data[0]);
          })
          .catch((error) => console.error(error));
      }, []);

    const handleAddNewProcessingStandart = () => {
        fetch('https://calc-shower.herokuapp.com/add-new-glass-partitions-processing-standart', {
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
        fetch('https://calc-shower.herokuapp.com/add-new-glass-partitions-processing-cutout', {
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

      const handleAddNewColor = () => {
        fetch('https://calc-shower.herokuapp.com/add-new-glass-partitions-color', {
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

      const handleAddNewType = () => {    
        fetch('https://calc-shower.herokuapp.com/add-new-glass-partitions-type', {
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

      const handleAddNewColors = () => {
        let fullArray = currentObject.typePartitions;
        let newArr = [...fullArray];
        const currentIndex = fullArray.indexOf();
        newArr.push(newValueTypePartition);
    
        fetch('https://calc-shower.herokuapp.com/update-glass-partitions-colors', {
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

    return (
        <div>
            <div className="shower-cabin-edit-header">
            <h1 className="header_item" onClick={() => setShowFurnitureBlock(showFurnitureBlock => !showFurnitureBlock)}>Фурнітура</h1>
            <h1 className="header_item"  onClick={() => setShowTypeBlock(showTypeBlock => !showTypeBlock)}>Типи</h1>
            <h1 className="header_item"  onClick={() => setShowTypePartitionBlock(showTypePartitionBlock => !showTypePartitionBlock)}>Перегородки</h1>
            <h1 className="header_item"  onClick={() => setShowSizeBlock(showSizeBlock => !showSizeBlock)}>Розміри</h1>
            <h1 className="header_item"  onClick={() => setShowColorBlock(showColorBlock => !showColorBlock)}>Колір</h1>
            <h1 className="header_item"  onClick={() => setshowProcessingStandartBlock(showProcessingStandartBlock => !showProcessingStandartBlock)}>Обробка 1</h1>
            <h1 className="header_item"  onClick={() => setshowProcessingСutoutBlock(showProcessingСutoutBlock => !showProcessingСutoutBlock)}>Обробка 2</h1>
            </div>

            {currentObject?.furniture && showFurnitureBlock && currentObject.furniture.map((el, furnitureIdx) => (
                <O_EditFurnitureTemplate key={el.title} el={el} 
                furnitureIdx={furnitureIdx} showerId={currentObject._id}
                pathUpdateMainImg='https://calc-shower.herokuapp.com/update-glass-partitions-furniture-main-image'
                pathUpdateSecondImg='https://calc-shower.herokuapp.com/update-glass-partitions-furniture-second-image'
                pathUpdateTitle='https://calc-shower.herokuapp.com/update-glass-partitions-furniture-title'
                pathAddNewDepends='https://calc-shower.herokuapp.com/update-glass-partitions-furniture-depends'
                pathAddNewColors='https://calc-shower.herokuapp.com/add-new-glass-partitions-furniture-colors'
                pathDeleteFurniture='https://calc-shower.herokuapp.com/remove-glass-partitions-furniture'
                pathUpdateFurnitureColors='https://calc-shower.herokuapp.com/update-furniture-color'
                pathDeleteFurnitureColors='https://calc-shower.herokuapp.com/remove-glass-partitions-furniture-colors'
                pathUpdateFurnituredepends='https://calc-shower.herokuapp.com/update-glass-partitions-furniture-depends'
                pathDeleteFurnituredepends='https://calc-shower.herokuapp.com/update-glass-partitions-furniture-depends'
                />
            ))}
            {showFurnitureBlock && <button className="add_new_furniture" onClick={handleAddNewFurniture}>Додати нову фурнітуру</button>}

            {showColorBlock && currentObject.color.map((el, idx) => (
                <O_EditColorTemplate el={el} key={idx} showerId={currentObject._id}
                pathEdit='https://calc-shower.herokuapp.com/update-glass-partitions-color'
                pathDelete='https://calc-shower.herokuapp.com/remove-glass-partitions-color'/>
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
                pathEdit='https://calc-shower.herokuapp.com/update-glass-partitions-processing-standart'
                pathDelete='https://calc-shower.herokuapp.com/remove-glass-partitions-processing-standart'/>
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
                pathEdit='https://calc-shower.herokuapp.com/update-glass-partitions-processing-cutout'
                pathDelete='https://calc-shower.herokuapp.com/remove-glass-partitions-processing-cutout'/>
            ))
            }
            {showProcessingСutoutBlock && 
            <>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Назва" value={newValueProcessingСutoutName} onChange={(e) => setNewValueProcessingСutoutName(e.target.value)}/>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Ціна" value={newValueProcessingСutoutPrice} onChange={(e) => setNewValueProcessingСutoutPrice(e.target.value)}/>
            <button className=" edit_new_glass_button edit_new_glass-color_button" onClick={handleAddNewProcessingСutout}>Додати новий</button>
            </>
            }
            {showSizeBlock && currentObject.size.map((el, idx) => (
                <O_EditSizeTemplate el={el} key={idx} 
                pathEdit='https://calc-shower.herokuapp.com/update-glass-partitions-size'/>
            ))
            }
            {showTypeBlock && currentObject.typeGlass.map((el, idx) => (
                <O_EditTypeTemplate el={el} key={idx} showerId={currentObject._id}
                pathEdit='https://calc-shower.herokuapp.com/update-glass-partitions-type'
                pathDelete='https://calc-shower.herokuapp.com/remove-glass-partitions-type'/>
            ))
            }
            {showTypeBlock && 
            <>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Назва" value={newValueTypeName} onChange={(e) => setNewValueTypeName(e.target.value)}/>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Ціна" value={newValueTypePrice} onChange={(e) => setNewValueTypePrice(e.target.value)}/>
            <button className=" edit_new_glass_button edit_new_glass-color_button" onClick={handleAddNewType}>Додати новий</button>
            </>
            }
            
            {showTypePartitionBlock && currentObject.typePartitions.map((el, idx) => (
                 <A_EditColorsTemplate el={el} key={idx} 
                 fullArray={currentObject.typePartitions} showerId={currentObject._id}
                 pathDelete='https://calc-shower.herokuapp.com/update-glass-partitions-colors'
                 pathEdit='https://calc-shower.herokuapp.com/update-glass-partitions-colors'
                 />
            ))
            }
            {showTypePartitionBlock && 
            <>
            <input className="edit_new_glass_input" placeholder="Назва" value={newValueTypePartition} onChange={(e) => setNewValueTypePartition(e.target.value)}/>
            <button className="edit_new_glass_button" onClick={handleAddNewColors}>Додати новий</button>
            </>
            }
        </div>
    );
};

export default EditGlassPartition;