import React, { useState, useEffect } from "react";
import StandartMirrors from './StandartMirrors';
import CosmeticMirrors from "./CosmeticMirrors";
import { CSVLink } from "react-csv";
import '../style/shower.scss'
import '../style/mirrors.scss'

const Mirrors = () => {
    const [mirrorsStandartData, setMirrorsStandartData] = useState(null);
    const [mirrorsCosmeticData, setMirrorsCosmeticData] = useState(null);
    const [standartMirrors, setStandartMirrors] = useState(true);
    const [cosmeticMirrors, setCosmeticMirrors] = useState(false);

    useEffect(() => {
        fetch("https://calc-shower.herokuapp.com/get-all-standart-mirrors")
          .then((res) => res.json())
          .then((data) => {
            setMirrorsStandartData(data[0])
          })
          .catch((error) => console.error(error));
      }, []);

      useEffect(() => {
        fetch("https://calc-shower.herokuapp.com/get-all-cosmetic-mirrors")
          .then((res) => res.json())
          .then((data) => {
            setMirrorsCosmeticData(data[0])
          })
          .catch((error) => console.error(error));
      }, []);
      
    return (
        <div className="mirrors_wrapper">
          <div style={{display: 'flex', justifyContent:'space-around', width:'100%'}}>
          <h1 onClick={() => setStandartMirrors(standartMirrors => !standartMirrors)}>Standart Mirrors</h1>
          <h1 onClick={() => setCosmeticMirrors(cosmeticMirrors => !cosmeticMirrors)}>Cosmetic Mirrors</h1>
          </div>
            {standartMirrors &&
              <StandartMirrors data={mirrorsStandartData}/>
            }
            {cosmeticMirrors &&
              <CosmeticMirrors data={mirrorsCosmeticData}/>
            }
        </div>
    );
};

export default Mirrors;