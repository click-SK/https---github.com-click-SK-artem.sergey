import React, { useState, useEffect } from "react";
import StandartMirrors from './StandartMirrors';
import { CSVLink } from "react-csv";

const Mirrors = () => {
    const [currentObject, setCurrentObject] = useState({});
    useEffect(() => {
        fetch("http://localhost:4444/get-all-standart-mirrors")
          .then((res) => res.json())
          .then((data) => {
            setCurrentObject(data[0]);
          })
          .catch((error) => console.error(error));
      }, []);
    //   console.log('currentObject',currentObject);
    return (
        <div>
            <h1>Mirrors</h1>
            <StandartMirrors data={currentObject}/>
        </div>
    );
};

export default Mirrors;