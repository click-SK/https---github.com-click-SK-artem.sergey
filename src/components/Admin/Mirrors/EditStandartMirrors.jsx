import React, { useEffect, useState } from "react";
import '../../../style/admin.scss'
import '../../../style/edir-shower.scss';
import EditStandartMirrorsType from "./EditStandartMirrorsType";
import O_NamePriceTemplate from "../EditTemplate/O_NamePriceTemplate";
import O_EditPriceTemplate from "../EditTemplate/O_EditPriceTemplate";
const EditStandartMirrors = () => {
  const [currentObject, setCurrentObject] = useState({});
  const [showTypeBlock, setShowTypeBlock] = useState(false);
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

  useEffect(() => {
    fetch("https://calc-shower.herokuapp.com/get-all-standart-mirrors")
      .then((res) => res.json())
      .then((data) => {
        setCurrentObject(data[0]);
      })
      .catch((error) => console.error(error));
  }, []);

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
        window.location.reload();
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
        window.location.reload();
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
        window.location.reload();
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
        window.location.reload();
      },1000)
  }

  console.log('currentObject[idxType].type.name',currentObject?.type && currentObject?.type[1]?.name);

  return (
    <div>
    {/* <div className="mirrors_wraper"></div> */}
            <div className="shower-cabin-edit-header">
            <h1 className="header_item"  onClick={() => setShowTypeBlock(showTypeBlock => !showTypeBlock)}>Типи</h1>
            <h1 className="header_item"  onClick={() => setShowFrameBlock(showTypeBlock => !showTypeBlock)}>Рамки</h1>
            <h1 className="header_item"  onClick={() => setShowBackLightBlock(showTypeBlock => !showTypeBlock)}>Підсвітка</h1>
            <h1 className="header_item"  onClick={() => setShowSwitchBlock(showTypeBlock => !showTypeBlock)}>Перемикачі</h1>
            <h1 className="header_item"  onClick={() => setShowColorsBlock(showTypeBlock => !showTypeBlock)}>Колори</h1>
            <h1 className="header_item"  onClick={() => setShowCordBlock(showTypeBlock => !showTypeBlock)}>Кабель</h1>
            <h1 className="header_item"  onClick={() => setShowWarmedUpBlock(showTypeBlock => !showTypeBlock)}>Підігрів</h1>
            <h1 className="header_item"  onClick={() => setShowPaintingBlock(showTypeBlock => !showTypeBlock)}>Покраска</h1>
            </div>
        {showTypeBlock &&
        currentObject?.type.map((item, idxType) => (
          <EditStandartMirrorsType key={idxType} idxType={idxType} item={item} 
          typeName={currentObject?.type[idxType]?.name}
          showerId={currentObject._id}/>
        ))}
        {showFrameBlock && 
        currentObject?.option?.frame.map((el, idx) => (
          <O_NamePriceTemplate el={el} key={idx} showerId={currentObject._id}
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
                pathEdit='https://calc-shower.herokuapp.com/update-mirror-cord-price'
                showerId={currentObject?._id}/>
            }

            {showWarmedUpBlock &&
                <O_EditPriceTemplate el={currentObject?.option?.warmedUp}
                pathEdit='https://calc-shower.herokuapp.com/update-mirror-warmed-up-price'
                showerId={currentObject?._id}/>
            }

            {showPaintingBlock &&
                <O_EditPriceTemplate el={currentObject?.option?.painting}
                pathEdit='https://calc-shower.herokuapp.com/update-mirror-painting-price'
                showerId={currentObject?._id}/>
            }
    </div>
  );
};

export default EditStandartMirrors;
