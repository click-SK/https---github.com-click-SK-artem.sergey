import React, { useState, useEffect } from "react";
import "../style/modal.scss";
import DispalayModalItems from "./Furniture/DispalayModalItems";
import {AiOutlineClose} from 'react-icons/ai';

const ModalAllFurniture = ({ isOpen, onClose, furnitureProps }) => {
  const [currentShower, setCurrentShower] = useState([]);
  const [currentDashki, setCurrentDashki] = useState([]);
  const [currentGlassPartition, setCurrentGlassPartition] = useState([]);
  const [currentAllFurniture, setCurrentAllFurniture] = useState([]);

  useEffect(() => {
    fetch("https://sklo-expert.herokuapp.com/get-all-shower")
      .then((res) => res.json())
      .then((data) => {
        setCurrentShower(data[0].furniture);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch("https://sklo-expert.herokuapp.com/get-all-dashki")
      .then((res) => res.json())
      .then((data) => {
        setCurrentDashki(data[0].furniture);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch("https://sklo-expert.herokuapp.com/get-all-glass-partitions")
      .then((res) => res.json())
      .then((data) => {
        setCurrentGlassPartition(data[0].furniture);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    let newArr = [];
    if(currentShower.length != 0) {
        currentShower.forEach((item) => {
            newArr.push(item)
        })
    }
    if(currentDashki.length != 0) {
        currentDashki.forEach((item) => {
            newArr.push(item)
        })
    }
    if(currentGlassPartition.length != 0) {
        currentGlassPartition.forEach((item) => {
            newArr.push(item)
        })
    }
    setCurrentAllFurniture(newArr)
  }, [currentShower, currentDashki, currentGlassPartition]);


  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
        <AiOutlineClose className="cross"/>
        </button>
        <div className="furniture_wrap">
          {currentAllFurniture.map((item) => (
            <DispalayModalItems key={item._id} item={item}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalAllFurniture;
