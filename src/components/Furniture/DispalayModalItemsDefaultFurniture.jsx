import React, {useState} from 'react';
import "../../style/modal.scss";

const DispalayModalItemsDefaultFurniture = ({item,deleteElementInArrayFunc}) => {


    return (
        <div className="furniture_block">
        <img src={item.mainImage} style={{width:'120px'}} className='image_furniture'/>
        <div style={{maxWidth:'150px'}}>
        <h2 >{item.title}</h2>
          {item?.depends.map((depends) => (
            <div key={depends}>
              <p>{depends}</p>
            </div>
          ))}
        </div>
        <img style={{width:'120px'}} src={item.drawingImg} className='image_furniture'/>
        <button className='add_furniture' 
        onClick={() => deleteElementInArrayFunc(item)}
        style={{background:'red'}}>Видалити</button>
      </div>
    );
};

export default DispalayModalItemsDefaultFurniture;