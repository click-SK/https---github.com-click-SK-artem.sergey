import React, { useEffect, useState } from "react";
import '../../../style/admin.scss'
import '../../../style/edir-shower.scss';
import EditStandartMirrorsType from "./EditStandartMirrorsType";
import O_NamePriceTemplate from "../EditTemplate/O_NamePriceTemplate";
import O_EditPriceTemplate from "../EditTemplate/O_EditPriceTemplate";
import AdminHeader from '../AdminHeader';
import O_EditProcessingСutoutTempalte from "../EditTemplate/O_EditProcessingСutoutTempalte";
const EditStandartMirrors = () => {
  const [currentObject, setCurrentObject] = useState({});
  const [showTypeBlock, setShowTypeBlock] = useState(true);
  const [showFrameBlock, setShowFrameBlock] = useState(false);
  const [showBackLightBlock, setShowBackLightBlock] = useState(false);
  const [showSwitchBlock, setShowSwitchBlock] = useState(false);
  const [showColorsBlock, setShowColorsBlock] = useState(false);
  const [showCordBlock, setShowCordBlock] = useState(false);
  const [showWarmedUpBlock, setShowWarmedUpBlock] = useState(false);
  const [showPaintingBlock, setShowPaintingBlock] = useState(false);
  const [newValueFrameName, setNewValueFrameName] = useState('');
  const [newValueFramePrice, setNewValueFramePrice] = useState('');
  const [newValueBackLightName, setNewValueBackLightName] = useState('');
  const [newValueBackLightPrice, setNewValueBackLightPrice] = useState('');
  const [newValueSwitchName, setNewValueSwitchName] = useState('');
  const [newValueSwitchPrice, setNewValueSwitchPrice] = useState('');
  const [newValueColorName, setNewValueColorName] = useState('');
  const [newValueColorPrice, setNewValueColorPrice] = useState('');
  const [isFtch, setIsFetch] = useState(false);
  const [showProcessingСutoutBlock, setshowProcessingСutoutBlock] = useState(false);
  const [newValueProcessingСutoutName, setNewValueProcessingСutoutName] = useState('');
  const [newValueProcessingСutoutPrice, setNewValueProcessingСutoutPrice] = useState('');
  useEffect(() => {
    fetch("https://calc-shower.herokuapp.com/get-all-standart-mirrors")
      .then((res) => res.json())
      .then((data) => {
        setCurrentObject(data[0]);
      })
      .catch((error) => console.error(error));
  }, [isFtch]);

  const handleAddNewColor = () => {    
    fetch('https://calc-shower.herokuapp.com/add-new-mirror-color', {
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
        // window.location.reload();
        setIsFetch(state=>!state);
        setNewValueColorName('');
        setNewValueColorPrice('');
      },1000)
  }

  
  const handleAddNewSwitch = () => {    
    fetch('https://calc-shower.herokuapp.com/add-new-mirror-switch', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newValueSwitchName,
        price: newValueSwitchPrice,
        showerId: currentObject._id
      })
    })
      .then((res) => res.json())
      setTimeout(() => {
        // window.location.reload();
        setIsFetch(state=>!state);
        setNewValueSwitchName('');
        setNewValueSwitchPrice('');
      },1000)
  }

  const handleAddNewBackLight = () => {    
    fetch('https://calc-shower.herokuapp.com/add-new-mirror-backlight', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newValueBackLightName,
        price: newValueBackLightPrice,
        showerId: currentObject._id
      })
    })
      .then((res) => res.json())
      setTimeout(() => {
        // window.location.reload();
        setIsFetch(state=>!state);
        setNewValueBackLightName('');
        setNewValueBackLightPrice('');
      },1000)
  }

  const handleAddNewFrame = () => {    
    fetch('https://calc-shower.herokuapp.com/add-new-mirror-frame', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newValueFrameName,
        price: newValueFramePrice,
        showerId: currentObject._id
      })
    })
      .then((res) => res.json())
      setTimeout(() => {
        // window.location.reload();
        setIsFetch(state=>!state);
        setNewValueFrameName('');
        setNewValueFramePrice('');
      },1000)
  }

  const handleAddNewProcessingСutout = () => {
    fetch('https://calc-shower.herokuapp.com/add-new-standart-mirror-processing-cutout', {
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

  const handleShowTypeBlock = () => {
    setShowTypeBlock(true);
    setShowFrameBlock(false);
    setShowBackLightBlock(false);
    setShowSwitchBlock(false);
    setShowColorsBlock(false);
    setShowCordBlock(false);
    setShowWarmedUpBlock(false);
    setShowPaintingBlock(false);
    setshowProcessingСutoutBlock(false);
  }

  const handleShowFrameBlock = () => {
    setShowTypeBlock(false);
    setShowFrameBlock(true);
    setShowBackLightBlock(false);
    setShowSwitchBlock(false);
    setShowColorsBlock(false);
    setShowCordBlock(false);
    setShowWarmedUpBlock(false);
    setShowPaintingBlock(false);
    setshowProcessingСutoutBlock(false);
  }

  const handleShowBackLightBlock = () => {
    setShowTypeBlock(false);
    setShowFrameBlock(false);
    setShowBackLightBlock(true);
    setShowSwitchBlock(false);
    setShowColorsBlock(false);
    setShowCordBlock(false);
    setShowWarmedUpBlock(false);
    setShowPaintingBlock(false);
    setshowProcessingСutoutBlock(false);
  }

  const handleShowSwitchBlock = () => {
    setShowTypeBlock(false);
    setShowFrameBlock(false);
    setShowBackLightBlock(false);
    setShowSwitchBlock(true);
    setShowColorsBlock(false);
    setShowCordBlock(false);
    setShowWarmedUpBlock(false);
    setShowPaintingBlock(false);
    setshowProcessingСutoutBlock(false);
  }

  const handleShowColorsBlock = () => {
    setShowTypeBlock(false);
    setShowFrameBlock(false);
    setShowBackLightBlock(false);
    setShowSwitchBlock(false);
    setShowColorsBlock(true);
    setShowCordBlock(false);
    setShowWarmedUpBlock(false);
    setShowPaintingBlock(false);
    setshowProcessingСutoutBlock(false);
  }

  const handleShowCordBlock = () => {
    setShowTypeBlock(false);
    setShowFrameBlock(false);
    setShowBackLightBlock(false);
    setShowSwitchBlock(false);
    setShowColorsBlock(false);
    setShowCordBlock(true);
    setShowWarmedUpBlock(false);
    setShowPaintingBlock(false);
    setshowProcessingСutoutBlock(false);
  }

  const handleShowWarmedUpBlock = () => {
    setShowTypeBlock(false);
    setShowFrameBlock(false);
    setShowBackLightBlock(false);
    setShowSwitchBlock(false);
    setShowColorsBlock(false);
    setShowCordBlock(false);
    setShowWarmedUpBlock(true);
    setShowPaintingBlock(false);
    setshowProcessingСutoutBlock(false);
  }

  const handleShowPaintingBlock = () => {
    setShowTypeBlock(false);
    setShowFrameBlock(false);
    setShowBackLightBlock(false);
    setShowSwitchBlock(false);
    setShowColorsBlock(false);
    setShowCordBlock(false);
    setShowWarmedUpBlock(false);
    setShowPaintingBlock(true);
    setshowProcessingСutoutBlock(false);
  }

  const handleShowProcessingСutoutBlock = () => {
    setShowTypeBlock(false);
    setShowFrameBlock(false);
    setShowBackLightBlock(false);
    setShowSwitchBlock(false);
    setShowColorsBlock(false);
    setShowCordBlock(false);
    setShowWarmedUpBlock(false);
    setShowPaintingBlock(false);
    setshowProcessingСutoutBlock(true);
  };


  console.log('currentObject[idxType].type.name',currentObject?.type && currentObject?.type[1]?.name);

  return (
    <div>
      <AdminHeader/>
            <div className="shower-cabin-edit-header">
            <h1 className={`header_item ${showTypeBlock ? 'active_tab' : ''}`}  onClick={handleShowTypeBlock}>Типи</h1>
            <h1 className={`header_item ${showFrameBlock ? 'active_tab' : ''}`}  onClick={handleShowFrameBlock}>Рамки</h1>
            <h1 className={`header_item ${showBackLightBlock ? 'active_tab' : ''}`}  onClick={handleShowBackLightBlock}>Підсвітка</h1>
            <h1 className={`header_item ${showSwitchBlock ? 'active_tab' : ''}`}  onClick={handleShowSwitchBlock}>Перемикачі</h1>
            <h1 className={`header_item ${showColorsBlock ? 'active_tab' : ''}`}  onClick={handleShowColorsBlock}>Кольори</h1>
            <h1 className={`header_item ${showCordBlock ? 'active_tab' : ''}`}  onClick={handleShowCordBlock}>Кабель</h1>
            <h1 className={`header_item ${showWarmedUpBlock ? 'active_tab' : ''}`}  onClick={handleShowWarmedUpBlock}>Підігрів</h1>
            <h1 className={`header_item ${showPaintingBlock ? 'active_tab' : ''}`}  onClick={handleShowPaintingBlock}>Фарбування</h1>
            <h1 className={`header_item ${showProcessingСutoutBlock ? 'active_tab' : ''}`}  onClick={handleShowProcessingСutoutBlock}>Обробка</h1>
            </div>
        {showTypeBlock && currentObject?.type &&
        currentObject?.type.map((item, idxType) => (
          <EditStandartMirrorsType key={idxType} idxType={idxType} item={item} 
          typeName={currentObject?.type[idxType]?.name}
          showerId={currentObject._id}
          setIsFetch={setIsFetch}
          updateTypePath='https://calc-shower.herokuapp.com/update-type'
          addNewGoodsPath='https://calc-shower.herokuapp.com/add-new-goods'
          updateGoodsPath='https://calc-shower.herokuapp.com/update-goods'
          deleteGoodsPath='https://calc-shower.herokuapp.com/remove-mirror-goods'/>
        ))}
        {showFrameBlock && 
        currentObject?.option?.frame.map((el, idx) => (
          <O_NamePriceTemplate el={el} key={idx} showerId={currentObject._id}
          setIsFetch={setIsFetch}
          pathEdit='https://calc-shower.herokuapp.com/update-mirror-frame'
          pathDelete='https://calc-shower.herokuapp.com/remove-mirror-frame'/>
        ))}
            {showFrameBlock && 
            <>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Назва" value={newValueFrameName} onChange={(e) => setNewValueFrameName(e.target.value)}/>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Ціна" value={newValueFramePrice} onChange={(e) => setNewValueFramePrice(e.target.value)}/>
            <button className=" edit_new_glass_button edit_new_glass-color_button" onClick={handleAddNewFrame}>Додати новий</button>
            </>
            }
             
            {showBackLightBlock &&
        currentObject?.option?.backLight.map((el, idx) => (
          <O_NamePriceTemplate el={el} key={idx} showerId={currentObject._id}
          setIsFetch={setIsFetch}
          pathEdit='https://calc-shower.herokuapp.com/update-mirror-backlight'
          pathDelete='https://calc-shower.herokuapp.com/remove-mirror-backlight'/>
        ))}
            {showBackLightBlock && 
            <>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Назва" value={newValueBackLightName} onChange={(e) => setNewValueBackLightName(e.target.value)}/>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Ціна" value={newValueBackLightPrice} onChange={(e) => setNewValueBackLightPrice(e.target.value)}/>
            <button className=" edit_new_glass_button edit_new_glass-color_button" onClick={handleAddNewBackLight}>Додати новий</button>
            </>
            }

            {showSwitchBlock &&
        currentObject?.option?.switch.map((el, idx) => (
          <O_NamePriceTemplate el={el} key={idx} showerId={currentObject._id}
          setIsFetch={setIsFetch}
          pathEdit='https://calc-shower.herokuapp.com/update-mirror-switch'
          pathDelete='https://calc-shower.herokuapp.com/remove-mirror-switch'/>
        ))}
            {showSwitchBlock && 
            <>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Назва" value={newValueSwitchName} onChange={(e) => setNewValueSwitchName(e.target.value)}/>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Ціна" value={newValueSwitchPrice} onChange={(e) => setNewValueSwitchPrice(e.target.value)}/>
            <button className=" edit_new_glass_button edit_new_glass-color_button" onClick={handleAddNewSwitch}>Додати новий</button>
            </>
            }

            {showColorsBlock &&
        currentObject?.option?.color.map((el, idx) => (
          <O_NamePriceTemplate el={el} key={idx} showerId={currentObject._id}
          setIsFetch={setIsFetch}
          pathEdit='https://calc-shower.herokuapp.com/update-mirror-color'
          pathDelete='https://calc-shower.herokuapp.com/remove-mirror-color'/>
        ))}
            {showColorsBlock && 
            <>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Назва" value={newValueColorName} onChange={(e) => setNewValueColorName(e.target.value)}/>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Ціна" value={newValueColorPrice} onChange={(e) => setNewValueColorPrice(e.target.value)}/>
            <button className=" edit_new_glass_button edit_new_glass-color_button" onClick={handleAddNewColor}>Додати новий</button>
            </>
            }
            {showCordBlock &&
                <O_EditPriceTemplate el={currentObject?.option?.cord}
                setIsFetch={setIsFetch}
                pathEdit='https://calc-shower.herokuapp.com/update-mirror-cord-price'
                showerId={currentObject?._id}/>
            }
            
            {showWarmedUpBlock &&
                <O_EditPriceTemplate el={currentObject?.option?.warmedUp}
                setIsFetch={setIsFetch}
                pathEdit='https://calc-shower.herokuapp.com/update-mirror-warmed-up-price'
                showerId={currentObject?._id}/>
            }

            {showPaintingBlock &&
                <O_EditPriceTemplate el={currentObject?.option?.painting}
                setIsFetch={setIsFetch}
                pathEdit='https://calc-shower.herokuapp.com/update-mirror-painting-price'
                showerId={currentObject?._id}/>
            }
            {showProcessingСutoutBlock && currentObject.processingСutout.map((el, idx) => (
                <O_EditProcessingСutoutTempalte el={el} key={idx} showerId={currentObject._id}
                pathEdit='https://calc-shower.herokuapp.com/update-standart-mirror-processing-cutout'
                pathDelete='https://calc-shower.herokuapp.com/remove-standart-mirror-processing-cutout'
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

export default EditStandartMirrors;
