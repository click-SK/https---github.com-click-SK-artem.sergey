import React, { useState, useEffect } from "react";

const StandartMirrors = ({ data }) => {
  const [currentType, setCurrentType] = useState(null);
  const [currentTypeArray, setCurrentTypeArray] = useState(null);
  const [currentGoods, setCurrentGoods] = useState(null);
  const [currentFrame, setCurrentFrame] = useState(null);
  const [currentBackLight, setCurrentBackLight] = useState(null);
  const [currentSwitch, setCurrentSwitch] = useState(null);
  const [currentColor, setCurrentColor] = useState(null);
  const [currentCord, setCurrentCord] = useState('');
  const [isWarmedUp, setIsWarmedUp] = useState(false);
  const [isPainting, setIsPainting] = useState(false);

  console.log("data", data);

  const selectTypeFunc = (e) => {
    const selectedType = JSON.parse(e.target.value);
    setCurrentType(selectedType);
    setCurrentTypeArray(selectedType.goods);
  };

  const selectGoodsFunc = (e) => {
    const selectedGoods = JSON.parse(e.target.value);
    console.log("selectedGoods", selectedGoods);
    setCurrentGoods(selectedGoods);
  };

  const selectFrameFunc = (e) => {
    const selectedFrame = JSON.parse(e.target.value);
    console.log("selectedFrame", selectedFrame);
    setCurrentFrame(selectedFrame);
  };

  const selectBackLightFunc = (e) => {
    const selectedBackLight = JSON.parse(e.target.value);
    console.log("selectedBackLight", selectedBackLight);
    setCurrentBackLight(selectedBackLight);
  };

  const selectSwitchFunc = (e) => {
    const selectedSwitch = JSON.parse(e.target.value);
    console.log("selectedSwitch", selectedSwitch);
    setCurrentSwitch(selectedSwitch);
  };

  const changeCord = (e) => {
    const cordObj = data?.option?.cord;
    console.log('cordObj',cordObj);
    setCurrentCord(e.target.value);
  }

  const changeWarmUpFunc = () => {
    const warmeUpObj = data?.option?.warmedUp;
    setIsWarmedUp(isWarmedUp => !isWarmedUp)
    console.log('warmeUpObj',warmeUpObj);
  }

  console.log('isWarmedUp',isWarmedUp);

  const changePaintingFunc = () => {
    const paintingObj = data?.option?.painting;
    setIsPainting(isPainting => !isPainting)
    console.log('paintingObj',paintingObj);
  }

  const selectedColorFunc = (e) => {
    const selectedColor = JSON.parse(e.target.value);
    console.log("selectedColor", selectedColor);
    setCurrentColor(selectedColor);
  }

  const calcTotalSum = () => {
    const finalObject = {
      name: 'My Name',
      age: 30,
      work: 'frontEnd',
      coutry: 'USA'
    }
    console.log('finalObject',finalObject);
  }

  return (
    <div>
      <h3>Оберіть тип скла</h3>
      <div>
        <select
          onChange={selectTypeFunc}
          value={currentType ? JSON.stringify(currentType) : ""}
        >
          <option value="" disabled>
            Оберіть тип
          </option>
          {data?.type &&
            data.type.map((item) => (
              <option key={item.name} value={JSON.stringify(item)}>
                {item.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <h3>Виберіть товар:</h3>

        <select
          onChange={selectGoodsFunc}
          value={currentGoods ? JSON.stringify(currentGoods) : ""}
        >
          <option value="" disabled>
            Оберіть товар
          </option>
          {currentTypeArray &&
            currentTypeArray.map((item) => (
              <option key={item.name} value={JSON.stringify(item)}>
                {item.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <h3>Виберіть рамку:</h3>

        <select
          onChange={selectFrameFunc}
          value={currentFrame ? JSON.stringify(currentFrame) : ""}
        >
          <option value="" disabled>
            Оберіть Рамку
          </option>
          {data?.option?.frame &&
            data.option.frame.map((item) => (
              <option key={item.name} value={JSON.stringify(item)}>
                {item.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <h3>Виберіть підсвітку:</h3>

        <select
          onChange={selectBackLightFunc}
          value={currentBackLight ? JSON.stringify(currentBackLight) : ""}
        >
          <option value="" disabled>
            Оберіть підсвітку
          </option>
          {data?.option?.backLight &&
            data.option.backLight.map((item) => (
              <option key={item.name} value={JSON.stringify(item)}>
                {item.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <h3>Виберіть вимикач:</h3>

        <select
          onChange={selectSwitchFunc}
          value={currentSwitch ? JSON.stringify(currentSwitch) : ""}
        >
          <option value="" disabled>
            Оберіть вимикач
          </option>
          {data?.option?.switch &&
            data.option.switch.map((item) => (
              <option key={item.name} value={JSON.stringify(item)}>
                {item.name}
              </option>
            ))}
        </select>
      </div>

      <div>
      <h3>Виберіть довжину кабеля:</h3>
        <input placeholder="Довжина кабеля" value={currentCord} onChange={(e) => changeCord(e)}/>
      </div>

      <div>
        <h3>Підігрів:</h3>
        <input type='checkbox' checked={isWarmedUp} onChange={changeWarmUpFunc}/>
      </div>

      <div>
        <h3>Покраска:</h3>
        <input type='checkbox' checked={isPainting} onChange={changePaintingFunc}/>
      </div>

      <div>
        <h3>Виберіть колір:</h3>

        <select
          onChange={selectedColorFunc}
          value={currentColor ? JSON.stringify(currentColor) : ""}
        >
          <option value="" disabled>
            Оберіть колір
          </option>
          {isPainting && data?.option?.color &&
            data.option.color.map((item) => (
              <option key={item.name} value={JSON.stringify(item)}>
                {item.name}
              </option>
            ))}
        </select>
      </div>

      <button style={{margin: '200px 0px'}} onClick={calcTotalSum}>Підрухувати кінцеву вартість</button>
    </div>
  );
};

export default StandartMirrors;
