import React, { useState, useEffect } from "react";
import '../../../style/edir-shower.scss';
import '../../../style/admin.scss'
import O_EditProcessingСutoutTempalte from "../EditTemplate/O_EditProcessingСutoutTempalte";
import O_EditTypeAndPhotoTemplate from '../EditTemplate/O_EditTypeAndPhotoTemplate'
import O_EditSizeTemplate from "../EditTemplate/O_EditSizeTemplate";
import N_EditLightBulsTemplate from "../EditTemplate/N_EditLightBulsTemplate";
import N_EditPatronTemplate from "../EditTemplate/N_EditPatronTemplate";
import AdminHeader from '../AdminHeader';

const EditCosmeticMirrors = () => {
    const [currentObject, setCurrentObject] = useState({});
    const [showProcessingСutoutBlock, setshowProcessingСutoutBlock] = useState(true);
    const [showTypeBlock, setShowTypeBlock] = useState(false);
    const [showSizeBlock, setShowSizeBlock] = useState(false);
    const [showLightBulbsBlock, setShowLightBulbsBlock] = useState(false);
    const [showPatronBlock, setShowPatronBlock] = useState(false);
    const [newValueProcessingСutoutPrice, setNewValueProcessingСutoutPrice] = useState('');
    const [newValueProcessingСutoutName, setNewValueProcessingСutoutName] = useState('');
    const [newValueTypeName, setNewValueTypeName] = useState('');
    const [newValueTypePrice, setNewValueTypePrice] = useState('');
    const [isFtch, setIsFetch] = useState(false);
    
    useEffect(() => {
        fetch("https://calc-shower.herokuapp.com/get-all-cosmetic-mirrors")
          .then((res) => res.json())
          .then((data) => {
            setCurrentObject(data[0]);
          })
          .catch((error) => console.error(error));
      }, [isFtch]);

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
            // window.location.reload();
            setIsFetch(state=>!state);
            setNewValueProcessingСutoutName('');
            setNewValueProcessingСutoutPrice('');
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
            // window.location.reload();
            setIsFetch(state=>!state);
            setNewValueTypeName('');
            setNewValueTypePrice('');
          },1000)
      }

      const handleShowTypeBlock = () => {
        setShowTypeBlock(true);
        setShowSizeBlock(false);
        setshowProcessingСutoutBlock(false);
        setShowLightBulbsBlock(false);
        setShowPatronBlock(false);
      };

      const handleShowSizeBlock = () => {
        setShowTypeBlock(false);
        setShowSizeBlock(true);
        setshowProcessingСutoutBlock(false);
        setShowLightBulbsBlock(false);
        setShowPatronBlock(false);
      };

      const handleShowProcessingСutoutBlock = () => {
        setShowTypeBlock(false);
        setShowSizeBlock(false);
        setshowProcessingСutoutBlock(true);
        setShowLightBulbsBlock(false);
        setShowPatronBlock(false);
      };

      const handleLightBulbsBlock = () => {
        setShowTypeBlock(false);
        setShowSizeBlock(false);
        setshowProcessingСutoutBlock(false);
        setShowLightBulbsBlock(true);
        setShowPatronBlock(false);
      }

      const handlePatronBlock = () => {
        setShowTypeBlock(false);
        setShowSizeBlock(false);
        setshowProcessingСutoutBlock(false);
        setShowLightBulbsBlock(false);
        setShowPatronBlock(true);
      }

    return (
        <div>
          <AdminHeader/>
            <div className="shower-cabin-edit-header">
            <h1 className={`header_item ${showProcessingСutoutBlock ? 'active_tab' : ''}`}  onClick={handleShowProcessingСutoutBlock}>Обробка</h1>
            <h1 className={`header_item ${showTypeBlock ? 'active_tab' : ''}`}  onClick={handleShowTypeBlock}>Типи</h1>
            <h1 className={`header_item ${showSizeBlock ? 'active_tab' : ''}`}  onClick={handleShowSizeBlock}>Розміри</h1>
            <h1 className={`header_item ${showLightBulbsBlock ? 'active_tab' : ''}`}  onClick={handleLightBulbsBlock}>Лампочка</h1>
            <h1 className={`header_item ${showPatronBlock ? 'active_tab' : ''}`}  onClick={handlePatronBlock}>Патрон</h1>
            {/* <h1 className={`header_item ${showProcessingСutoutBlock ? 'active_tab' : ''}`}  onClick={handleShowProcessingСutoutBlock}>Обробка</h1> */}
            </div>
            {showProcessingСutoutBlock && currentObject.processingСutout && currentObject.processingСutout.map((el, idx) => (
                <O_EditProcessingСutoutTempalte el={el} key={idx} showerId={currentObject._id}
                setIsFetch={setIsFetch}
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
                <O_EditTypeAndPhotoTemplate el={el} key={idx} showerId={currentObject._id}
                setIsFetch={setIsFetch}
                pathEdit='https://calc-shower.herokuapp.com/update-cosmetic-mirrors-type'
                pathDelete='https://calc-shower.herokuapp.com/remove-cosmetic-mirrors-type'
                pathEditPhoto='https://calc-shower.herokuapp.com/update-cosmetic-mirrors-type-image'/>
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
                setIsFetch={setIsFetch}
                pathEdit='https://calc-shower.herokuapp.com/update-cosmetic-mirrors-size'/>
            ))
            }

            {showLightBulbsBlock &&
                <N_EditLightBulsTemplate
                setIsFetch={setIsFetch}
                pathEdit='https://calc-shower.herokuapp.com/update-cosmetic-mirrors-light-bulbs'
                currentValue={currentObject.lightBulbs}
                showerId={currentObject._id}/>
            }

            {showPatronBlock &&
                <N_EditPatronTemplate
                setIsFetch={setIsFetch}
                pathEdit='https://calc-shower.herokuapp.com/update-cosmetic-mirrors-patron'
                currentValue={currentObject.patron}
                showerId={currentObject._id}/>
            }
        </div>
    );
};

export default EditCosmeticMirrors;