import React from "react";
import "../../style/modal.scss";
import DispalayModalItems from "./DispalayModalItems";
import {AiOutlineClose} from 'react-icons/ai';

const Modal = ({ isOpen, onClose, furnitureProps }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
        <AiOutlineClose className="cross"/>
        </button>
        <div className="furniture_wrap">
          {furnitureProps.map((item) => (
            <DispalayModalItems key={item._id} item={item}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
