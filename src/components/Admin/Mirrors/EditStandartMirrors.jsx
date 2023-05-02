import React, { useEffect, useState } from "react";
import EditStandartMirrorsType from "./EditStandartMirrorsType";
import '../../../style/admin.scss'
const EditStandartMirrors = () => {
  const [currentObject, setCurrentObject] = useState({});

  useEffect(() => {
    fetch("https://calc-shower.herokuapp.com/get-all-standart-mirrors")
      .then((res) => res.json())
      .then((data) => {
        setCurrentObject(data[0]);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="mirrors_wraper">
      <h1>Редагування дзеркал</h1>
      {currentObject?.type &&
        currentObject?.type.map((item, idxType) => (
          <EditStandartMirrorsType key={idxType} idxType={idxType} item={item}/>
        ))}
    </div>
  );
};

export default EditStandartMirrors;
