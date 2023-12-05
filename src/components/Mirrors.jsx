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
        fetch("https://sklo-expert-server-v2-9a33eddf90a1.herokuapp.com/get-all-standart-mirrors")
          .then((res) => res.json())
          .then((data) => {
            setMirrorsStandartData(data[0])
          })
          .catch((error) => console.error(error));
      }, []);

      useEffect(() => {
        fetch("https://sklo-expert-server-v2-9a33eddf90a1.herokuapp.com/get-all-cosmetic-mirrors")
          .then((res) => res.json())
          .then((data) => {
            setMirrorsCosmeticData(data[0])
          })
          .catch((error) => console.error(error));
      }, []);

      const handleShowStandartMirrors = () => {
        setStandartMirrors(true);
        setCosmeticMirrors(false);
      }

      const handleCosmeticMirrors = () => {
        setStandartMirrors(false);
        setCosmeticMirrors(true);
      }
      
    return (
        <div className="mirrors_wrapper">
          <div style={{display: 'flex', justifyContent:'space-around', width:'100%'}}>
          <h1 className={`header_item ${standartMirrors ? 'active_tab' : ''}`} onClick={handleShowStandartMirrors}>Стандартні дзеркала</h1>
          <h1 className={`header_item ${cosmeticMirrors ? 'active_tab' : ''}`} onClick={handleCosmeticMirrors}>Косметичні дзеркала</h1>
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