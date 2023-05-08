import React, { useState, useEffect } from "react";
import '../../../style/edir-shower.scss';
import '../../../style/admin.scss'
import O_EditTypeTemplate from "../EditTemplate/O_EditTypeTemplate";
import O_EditSizeTemplate from "../EditTemplate/O_EditSizeTemplate";
import O_EditColorTemplate from "../EditTemplate/O_EditColorTemplate";
import O_EditFurnitureTemplate from "../EditTemplate/O_EditFurnitureTemplate";
import O_EditProcessingStandartTempalte from "../EditTemplate/O_EditProcessingStandartTempalte";
import O_EditProcessingСutoutTempalte from "../EditTemplate/O_EditProcessingСutoutTempalte";
import AdminHeader from '../AdminClientHeader';

const EditClientDashki = () => {
    const [showTypeBlock, setShowTypeBlock] = useState(true);
    const [currentObject, setCurrentObject] = useState({});
    const [newValueTypeName, setNewValueTypeName] = useState('');
    const [newValueTypePrice, setNewValueTypePrice] = useState('');
    const [newValueColorName, setNewValueColorName] = useState('');
    const [newValueColorPrice, setNewValueColorPrice] = useState('');
    const [newValueProcessingStandartName, setNewValueProcessingStandartName] = useState('');
    const [newValueProcessingStandartPrice, setNewValueProcessingStandartPrice] = useState('');
    const [newValueProcessingСutoutName, setNewValueProcessingСutoutName] = useState('');
    const [newValueProcessingСutoutPrice, setNewValueProcessingСutoutPrice] = useState('');
    const [isFtch, setIsFetch] = useState(false);

    useEffect(() => {
        fetch("https://calc-shower.herokuapp.com/get-all-dashki")
          .then((res) => res.json())
          .then((data) => {
            setCurrentObject(data[0]);
          })
          .catch((error) => console.error(error));
      }, [isFtch]);

      const handleAddNewType = () => {    
        fetch('https://calc-shower.herokuapp.com/add-new-client-dashki-type', {
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

    return (
        <div>
          <AdminHeader/>
            <div className="shower-cabin-edit-header">
            <h1 className={`header_item ${showTypeBlock ? 'active_tab' : ''}`}  onClick={() => setShowTypeBlock(state => !state)}>Типи</h1>
            </div>
            {showTypeBlock && currentObject?.typeWordpress && currentObject.typeWordpress.map((el, idx) => (
                <O_EditTypeTemplate el={el} key={idx} showerId={currentObject._id}
                setIsFetch={setIsFetch}
                pathEdit='https://calc-shower.herokuapp.com/update-client-dashki-type'
                pathDelete='https://calc-shower.herokuapp.com/remove-client-dashki-type'/>
            ))
            }
            {showTypeBlock && 
            <>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Назва" value={newValueTypeName} onChange={(e) => setNewValueTypeName(e.target.value)}/>
            <input className=" edit_new_glass_input edit_new_glass-color_input" placeholder="Ціна" value={newValueTypePrice} onChange={(e) => setNewValueTypePrice(e.target.value)}/>
            <button className=" edit_new_glass_button edit_new_glass-color_button" onClick={handleAddNewType}>Додати новий</button>
            </>
            }
        </div>
    );
};

export default EditClientDashki;

