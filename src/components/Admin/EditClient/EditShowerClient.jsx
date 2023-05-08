import React, { useState, useEffect } from "react";
import '../../../style/edir-shower.scss';
import '../../../style/admin.scss'
import O_EditTypeTemplate from '../EditTemplate/O_EditTypeTemplate';
import O_EditDorsHandles from "../EditTemplate/O_EditDorsHandles";
import O_NamePriceTemplate from '../EditTemplate/O_NamePriceTemplate'
import AdminHeader from '../AdminHeader';
const EditShowerClient = () => {
    const [currentObject, setCurrentObject] = useState({});
    const [showTypeBlock, setShowTypeBlock] = useState(true);
    const [showDorsHandlesBlock, setShowDorsHandlesBlock] = useState(false);
    const [newValueTypeName, setNewValueTypeName] = useState('');
    const [newValueTypePrice, setNewValueTypePrice] = useState('');
    const [newValueDorsHandlesName, setNewValueDorsHandlesName] = useState('');
    const [newValueDorsHandlesPrice, setNewValueDorsHandlesPrice] = useState('');

    useEffect(() => {
        fetch("https://calc-shower.herokuapp.com/get-all-shower")
          .then((res) => res.json())
          .then((data) => {
            setCurrentObject(data[0]);
          })
          .catch((error) => console.error(error));
      }, []);

      const handleAddNewType = () => {    
        fetch('https://calc-shower.herokuapp.com/add-new-shower-client-type', {
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

      const handleAddNewHandleDors = () => {    
        fetch('https://calc-shower.herokuapp.com/add-new-shower-handle-dors', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newValueDorsHandlesName,
            price: newValueDorsHandlesPrice,
            showerId: currentObject._id
          })
        })
          .then((res) => res.json())
          setTimeout(() => {
            window.location.reload();
          },1000)
      }

      console.log('newValueTypeName',newValueTypeName);
      console.log('newValueTypePrice',newValueTypePrice);

      const handleShowTypeBlock = () => {
        setShowTypeBlock(true);
        setShowDorsHandlesBlock(false);
      }

      const handleShowDorsHandlesBlock = () => {
        setShowTypeBlock(false);
        setShowDorsHandlesBlock(true);
      }
      
    return (
        <div>
          <AdminHeader/>
            <div className="shower-cabin-edit-header">
            <h1 className={`header_item ${showTypeBlock ? 'active_tab' : ''}`}  onClick={handleShowTypeBlock}>Типи</h1>
            <h1 className={`header_item ${showDorsHandlesBlock ? 'active_tab' : ''}`}  onClick={handleShowDorsHandlesBlock}>Ручки</h1>
            </div>
            {showTypeBlock && currentObject.typeWordpress && currentObject.typeWordpress.map((el, idx) => (
                <O_NamePriceTemplate el={el} key={idx} showerId={currentObject._id}
                pathEdit='https://calc-shower.herokuapp.com/update-shower-client-type'
                pathDelete='https://calc-shower.herokuapp.com/remove-shower-client-type'/>
            ))
            }
            {showTypeBlock && 
            <>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Назва" value={newValueTypeName} onChange={(e) => setNewValueTypeName(e.target.value)}/>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Ціна" value={newValueTypePrice} onChange={(e) => setNewValueTypePrice(e.target.value)}/>
            <button className=" edit_new_glass_button edit_new_glass-color_button" onClick={handleAddNewType}>Додати новий</button>
            </>
            }

            {showDorsHandlesBlock && currentObject.dorsHandles.map((el, idx) => (
                <O_NamePriceTemplate el={el} key={idx} showerId={currentObject._id}
                pathEdit='https://calc-shower.herokuapp.com/update-shower-handle-dors'
                pathDelete='https://calc-shower.herokuapp.com/remove-shower-handle-dors'/>
            ))
            }
            {showDorsHandlesBlock && 
            <>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Назва" value={newValueDorsHandlesName} onChange={(e) => setNewValueDorsHandlesName(e.target.value)}/>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Ціна" value={newValueDorsHandlesPrice} onChange={(e) => setNewValueDorsHandlesPrice(e.target.value)}/>
            <button className=" edit_new_glass_button edit_new_glass-color_button" onClick={handleAddNewHandleDors}>Додати новий</button>
            </>
            }
        </div>
    );
};

export default EditShowerClient;