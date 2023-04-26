import React from 'react';

const EditShowerFurnitureDepends = ({el}) => {
    return (
        <div>
        {el?.depends.map((item, idx) => (
          <div key={idx}>
            <p>{item}</p>
          </div>
        ))}
          <button>Редагувати</button>
      </div>
    );
};

export default EditShowerFurnitureDepends;