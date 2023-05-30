import React, {useState, useEffect} from "react";
import "../style/modal.scss";
import DispalayModalItemsGlassPartitions from "./DispalayModalItemsGlassPartitions";
import {AiOutlineClose} from 'react-icons/ai';

const ModalGlassPartitions = ({ isOpen, onClose, furnitureProps, currentPartitions }) => {
  const [filterArray, setFilterArray] = useState([]);

  useEffect(() => {
    if (furnitureProps) {
      const filteredFurnitureProps = furnitureProps.filter(item => currentPartitions === item.partitionsType);
      setFilterArray(filteredFurnitureProps);
    }
  }, [furnitureProps, currentPartitions]);
  
    if (!isOpen) return null;
    console.log('furnitureProps',furnitureProps);
    return (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={onClose}>
            <AiOutlineClose className="cross"/>
            </button>
            <div className="furniture_wrap">
              {filterArray.length != 0 && filterArray.map((item) => (
                <DispalayModalItemsGlassPartitions key={item._id} item={item} currentPartitions={currentPartitions}/>
              ))}
            </div>
          </div>
        </div>
      );
};

export default ModalGlassPartitions;