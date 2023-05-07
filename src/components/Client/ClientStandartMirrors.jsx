import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import ExelPrint from ".././ExelPrint";
import PdfFile from ".././PdfFile/PdfFileMirorrsManager";
import PdfFileClient from ".././PdfFile/PdfFileMirorrsClient";
import Api from ".././Api";
import "../../style/shower.scss";
import "../../style/mirrors.scss";
import { PDFDownloadLink } from "@react-pdf/renderer";

const ClientStandartMirrors = ({data}) => {
  const [currentObject, setCurrentObject] = useState({});
  const [currentType, setCurrentType] = useState(null);
  const [currentTypeArray, setCurrentTypeArray] = useState(null);
  const [currentGoods, setCurrentGoods] = useState(null);
  const [currentFrame, setCurrentFrame] = useState(null);
  const [currentBackLight, setCurrentBackLight] = useState(null);
  const [currentSwitch, setCurrentSwitch] = useState(null);
  const [currentColor, setCurrentColor] = useState(null);
  const [currentCord, setCurrentCord] = useState("");
  const [isWarmedUp, setIsWarmedUp] = useState(false);
  const [isPainting, setIsPainting] = useState(false);
  const [sizeWidthMirrors, setSizeWidthMirrors] = useState("");
  const [sizeHeightMirrors, setSizeHeightMirrors] = useState("");
  const [sizeFrame, setSizeFrame] = useState(0);
  const [totalSum, setTotalSum] = useState(0);
  const [finishMirrorPdf, setFinishMirrorPdf] = useState({});
  const [validationInput, setValidationInput] = useState(false);
  const [isAssemblingt, setIsAssembling] = useState(false);
  const [minInstallation, setMinInstallation] = useState(false);
  const [adress, setAdress] = useState("");
  const [deliveryRoadDistance, setDeliveryRoadDistance] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [surname, setSurname] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [orderComent, setOrderComent] = useState("");
  const [currentProcessingСutout, setCurrentProcessingСutout] = useState(null);

  useEffect(() => {
    fetch("https://calc-shower.herokuapp.com/get-all-standart-mirrors")
      .then((res) => res.json())
      .then((data) => {
        setCurrentObject(data[0])
      })
      .catch((error) => console.error(error));
  }, []);

  // const [intslPrice, setIntslPrice] = useState(0);
  // const keyCsv = [
  //   {"Форма скла": currentType?.name },
  //   {"Тип дзеркала" : 'З фоновою підсвідкою'}
  // ];

  const calcTotalSum = () => {
    if (
      (sizeWidthMirrors && sizeHeightMirrors) ||
      (!currentType && !currentGoods)
    ) {
      setValidationInput(false);
      const priceMeterCord = data?.option?.cord?.price;

      const calcSize = Number(sizeWidthMirrors) * Number(sizeHeightMirrors);
      const calcSquareMeter = calcSize / 10000;
      const warmedUpPrice = data?.option?.warmedUp?.price;

      const resSizePrice = calcSquareMeter * currentGoods?.price;
      const resCordSum = currentCord * priceMeterCord;
      const resFrameSum = sizeFrame * (currentFrame?.price || 0);
      let intslPrice = 0;
      let deliveryPrice = 0;
      let deliveryPriceOverSity = 0;
      let isPaintingPrice = 0;

      if (calcSquareMeter < 2) {
        intslPrice = calcSquareMeter * 300;
      } else if (calcSquareMeter > 2) {
        intslPrice = calcSquareMeter * 350;
      }

      if (adress != "") {
        deliveryPrice = 200;
      }

      if (delivery) {
        deliveryPriceOverSity = Number(deliveryRoadDistance) * 26;
      }

      if (isPainting) {
        isPaintingPrice = Number(sizeFrame) * Number(currentColor?.price);
      }

      console.log("доставка over sity", deliveryRoadDistance);
      console.log("adress", adress);
      console.log("price", deliveryPrice);

      console.log("priceMeterCord", priceMeterCord);
      console.log("calcSize", calcSize);
      console.log("calcSquareMeter", calcSquareMeter);
      console.log("warmedUpPrice", warmedUpPrice);
      console.log("resCordSum", resCordSum);
      console.log("resFrameSum", resFrameSum);

      const total =
        (resSizePrice || 0) +
        (resCordSum || 0) +
        (resFrameSum || 0) +
        (currentSwitch?.price || 0) +
        (isPainting ? isPaintingPrice : 0) +
        (isWarmedUp ? warmedUpPrice : 0) +
        (minInstallation ? 500 : 0) +
        (isAssemblingt ? intslPrice : 0) +
        (delivery ? deliveryPriceOverSity : deliveryPrice) +
        (currentProcessingСutout?.price || 0);

      const finishedMirros = {
        type: currentType?.name /* форма дзеркала */,
        goodsPrice: currentGoods?.price /* ціна дзеркала */,
        goodsName: currentGoods?.name /* тип дзеркала */,
        width: sizeWidthMirrors /* ширина дзеркала */,
        height: sizeHeightMirrors /* висота дзеркала */,
        framePrice: currentFrame?.price
          ? currentFrame?.price
          : "" /* рамка ціна */,
        frameSize: sizeFrame ? `${sizeFrame} м` : "" /* рамка розмір */,
        frameName: currentFrame?.name
          ? currentFrame?.name
          : "" /* рамка назва */,
        switchName: currentSwitch?.name
          ? currentSwitch?.name
          : "" /* перемикач назва */,
        switchCat: currentSwitch?.name ? "Перемикач" : "" /* перемикач назва */,
        switchPrice: currentSwitch?.price
          ? currentSwitch?.price
          : "" /* перемикач ціна */,
        backLightName: currentBackLight?.name
          ? currentBackLight?.name
          : "" /* підсвітка назва */,
        backLightAdd: currentBackLight?.name
          ? "Додаткова підсвітка"
          : "" /* підсвітка назва */,
        backLightPrice: currentBackLight?.price
          ? currentBackLight?.price
          : "" /* підсвітка ціна */,
        cord: currentCord ? `${currentCord} м` : "" /* довжина кабелю */,
        cordName: currentCord ? "Кабель" : "" /* назва кабелю */,
        cordPrice: resCordSum ? resCordSum : "" /* ціна кабелю */,
        warmerUp: isWarmedUp ? "Так" : "" /* підігрів */,
        warmerUpPrice: isWarmedUp ? "500 грн" : "" /* підігрів ціна */,
        warmerUpName: isWarmedUp ? "Підігрів" : "" /* підігрів ціна */,
        painting: isPainting ? "Так" : "" /* покраска рамки */,
        paintingPrice: isPainting ? "Ціна" : "" /* покраска рамки */,
        colorName: isPainting ? currentColor?.name : "" /* колір покраски */,
        colorFrame: isPainting ? "Покраска" : "" /* колір покраски */,
        colorPrice: isPainting ? isPaintingPrice : "" /* Ціна кольору */,
        adress: adress /* адреса доставки */,
        deliveryPriceOverSity: delivery
          ? deliveryPriceOverSity
          : "" /* ціна доставки за містом */,
        deliveryPriceOver: !delivery
          ? deliveryPrice
          : "" /* ціна доставки по місту */,
        firstName: firstName,
        lastName: lastName,
        surname: surname,
        numberPhone: numberPhone,
        orderComent: orderComent,
        minInstallation: minInstallation ? 500 : "",
        minInstallationName: minInstallation ? "Монтаж" : "",
        minInstallationOption: minInstallation ? "Мінімальний" : "",
        isAssemblingt: isAssemblingt ? intslPrice : "",
        isAssemblingtName: isAssemblingt ? "Монтаж" : "",
        isAssemblingOption: isAssemblingt ? "По розміру" : "",
        selectedProcessingName: currentProcessingСutout
          ? currentProcessingСutout?.name
          : "",
        selectedProcessingPrice: currentProcessingСutout
          ? currentProcessingСutout?.price
          : "",
        selectedProcessingCount: currentProcessingСutout
          ? currentProcessingСutout?.count
          : "",
        total: total,
      };

      setFinishMirrorPdf(finishedMirros);

      console.log("файл друк", finishedMirros);

      setTotalSum(total);
    } else {
      setValidationInput(true);
    }
  };

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
  };

  const changeWarmUpFunc = () => {
    const warmeUpObj = data?.option?.warmedUp;
    setIsWarmedUp((isWarmedUp) => !isWarmedUp);
  };

  const changePaintingFunc = () => {
    // const paintingObj = data?.option?.painting;
    setIsPainting((isPainting) => !isPainting);
  };

  const selectedColorFunc = (e) => {
    const selectedColor = JSON.parse(e.target.value);
    setCurrentColor(selectedColor);
  };

  const changeIsAssemblingt = () => {
    // const paintingObj = data?.option?.painting;
    setIsAssembling((isAssemblingt) => !isAssemblingt);
  };

  const changeMinInstallationFunc = () => {
    // const paintingObj = data?.option?.painting;
    setMinInstallation((minInstallation) => !minInstallation);
  };
  const isDelivery = () => {
    // const paintingObj = data?.option?.painting;
    setDelivery((delivery) => !delivery);
  };

  const addAdress = (e) => {
    // const cordObj = data?.option?.cord;
    setAdress(e.target.value);
  };
  const roadDistance = (e) => {
    // const cordObj = data?.option?.cord;
    setDeliveryRoadDistance(e.target.value);
  };
  const addFirstName = (e) => {
    // const cordObj = data?.option?.cord;
    setFirstName(e.target.value);
  };
  const addLastName = (e) => {
    // const cordObj = data?.option?.cord;
    setLastName(e.target.value);
  };
  const addSurname = (e) => {
    // const cordObj = data?.option?.cord;
    setSurname(e.target.value);
  };
  const addPhone = (e) => {
    // const cordObj = data?.option?.cord;
    setNumberPhone(e.target.value);
  };
  const addComent = (e) => {
    // const cordObj = data?.option?.cord;
    setOrderComent(e.target.value);
  };

  const selectProcessingСutoutFunc = (e) => {
    const selectedProcessing = JSON.parse(e.target.value);
    setCurrentProcessingСutout(selectedProcessing);
  };

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

  return (
    <div className="wrap_item mirrors_item">
      <h1>Дзеркала</h1>
      <div className="choose_item item_mirrors">
        <h3>Форма дзеркала:</h3>
        <select
          onChange={selectTypeFunc}
          value={currentType ? JSON.stringify(currentType) : ""}
        >
          <option value="" disabled></option>
          {currentObject?.typeWordpress &&
            currentObject.typeWordpress.map((item) => (
              <option key={item.name} value={JSON.stringify(item)}>
                {item.name}
              </option>
            ))}
        </select>
      </div>

      <div className="choose_item item_mirrors">
        <h3>Тип:</h3>
        <select
          onChange={selectGoodsFunc}
          value={currentGoods ? JSON.stringify(currentGoods) : ""}
        >
          <option value="" disabled></option>
          {currentTypeArray &&
            currentTypeArray.map((item) => (
              <option key={item.name} value={JSON.stringify(item)}>
                {item.name}
              </option>
            ))}
        </select>
      </div>

      <div className="choose_item item_mirrors">
        <h3>Розмір (см)</h3>
        <div className=" input_miroor">
          <div>
            <input
              className=" input_miroor_item cabel"
              type="number"
              placeholder="Ширина"
              value={sizeWidthMirrors}
              onChange={(e) => setSizeWidthMirrors(e.target.value)}
            />
            <p style={{ color: "red" }}>
              {validationInput &&
                currentGoods &&
                currentType &&
                "Введіть данні"}
            </p>
          </div>
          <div>
            <input
              className="input_miroor_item  cabel"
              type="number"
              placeholder="Висота"
              value={sizeHeightMirrors}
              onChange={(e) => setSizeHeightMirrors(e.target.value)}
            />
            <p style={{ color: "red" }}>
              {validationInput &&
                currentGoods &&
                currentType &&
                "Введіть данні"}
            </p>
          </div>
        </div>
      </div>

      <div className="choose_item item_mirrors">
        <h3>Виберіть рамку:</h3>
        <select
          onChange={selectFrameFunc}
          value={currentFrame ? JSON.stringify(currentFrame) : ""}
        >
          <option value="" disabled>
            Без рамки
          </option>
          {currentObject?.option?.frame &&
            currentObject.option.frame.map((item) => (
              <option key={item.name} value={JSON.stringify(item)}>
                {item.name}
              </option>
            ))}
        </select>
      </div>

      <div className="choose_item item_mirrors">
        <h3>Розмір рамки (м)</h3>
        <div className="input_miroor">
          <input
            className="input_miroor_frame cabel"
            type="number"
            value={sizeFrame}
            onChange={(e) => setSizeFrame(e.target.value)}
          />
        </div>
      </div>

      <div className="choose_item item_mirrors check-item">
        <h3>Підігрів:</h3>
        <div className="checkbox_wrap">
          <input
            id="checkbox1"
            className="checkbox"
            type="checkbox"
            checked={isWarmedUp}
            onChange={changeWarmUpFunc}
          />
          <label className="checkbox-label" htmlFor="checkbox1"></label>
        </div>
      </div>

      <div className="choose_item item_mirrors item_delivery">
        <h3>Доставка</h3>
        <div className="delivery_wrap">
          <input
            className="cabel"
            placeholder="Адреса доставки"
            value={adress}
            onChange={(e) => addAdress(e)}
          />
          <div className="delivery_addres">
            <div className="checkbox_wrap ">
              <input
                id="checkbox5"
                className="checkbox"
                type="checkbox"
                checked={delivery}
                onChange={isDelivery}
              />
              <label className="checkbox-label" htmlFor="checkbox5"></label>
              <p style={{ marginTop: 5 }}>За місто</p>
            </div>
            <input
              className="cabel width_delivery"
              type="number"
              placeholder="Відстань - км"
              value={deliveryRoadDistance}
              onChange={(e) => roadDistance(e)}
            />
          </div>
        </div>
      </div>
      <div className="choose_item item_mirrors item_fullname">
        <h3>ПІБ:</h3>
        <div className="fullname_wrap">
          <div className="name_lastname">
            <input
              className="cabel"
              placeholder="Ім'я"
              value={firstName}
              onChange={(e) => addFirstName(e)}
            />
            <input
              className="cabel"
              placeholder="Прізвище"
              value={lastName}
              onChange={(e) => addLastName(e)}
            />
          </div>
          <input
            className="cabel"
            placeholder="По батькові"
            value={surname}
            onChange={(e) => addSurname(e)}
          />
        </div>
      </div>
      <div className="choose_item item_mirrors">
        <h3>Телефон</h3>
        <input
          className="cabel"
          placeholder="+ 38 (0ХХ) ХХХ ХХ ХХ "
          value={numberPhone}
          onChange={(e) => addPhone(e)}
        />
      </div>
      <div className="choose_item item_mirrors item_textarea">
        <h3>Деталі замовлення</h3>
        <textarea
          className="cabel"
          style={{ width: "70%", height: "100%" }}
          value={orderComent}
          name=""
          id=""
          cols="30"
          rows="10"
          onChange={(e) => addComent(e)}
        ></textarea>
      </div>

      <div className="footer_calc">
        <div className="mirror_sum">
          <div>
            <button className="mirror_buttom" onClick={calcTotalSum}>
              Підрахувати вартість
            </button>
          </div>
          <h3 className="order_sum mirror_sum">
            Кінцева вартість: <span> {totalSum} грн</span>{" "}
          </h3>
        </div>
        <div className="send_order mirror_button">
          {/* <CSVLink className="mirror_button_exel " data={keyCsv} filename = { "date.csv" } separator={";"} >Друк</CSVLink> */}
          {/* <ExelPrint className="mirror_button_exel"></ExelPrint> */}
          <button className="mirror_button_order">Оформити</button>
        </div>
      </div>
    </div>
  );
};

export default ClientStandartMirrors;
