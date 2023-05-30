import React, { useState } from "react";
import GlassProcessingCountSecondTemplate from './GlassProcessingCountSecondTemplate'
import "../../style/mirrors.scss";
import "../../style/shower.scss";
const GlassProcessingCountTemplate = ({
  processingStandart,
  setCurrentArr,
  currentArr,
  title
}) => {

  console.log("currentArr", currentArr);

  return (
    <div>
      <h1>{title}</h1>
      {processingStandart.map((item) => (
        <GlassProcessingCountSecondTemplate key={item._id}
        item={item}
        setCurrentArr={setCurrentArr}
        currentArr={currentArr}/>
      ))}
    </div>
  );
};

export default GlassProcessingCountTemplate;
