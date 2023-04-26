import React, { useState, useEffect } from "react";
import StandartMirrors from './StandartMirrors';
import { CSVLink } from "react-csv";
import '../style/shower.scss'
import '../style/mirrors.scss'

const Mirrors = () => {
    const [mirrorsData, setMirrorsData] = useState(null);

    useEffect(() => {
        fetch("https://calc-shower.herokuapp.com/get-all-standart-mirrors")
          .then((res) => res.json())
          .then((data) => {
            setMirrorsData(data[0])
          })
          .catch((error) => console.error(error));
      }, []);
      
    return (
        <div className="mirrors_wrapper">
            <h1>Mirrors</h1>
            {mirrorsData &&
              <StandartMirrors data={mirrorsData}/>
            }
        </div>
    );
};

export default Mirrors;