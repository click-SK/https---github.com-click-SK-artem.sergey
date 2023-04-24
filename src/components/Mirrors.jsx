import React, { useState, useEffect } from "react";
import StandartMirrors from './StandartMirrors';

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

      console.log('mirrorsData',mirrorsData);
    return (
        <div>
            <h1>Mirrors</h1>
            {mirrorsData &&
              <StandartMirrors data={mirrorsData}/>
            }
        </div>
    );
};

export default Mirrors;