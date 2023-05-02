import React from "react";
import "../style/modal.scss";
import DispalayModalItemsGlassPartitions from "./DispalayModalItemsGlassPartitions";
import {AiOutlineClose} from 'react-icons/ai';

const ModalGlassPartitions = ({ isOpen, onClose, furnitureProps, currentPartitions }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={onClose}>
            <AiOutlineClose className="cross"/>
            </button>
            <div className="furniture_wrap">
              {furnitureProps.map((item) => (
                <DispalayModalItemsGlassPartitions key={item._id} item={item} currentPartitions={currentPartitions}/>
              ))}
            </div>
          </div>
        </div>
      );
};

export default ModalGlassPartitions;