import React, { useState, useEffect } from "react";
import '../../../style/edir-shower.scss';
import '../../../style/admin.scss'
import O_EditProcessingСutoutTempalte from "../EditTemplate/O_EditProcessingСutoutTempalte";
import O_EditTypeTemplate from "../EditTemplate/O_EditTypeTemplate";
import O_EditSizeTemplate from "../EditTemplate/O_EditSizeTemplate";
import N_EditLightBulsTemplate from "../EditTemplate/N_EditLightBulsTemplate";
import N_EditPatronTemplate from "../EditTemplate/N_EditPatronTemplate";

const EditCosmeticMirrors = () => {
    const [currentObject, setCurrentObject] = useState({});
    const [showProcessingСutoutBlock, setshowProcessingСutoutBlock] = useState(null);
    const [showTypeBlock, setShowTypeBlock] = useState(false);
    const [showSizeBlock, setShowSizeBlock] = useState(false);
    const [showLightBulbsBlock, setShowLightBulbsBlock] = useState(false);
    const [showPatronBlock, setShowPatronBlock] = useState(false);
    const [newValueProcessingСutoutPrice, setNewValueProcessingСutoutPrice] = useState('');
    const [newValueProcessingСutoutName, setNewValueProcessingСutoutName] = useState('');
    const [newValueTypeName, setNewValueTypeName] = useState('');
    const [newValueTypePrice, setNewValueTypePrice] = useState('');
    
    useEffect(() => {
        fetch("https://calc-shower.herokuapp.com/get-all-cosmetic-mirrors")
          .then((res) => res.json())
          .then((data) => {
            setCurrentObject(data[0]);
          })
          .catch((error) => console.error(error));
      }, []);

      const handleAddNewProcessingСutout = () => {
        fetch('https://calc-shower.herokuapp.com/add-new-cosmetic-mirrors-processing-cutout', {
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

      const handleAddNewType = () => {    
        fetch('https://calc-shower.herokuapp.com/add-new-cosmetic-mirrors-type', {
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
            <h1 className="header_item"  onClick={() => setshowProcessingСutoutBlock(state => !state)}>Обробка</h1>
            <h1 className="header_item"  onClick={() => setShowTypeBlock(state => !state)}>Типи</h1>
            <h1 className="header_item"  onClick={() => setShowSizeBlock(state => !state)}>Розміри</h1>
            <h1 className="header_item"  onClick={() => setShowLightBulbsBlock(state => !state)}>Лампочка</h1>
            <h1 className="header_item"  onClick={() => setShowPatronBlock(state => !state)}>Патрон</h1>
            </div>
            {showProcessingСutoutBlock && currentObject.processingСutout.map((el, idx) => (
                <O_EditProcessingСutoutTempalte el={el} key={idx} showerId={currentObject._id}
                pathEdit='https://calc-shower.herokuapp.com/update-cosmetic-mirrors-processing-cutout'
                pathDelete='https://calc-shower.herokuapp.com/remove-cosmetic-mirrors-processing-cutout'/>
            ))
            }
            {showProcessingСutoutBlock && 
            <>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Назва" value={newValueProcessingСutoutName} onChange={(e) => setNewValueProcessingСutoutName(e.target.value)}/>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Ціна" value={newValueProcessingСutoutPrice} onChange={(e) => setNewValueProcessingСutoutPrice(e.target.value)}/>
            <button className=" edit_new_glass_button edit_new_glass-color_button" onClick={handleAddNewProcessingСutout}>Додати новий</button>
            </>
            }

            {showTypeBlock && currentObject.typeGlass.map((el, idx) => (
                <O_EditTypeTemplate el={el} key={idx} showerId={currentObject._id}
                pathEdit='https://calc-shower.herokuapp.com/update-cosmetic-mirrors-type'
                pathDelete='https://calc-shower.herokuapp.com/remove-cosmetic-mirrors-type'/>
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
                pathEdit='https://calc-shower.herokuapp.com/update-cosmetic-mirrors-size'/>
            ))
            }

            {showLightBulbsBlock &&
                <N_EditLightBulsTemplate
                pathEdit='https://calc-shower.herokuapp.com/update-cosmetic-mirrors-light-bulbs'
                currentValue={currentObject.lightBulbs}
                showerId={currentObject._id}/>
            }

            {showPatronBlock &&
                <N_EditPatronTemplate
                pathEdit='https://calc-shower.herokuapp.com/update-cosmetic-mirrors-patron'
                currentValue={currentObject.patron}
                showerId={currentObject._id}/>
            }
        </div>
    );
};

export default EditCosmeticMirrors;