import React, { useState, useEffect } from "react";

const ShowerCabin = () => {
  const [totalSum, setTotalSum] = useState(null);
  const [widthValue, setWidthValue] = useState(0);
  const [heightValue, setHeightValue] = useState(0);
  const [volumValue, setVolumValue] = useState(0);
  const [widthSum, setWidthSum] = useState(0);
  const [heightSum, setHeightSum] = useState(0);
  const [volumSum, setVolumSum] = useState(0);

  const calcTotalSumFunc = () => {
    const priceForSize = widthSum + heightSum + volumSum;
    let total = 0;
    if(currentType?.price) {
      total = currentType.price;
    }

    const res = total + priceForSize;
    setTotalSum(res)
  }

  const changeWidth = (e) => {
    setWidthValue(e);
    setWidthSum(Number(e) * 5)
  }

  const changeHeight = (e) => {
    setHeightValue(e)
    setHeightSum(Number(e) * 5)
  }

  const changeVolume = (e) => {
    setVolumValue(e)
    setVolumSum(Number(e) * 5)
  }

  return (
    <div>
      <h3>Вкажіть розміри:</h3>
      <div>
        <div>
          <h4>Ширина:</h4>
          <input value={widthValue} onChange={(e) => changeWidth(e.target.value)}/>
        </div>
        <div>
          <h4>Висота:</h4>
          <input value={heightValue} onChange={(e) => changeHeight(e.target.value)}/>
        </div>
        <div>
          <h4>Обєм:</h4>
          <input value={volumValue} onChange={(e) => changeVolume(e.target.value)}/>
        </div>
      </div>

      <div>
        <button onClick={calcTotalSumFunc}>Підрахувати вартість</button>
      </div>
      <div>
        <h3>Кінцева вартість {totalSum && totalSum}:</h3>
      </div>
    </div>
  );
};

export default ShowerCabin;
