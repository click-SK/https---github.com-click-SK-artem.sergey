import React, { useState, useEffect } from "react";
import StandartMirrors from './StandartMirrors';
import { CSVLink } from "react-csv";

const Mirrors = ({data}) => {

    //   console.log('currentObject',currentObject);
    return (
        <div>
            <h1>Mirrors</h1>
            <StandartMirrors data={data}/>
        </div>
    );
};

export default Mirrors;