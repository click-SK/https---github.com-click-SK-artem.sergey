import React, { useState, useEffect } from "react";
import "../../style/shower.scss";
import "../../style/mirrors.scss";
import { useSelector, useDispatch } from "react-redux";
import DeliveryTemplate from "../DeliveryTemplate";
import SelectObjecTemplate from "../Template/SelectObjecTemplate";
import InputTemplate from "../Template/InputTemplate";
import ClientFooter from "../Template/ClientFooter";

const ClientStandartMirrors = ({ data }) => {
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
  const [validationInput, setValidationInput] = useState(false);
  const [isAssemblingt, setIsAssembling] = useState(false);
  const [minInstallation, setMinInstallation] = useState(false);
  const [currentProcessingСutout, setCurrentProcessingСutout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const deliveryFirstName = useSelector(
    (state) => state.delivery.deliveryFirstName
  );
  const deliveryLastName = useSelector(
    (state) => state.delivery.deliveryLastName
  );
  const deliverySurName = useSelector(
    (state) => state.delivery.deliverySurName
  );
  const deliveryNumberPhone = useSelector(
    (state) => state.delivery.deliveryNumberPhone
  );
  const deliveryOrderComent = useSelector(
    (state) => state.delivery.deliveryOrderComent
  );
  const deliveryDistance = useSelector(
    (state) => state.delivery.deliveryDistance
  );
  const deliveryAdress = useSelector((state) => state.delivery.deliveryAdress);
  const deliveryBoolean = useSelector(
    (state) => state.delivery.deliveryBoolean
  );

  console.log('test',currentGoods);

  useEffect(() => {
    fetch("https://calc-shower.herokuapp.com/get-all-standart-mirrors")
      .then((res) => res.json())
      .then((data) => {
        setCurrentObject(data[0]);
      })
      .catch((error) => console.error(error));
  }, []);

  const calcTotalSumFunc = () => {
    if (sizeWidthMirrors && sizeHeightMirrors) {
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

      if (deliveryAdress != "") {
        deliveryPrice = 200;
      }

      if (deliveryBoolean) {
        deliveryPriceOverSity = Number(deliveryDistance) * 26;
      }

      if (isPainting) {
        isPaintingPrice = Number(sizeFrame) * Number(currentColor?.price);
      }

      const total =
        (resSizePrice || 0) +
        (resCordSum || 0) +
        (resFrameSum || 0) +
        (currentSwitch?.price || 0) +
        (isPainting ? isPaintingPrice : 0) +
        (isWarmedUp ? currentObject?.option?.warmedUp?.price : 0) +
        (minInstallation ? 500 : 0) +
        (isAssemblingt ? intslPrice : 0) +
        (deliveryBoolean ? deliveryPriceOverSity : deliveryPrice) +
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
        colorFrame: isPainting ? "Фарбування" : "" /* колір покраски */,
        colorPrice: isPainting ? isPaintingPrice : "" /* Ціна кольору */,
        adress: deliveryAdress /* адреса доставки */,
        deliveryPriceOverSity: deliveryBoolean
          ? deliveryPriceOverSity
          : "" /* ціна доставки за містом */,
        deliveryPriceOver: !deliveryBoolean
          ? deliveryPrice
          : "" /* ціна доставки по місту */,
        firstName: deliveryFirstName,
        lastName: deliveryLastName,
        surname: deliverySurName,
        numberPhone: deliveryNumberPhone,
        orderComent: deliveryOrderComent,
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

      console.log("finishedMirros", finishedMirros);

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

  const changeWarmUpFunc = () => {
    const warmeUpObj = data?.option?.warmedUp;
    setIsWarmedUp((isWarmedUp) => !isWarmedUp);
  };

  console.log("currentObject", currentObject);

  const handleFetch = async () => {

    // const resDepth = (depthValue ? ` X ${depthValue}` : '')

    const deliver = deliveryAdress ? deliveryAdress : 'Без доставки' ;

    const data = {
      order: {
        "source_id": 11,
        "buyer_comment": deliveryOrderComent,
        "buyer": {
          "full_name": `${deliveryFirstName} ${deliveryLastName} ${deliverySurName}`,
          "phone": deliveryNumberPhone
        },
        "shipping": {
          "delivery_service_id": 2,
          "shipping_address_city": deliver,
        },
        "products": [
          {
            "price": totalSum,
            "quantity": 1,
            "name": ` ${currentGoods.name}, форма${currentType.name} - ${sizeWidthMirrors} X ${sizeHeightMirrors} см2` ,
            "comment": ` `,
            "properties": [
              {
                "name": `${isWarmedUp ? 'Підігрів' : ''}`,
                "value": `${isWarmedUp ? 'Так' : ''}`
              },
              {
                "name": currentFrame.name,
                "value": `${sizeFrame} м`
              },
            ]
          }
        ]
      }
    };

    setTimeout(() => {
      // setIsLoading(false);
      setIsSuccess(true);
    }, 1000);


    const response = await fetch('https://calc-shower.herokuapp.com/create-crm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      
    });
    

  }

  return (
    <div className="wrap_item mirrors_item">
      <h1>Дзеркала</h1>

      <SelectObjecTemplate
        title={"Форма дзеркала:"}
        changeFunc={selectTypeFunc}
        state={currentType}
        data={currentObject?.typeWordpress}
        wrapClass={"choose_item item_mirrors"}
      />

      <SelectObjecTemplate
        title={"Тип:"}
        changeFunc={selectGoodsFunc}
        state={currentGoods}
        data={currentTypeArray}
        wrapClass={"choose_item item_mirrors"}
      />

      <div className="choose_item item_mirrors">
        <h3>Розмір (см)</h3>
        <div className=" input_miroor">
          <InputTemplate
            placeholder={"Ширина"}
            onChangeFunc={setSizeWidthMirrors}
            value={sizeWidthMirrors}
            validationInput={validationInput}
            inputClass={"input_miroor_item cabel"}
          />
          <InputTemplate
            placeholder={"Висота"}
            onChangeFunc={setSizeHeightMirrors}
            value={sizeHeightMirrors}
            validationInput={validationInput}
            inputClass={"input_miroor_item cabel"}
          />
        </div>
      </div>

      <SelectObjecTemplate
        title={"Виберіть рамку:"}
        optionName={''}
        changeFunc={selectFrameFunc}
        state={currentFrame}
        data={currentObject?.option?.frame}
        wrapClass={"choose_item item_mirrors"}
      />

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

      <DeliveryTemplate />
      <div className="footer_calc">
      <ClientFooter calcTotalSumFunc={calcTotalSumFunc} totalSum={totalSum} />
        <div className="send_order mirror_button">
        <button
            className={isSuccess ? "success" : ""}
            onClick={handleFetch}
            disabled={isLoading}
          >
            {isLoading ? "Зачекайте..." : isSuccess ? "Замовлення відправлено" : "Оформити"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientStandartMirrors;
