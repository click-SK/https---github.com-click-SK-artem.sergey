import React, { useEffect, useState } from "react";
import '../../../style/admin.scss'
import '../../../style/edir-shower.scss';
import EditClientStandartMirrorsType from "./EditClientStandartMirrorsType";
import O_NamePriceTemplate from "../EditTemplate/O_NamePriceTemplate";
import O_EditPriceTemplate from "../EditTemplate/O_EditPriceTemplate";
import AdminHeader from '../AdminClientHeader';
const EditClientStandartMirror = () => {
  const [currentObject, setCurrentObject] = useState({});
  const [showTypeBlock, setShowTypeBlock] = useState(true);
  const [isFtch, setIsFetch] = useState(false);
  useEffect(() => {
    fetch("https://sklo-expert-server-v2-9a33eddf90a1.herokuapp.com/get-all-standart-mirrors")
      .then((res) => res.json())
      .then((data) => {
        setCurrentObject(data[0]);
      })
      .catch((error) => console.error(error));
  }, [isFtch]);

  return (
    <div>
      <AdminHeader/>
            <div className="shower-cabin-edit-header">
            <h1 className={`header_item ${showTypeBlock ? 'active_tab' : ''}`}  onClick={() => setShowTypeBlock(state => !state)}>Типи</h1>
            </div>
        {showTypeBlock && currentObject?.typeWordpress &&
        currentObject?.typeWordpress.map((item, idxType) => (
          <EditClientStandartMirrorsType key={idxType} idxType={idxType} item={item} 
          typeName={currentObject?.type[idxType]?.name}
          showerId={currentObject._id}
          setIsFetch={setIsFetch}
          updateTypePath='https://sklo-expert-server-v2-9a33eddf90a1.herokuapp.com/update-client-type'
          addNewGoodsPath='https://sklo-expert-server-v2-9a33eddf90a1.herokuapp.com/add-new-client-goods'
          updateGoodsPath='https://sklo-expert-server-v2-9a33eddf90a1.herokuapp.com/update-client-goods'
          deleteGoodsPath='https://sklo-expert-server-v2-9a33eddf90a1.herokuapp.com/remove-client-mirror-goods'/>
        ))}
    </div>
  );
};

export default EditClientStandartMirror;
