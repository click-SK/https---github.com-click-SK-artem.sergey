import React, { useState, useEffect } from "react";
import StandartMirrors from './StandartMirrors';

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