import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import ExelPrint from "./ExelPrint";
import PdfFile from "./PdfFile";
import Api from "./Api";
import '../style/shower.scss'
import '../style/mirrors.scss'
import { PDFDownloadLink } from '@react-pdf/renderer';

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
  const [sizeWidthMirrors,setSizeWidthMirrors] = useState('');
  const [sizeHeightMirrors,setSizeHeightMirrors] = useState('');
  const [sizeFrame,setSizeFrame] = useState(0);
  const [totalSum, setTotalSum] = useState(0);
  const [finishMirrorPdf, setFinishMirrorPdf] = useState({});
  const [validationInput, setValidationInput] = useState(false);
  // const keyCsv = [
  //   {"Форма скла": currentType?.name },
  //   {"Тип дзеркала" : 'З фоновою підсвідкою'}
  // ];

  const keyCsv = [
    [ "Магазин", "Дзеркала" ],
    [ "Назва", "Модифікація", "Ціна" ],
    [ 'Форма скла', currentType?.name, "" ],
    [ 'Тип дзеркала', 'Дзеркало з фоновою підсвідкою', "4700 грн\м2" ],
    [ 'Розмір', 'В: 1м, Ш:1 ', "4700 грн" ],
    [ 'Рамка', 'Металева рамка буквою П', "900 грн" ]
  ];


  const calcTotalSum = () => {
    if(sizeWidthMirrors && sizeHeightMirrors || !currentType && !currentGoods) {
      setValidationInput(false)
      const priceMeterCord = data?.option?.cord?.price;

      const calcSize = Number(sizeWidthMirrors) * Number(sizeHeightMirrors);
      const calcSquareMeter = calcSize/10000;
      const warmedUpPrice = data?.option?.warmedUp?.price;
  
      const resSizePrice = calcSquareMeter * currentGoods?.price;
      const resCordSum = currentCord * priceMeterCord;
      const resFrameSum = sizeFrame * (currentFrame?.price || 0);

      console.log('priceMeterCord',priceMeterCord);
      console.log('calcSize',calcSize);
      console.log('calcSquareMeter',calcSquareMeter);
      console.log('warmedUpPrice',warmedUpPrice);
      console.log('resCordSum',resCordSum);
      console.log('resFrameSum',resFrameSum);

  
      const total = (resSizePrice || 0) + (resCordSum || 0) + (resFrameSum || 0) + (currentSwitch?.price || 0) + (isPainting ? currentColor?.price || 600 : 0) + (isWarmedUp ? warmedUpPrice : 0);
  
      const finishedMirros = {
        type: currentType?.name,
        goodsPrice: currentGoods?.price,
        goodsName: currentGoods?.name,
        width: sizeWidthMirrors,
        height: sizeHeightMirrors,
        framePrice: currentFrame?.price,
        frameSize: sizeFrame,
        frameName: currentFrame?.name,
        switchName: currentSwitch?.name,
        switchPrice: currentSwitch?.price,
        cord: currentCord,
        warmerUp: isWarmedUp ? 'Так' : 'Ні', 
        painting: isPainting ? 'Так' : 'Ні',
        colorName: isPainting ? currentColor?.name : '-',
        colorPrice: isPainting ? currentColor?.price : '-',
        total: total,
        print: "hello"
      }
  
      setFinishMirrorPdf(finishedMirros)
      
  
      setTotalSum(total)
    } else {
      setValidationInput(true)
    }
  }

  const selectTypeFunc = (e) => {
    const selectedType = JSON.parse(e.target.value);
    setCurrentType(selectedType);
    setCurrentTypeArray(selectedType.goods);
  };

  const selectGoodsFunc = (e) => {
    const selectedGoods = JSON.parse(e.target.value);
    setCurrentGoods(selectedGoods);
  };

  const selectFrameFunc = (e) => {
    const selectedFrame = JSON.parse(e.target.value);
    setCurrentFrame(selectedFrame);
  };

  const selectBackLightFunc = (e) => {
    const selectedBackLight = JSON.parse(e.target.value);
    setCurrentBackLight(selectedBackLight);
  };

  const selectSwitchFunc = (e) => {
    const selectedSwitch = JSON.parse(e.target.value);
    setCurrentSwitch(selectedSwitch);
  };

  const changeCord = (e) => {
    const cordObj = data?.option?.cord;
    setCurrentCord(e.target.value);
  }

  const changeWarmUpFunc = () => {
    const warmeUpObj = data?.option?.warmedUp;
    setIsWarmedUp(isWarmedUp => !isWarmedUp)
  }

  const changePaintingFunc = () => {
    const paintingObj = data?.option?.painting;
    setIsPainting(isPainting => !isPainting)
  }

  const selectedColorFunc = (e) => {
    const selectedColor = JSON.parse(e.target.value);
    setCurrentColor(selectedColor);
  }

  // console.log('currentType',currentType);
  // console.log('currentGoods',currentGoods);
  // console.log('sizeWidthMirrors',sizeWidthMirrors);
  // console.log('sizeHeightMirrors',sizeHeightMirrors);
  // console.log('currentFrame',currentFrame);
  // console.log('currentBackLight',currentBackLight);
  // console.log('currentSwitch',currentSwitch);
  // console.log('currentCord',currentCord);
  // console.log('isWarmedUp',isWarmedUp);
  // console.log('isPainting',isPainting);
  // console.log('currentColor',currentColor);
  console.log('totalSum',totalSum);

  return (
    <div className="wrap_item mirrors_item">
      <div className="choose_item item_mirrors">
      <h3>Оберіть тип скла</h3>
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

      
          <div className="choose_item item_mirrors">
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

            <div className="choose_item item_mirrors">
            <h3>Вкажіть розмір скла</h3>
            <div>
              <input type="number" placeholder="Ширина" value={sizeWidthMirrors} onChange={(e) => setSizeWidthMirrors(e.target.value)}/>
              <p style={{color: 'red'}}>{validationInput && currentGoods && currentType && 'Введіть данні'}</p>
              <input type="number" placeholder="Висота" value={sizeHeightMirrors} onChange={(e) => setSizeHeightMirrors(e.target.value)}/>
              <p style={{color: 'red'}}>{validationInput && currentGoods && currentType && 'Введіть данні'}</p>
            </div>
            </div>
      

      
        <div className="choose_item item_mirrors">         
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

        <div className="choose_item item_mirrors">
            <h3>Вкажіть розмір рамки</h3>
            <div>
              <input type="number" value={sizeFrame} onChange={(e) => setSizeFrame(e.target.value)}/>
            </div>
            </div>
      
        <div className="choose_item item_mirrors">
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
      

      
        <div className="choose_item item_mirrors">
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
      

      <div className="choose_item item_mirrors">
      <h3>Довжину кабелю (м):</h3>
        <input className="cabel" placeholder="Довжина кабелю" value={currentCord} onChange={(e) => changeCord(e)}/>
      </div>

      <div className="choose_item item_mirrors check-item">
        <h3>Підігрів:</h3>
        <div className="checkbox_wrap">
        <input id="checkbox1" className="checkbox" type='checkbox' checked={isWarmedUp} onChange={changeWarmUpFunc}/>
        <label className="checkbox-label" htmlFor="checkbox1"></label>
        </div>
      </div>

      <div className="choose_item item_mirrors check-item">
        <h3>Покраска:</h3>
        <div className="checkbox_wrap">
        <input id="checkbox2"  className="checkbox" type='checkbox' checked={isPainting} onChange={changePaintingFunc}/>
        <label className="checkbox-label" htmlFor="checkbox2"></label>
        </div>
      </div>

      
        <div className="choose_item item_mirrors">
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

        <div className="footer_calc">
            <div className="mirror_sum">
              <div>
                <button className="mirror_buttom" onClick={calcTotalSum}>Підрахувати вартість</button>
              </div>
              <h3 className="order_sum mirror_sum">Кінцева вартість: <span> {totalSum} грн</span> </h3>
            </div>
            <div className="send_order mirror_button">
            {/* <CSVLink className="mirror_button_exel " data={keyCsv} filename = { "date.csv" } separator={";"} >Друк</CSVLink> */}
            {/* <ExelPrint className="mirror_button_exel"></ExelPrint> */}
            <PDFDownloadLink className="mirror_button_exel" document={<PdfFile order={finishMirrorPdf}/>} fileName="orderDate">
             {({loading,error})=> (loading? "завантаження..." : "Зберегти" )}
            </PDFDownloadLink>
            <button className="mirror_button_order" >Оформити</button>
            </div>
        </div> 
    </div>
  );
};

export default StandartMirrors;
