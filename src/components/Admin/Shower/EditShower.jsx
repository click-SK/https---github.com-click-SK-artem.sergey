import React, { useState, useEffect } from "react";
import "../../../style/edir-shower.scss";
import "../../../style/admin.scss";
import O_EditFurnitureTemplate from "../EditTemplate/O_EditFurnitureTemplate";
import A_EditColorsTemplate from "../EditTemplate/A_EditColorsTemplate";
import EditShowerMirrorsTemplate from "./EditShowerMirrorsTemplate";
import O_EditTypeTemplate from "../EditTemplate/O_EditTypeTemplate";
import O_EditSizeTemplate from "../EditTemplate/O_EditSizeTemplate";
import O_EditProcessingStandartTempalte from "../EditTemplate/O_EditProcessingStandartTempalte";
import O_EditProcessingСutoutTempalte from "../EditTemplate/O_EditProcessingСutoutTempalte";
import EditShowerTypeWithFurniture from '../Shower/EditShowerTypeWithFurniture';
import AdminHeader from '../AdminHeader';
const EditShower = () => {
  const [currentObject, setCurrentObject] = useState({});
  const [showFurnitureBlock, setShowFurnitureBlock] = useState(true);
  const [showColorsBlock, setShowColorsBlock] = useState(false);
  const [showMirrorsBlock, setShowMirrorsBlock] = useState(false);
  const [showTypeBlock, setShowTypeBlock] = useState(false);
  const [showSizeBlock, setShowSizeBlock] = useState(false);
  const [newValueDepends, setNewValueDepends] = useState("");
  const [newValueGlassThicknessName, setNewValueGlassThicknessName] =
    useState("");
  const [newValueGlassThicknessPrice, setNewValueGlassThicknessPrice] =
    useState("");
  const [newValueTypeName, setNewValueTypeName] = useState("");
  const [newValueTypePrice, setNewValueTypePrice] = useState("");
  const [activeTab, setActiveTab] = useState("furniture");
  const [isFtch, setIsFetch] = useState(false);
  const [showProcessingStandartBlock, setshowProcessingStandartBlock] = useState(false);
  const [showProcessingСutoutBlock, setshowProcessingСutoutBlock] = useState(false);
  const [newValueProcessingStandartName, setNewValueProcessingStandartName] = useState('');
  const [newValueProcessingStandartPrice, setNewValueProcessingStandartPrice] = useState('');
  const [newValueProcessingСutoutName, setNewValueProcessingСutoutName] = useState('');
  const [newValueProcessingСutoutPrice, setNewValueProcessingСutoutPrice] = useState('');


  useEffect(() => {
    fetch("https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/get-all-shower")
      .then((res) => res.json())
      .then((data) => {
        setCurrentObject(data[0]);
      })
      .catch((error) => console.error(error));
  }, [isFtch]);

  const handleAddNewFurniture = () => {
    fetch("https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/add-new-furniture", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        showerId: currentObject._id,
      }),
    }).then((res) => res.json());
    setTimeout(() => {
      // window.location.reload();
      setIsFetch(state=>!state)
    }, 1000);
  };

  const handleAddNewColors = () => {
    let fullArray = currentObject.color;
    let newArr = [...fullArray];
    const currentIndex = fullArray.indexOf();
    newArr.push(newValueDepends);

    fetch("https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/update-shower-colors", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        colors: newArr,
        showerCabinId: currentObject._id,
      }),
    }).then((res) => res.json());
    setTimeout(() => {
      // window.location.reload();
      setIsFetch(state=>!state)
      setNewValueDepends('');
    }, 1000);
  };

  const handleAddNewGlassThicknes = () => {
    fetch("https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/add-new-glass-thickness", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newValueGlassThicknessName,
        price: newValueGlassThicknessPrice,
        showerId: currentObject._id,
      }),
    }).then((res) => res.json());
    setTimeout(() => {
      // window.location.reload();
      setIsFetch(state=>!state);
      setNewValueGlassThicknessName('');
      setNewValueGlassThicknessPrice('');
    }, 1000);
  };

  const handleAddNewType = () => {
    fetch("https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/add-new-shower-type", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newValueTypeName,
        price: newValueTypePrice,
        showerId: currentObject._id,
      }),
    }).then((res) => res.json());
    setTimeout(() => {
      // window.location.reload();
      setIsFetch(state=>!state);
      setNewValueTypeName('');
      setNewValueTypePrice('');
    }, 1000);
  };

  const handleAddNewProcessingStandart = () => {
    fetch('https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/add-new-shower-processing-standart', {
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
        // window.location.reload();
        setIsFetch(state=>!state);
        setNewValueProcessingStandartName('');
        setNewValueProcessingStandartPrice('');
      },1000)
  }

  const handleAddNewProcessingСutout = () => {
    fetch('https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/add-new-shower-processing-cutout', {
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

  //-----------------

  const handleShowFurnitureBlock = () => {
    setShowFurnitureBlock(true);
    setShowColorsBlock(false);
    setShowMirrorsBlock(false);
    setShowTypeBlock(false);
    setShowSizeBlock(false);
    setshowProcessingStandartBlock(false);
    setshowProcessingСutoutBlock(false);
    
  };

  const handleShowColorsBlock = () => {
    setShowFurnitureBlock(false);
    setShowColorsBlock(true);
    setShowMirrorsBlock(false);
    setShowTypeBlock(false);
    setShowSizeBlock(false);
    setshowProcessingStandartBlock(false);
    setshowProcessingСutoutBlock(false);
  };

  const handleShowMirrorsBlock = () => {
    setShowFurnitureBlock(false);
    setShowColorsBlock(false);
    setShowMirrorsBlock(true);
    setShowTypeBlock(false);
    setShowSizeBlock(false);
    setshowProcessingStandartBlock(false);
    setshowProcessingСutoutBlock(false);
  };

  const handleShowTypeBlock = () => {
    setShowFurnitureBlock(false);
    setShowColorsBlock(false);
    setShowMirrorsBlock(false);
    setShowTypeBlock(true);
    setShowSizeBlock(false);
    setshowProcessingStandartBlock(false);
    setshowProcessingСutoutBlock(false);
  };

  const handleShowSizeBlock = () => {
    setShowFurnitureBlock(false);
    setShowColorsBlock(false);
    setShowMirrorsBlock(false);
    setShowTypeBlock(false);
    setShowSizeBlock(true);
    setshowProcessingStandartBlock(false);
    setshowProcessingСutoutBlock(false);
  };

  
  const handleShowProcessingStandartBlock = () => {
    setShowFurnitureBlock(false);
    setShowColorsBlock(false);
    setShowMirrorsBlock(false);
    setShowTypeBlock(false);
    setShowSizeBlock(false);
    setshowProcessingStandartBlock(true);
    setshowProcessingСutoutBlock(false);
  };

  const handleShowProcessingСutoutBlock = () => {
    setShowFurnitureBlock(false);
    setShowColorsBlock(false);
    setShowMirrorsBlock(false);
    setShowTypeBlock(false);
    setShowSizeBlock(false);
    setshowProcessingStandartBlock(false);
    setshowProcessingСutoutBlock(true);
  };

  return (
    <div>
      <AdminHeader/>
      <div className="shower-cabin-edit-header">
        <h1 className={`header_item ${showFurnitureBlock ? 'active_tab' : ''}`} onClick={handleShowFurnitureBlock}>
          Фурнітура
        </h1>
        {/* <h1 className={`header_item ${showColorsBlock ? 'active_tab' : ''}`} onClick={handleShowColorsBlock}>
          Скло
        </h1> */}
        <h1 className={`header_item ${showMirrorsBlock ? 'active_tab' : ''}`}onClick={handleShowMirrorsBlock}>
          Кольори
        </h1>
        <h1 className={`header_item ${showTypeBlock ? 'active_tab' : ''}`} onClick={handleShowTypeBlock}>
          Типи
        </h1>
        <h1 className={`header_item ${showSizeBlock ? 'active_tab' : ''}`} onClick={handleShowSizeBlock}>
          Розміри
        </h1>
        <h1 className={`header_item ${showProcessingStandartBlock ? 'active_tab' : ''}`}  onClick={handleShowProcessingStandartBlock}>Обробка скла</h1>
        <h1 className={`header_item ${showProcessingСutoutBlock ? 'active_tab' : ''}`}  onClick={handleShowProcessingСutoutBlock}>Додаткова обробка</h1>
      </div>
      {currentObject?.furniture &&
        showFurnitureBlock &&
        currentObject.furniture.map((el, furnitureIdx) => (
          <O_EditFurnitureTemplate
            key={el.title}
            el={el}
            furnitureIdx={furnitureIdx}
            showerId={currentObject._id}
            pathUpdateMainImg="https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/update-shower-furniture-main-image"
            pathUpdateSecondImg="https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/update-shower-furniture-second-image"
            pathUpdateTitle="https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/update-shower-furniture-title"
            pathAddNewDepends="https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/update-shower-furniture-depends"
            pathAddNewColors="https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/add-new-shower-furniture-colors"
            pathDeleteFurniture="https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/remove-shower-furniture"
            pathUpdateFurnitureColors="https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/update-shower-furniture-color"
            pathDeleteFurnitureColors="https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/remove-shower-furniture-colors"
            pathUpdateFurnituredepends="https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/update-shower-furniture-depends"
            pathDeleteFurnituredepends="https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/update-shower-furniture-depends"
            setIsFetch={setIsFetch}
          />
        ))}
      {showFurnitureBlock && (
        <button className="add_new_furniture" onClick={handleAddNewFurniture}>
          Додати нову фурнітуру
        </button>
      )}
      {currentObject?.color &&
        showColorsBlock &&
        currentObject.color.map((el, idx) => (
          <A_EditColorsTemplate
            el={el}
            key={idx}
            fullArray={currentObject.color}
            showerId={currentObject._id}
            setIsFetch={setIsFetch}
            pathDelete="https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/update-shower-colors"
            pathEdit="https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/update-shower-colors"
          />
        ))}
      {currentObject?.color && showColorsBlock && (
        <>
          <input
            className="edit_new_glass_input"
            placeholder="Назва"
            value={newValueDepends}
            onChange={(e) => setNewValueDepends(e.target.value)}
          />
          <button
            className="edit_new_glass_button"
            onClick={handleAddNewColors}
          >
            Додати новий
          </button>
        </>
      )}
      {currentObject?.glassThickness &&
        showMirrorsBlock &&
        currentObject.glassThickness.map((el, idx) => (
          <EditShowerMirrorsTemplate
            el={el}
            key={idx}
            showerId={currentObject._id}
            setIsFetch={setIsFetch}
          />
        ))}
      {currentObject?.glassThickness && showMirrorsBlock && (
        <>
          <input
            className=" edit_new_glass_input edit_new_glass-color_input"
            placeholder="Назва"
            value={newValueGlassThicknessName}
            onChange={(e) => setNewValueGlassThicknessName(e.target.value)}
          />
          <input
            className=" edit_new_glass_input edit_new_glass-color_input"
            placeholder="Ціна"
            value={newValueGlassThicknessPrice}
            onChange={(e) => setNewValueGlassThicknessPrice(e.target.value)}
          />
          <button
            className=" edit_new_glass_button edit_new_glass-color_button"
            onClick={handleAddNewGlassThicknes}
          >
            Додати новий
          </button>
        </>
      )}
      {currentObject?.type &&
        showTypeBlock &&
        currentObject.type.map((el, idx) => (
            <EditShowerTypeWithFurniture
            el={el}
            allFurniture={currentObject?.furniture}
            key={idx}
            idx={idx}
            showerId={currentObject._id}
            setIsFetch={setIsFetch}
            pathDelete="https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/remove-shower-type"
            pathEdit="https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/update-shower-type"
          />
        ))}
      {currentObject?.type && showTypeBlock && (
        <>
          <input
            className=" edit_new_glass_input edit_new_glass-color_input"
            placeholder="Назва"
            value={newValueTypeName}
            onChange={(e) => setNewValueTypeName(e.target.value)}
          />
          <input
            className=" edit_new_glass_input edit_new_glass-color_input"
            placeholder="Ціна"
            value={newValueTypePrice}
            onChange={(e) => setNewValueTypePrice(e.target.value)}
          />
          <button
            className=" edit_new_glass_button edit_new_glass-color_button"
            onClick={handleAddNewType}
          >
            Додати новий
          </button>
        </>
      )}
      {currentObject?.sizeOfTheShower &&
        showSizeBlock &&
        currentObject.sizeOfTheShower.map((el, idx) => (
          <O_EditSizeTemplate
            el={el}
            key={idx}
            setIsFetch={setIsFetch}
            pathEdit="https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/update-shower-size"
          />
        ))}

            {showProcessingStandartBlock && currentObject.processingStandart.map((el, idx) => (
                <O_EditProcessingStandartTempalte el={el} key={idx} showerId={currentObject._id}
                pathEdit='https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/update-shower-processing-standart'
                pathDelete='https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/remove-shower-processing-standart'
                setIsFetch={setIsFetch}/>
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
                pathEdit='https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/update-shower-processing-cutout'
                pathDelete='https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/remove-shower-processing-cutout'
                setIsFetch={setIsFetch}/>
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

export default EditShower;
