import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import ExelPrint from "./ExelPrint";
import PdfFile from "./PdfFile/PdfFileMirorrsManager";
import PdfFileClient from "./PdfFile/PdfFileMirorrsClient";
import Api from "./Api";
import '../style/shower.scss'
import '../style/mirrors.scss'
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useSelector, useDispatch } from 'react-redux';
import DeliveryTemplate from "./DeliveryTemplate";
import SelectObjecTemplate from "./Template/SelectObjecTemplate";
import InputTemplate from "./Template/InputTemplate";
import ClientFooter from './Template/ClientFooter';
import SendPdfBlockTemplate from './Template/SendPdfBlockTemplate';
import ProcessingCoutPlusCountTemplate from './Template/ProcessingCoutPlusCountTemplate';
import GlassProcessingCountTemplate from './Template/GlassProcessingCountTemplate';

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
  const [isAssemblingt, setIsAssembling] = useState(false);
  const [minInstallation, setMinInstallation] = useState(false);
  const [currentProcessingСutout, setCurrentProcessingСutout] = useState(null);
  const [currentProcessingСutoutCount, setCurrentProcessingСutoutCount] = useState('');
  const [isPrintPDF, setIsPrintPDF] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [glassProcessingCountArr, setGlassProcessingCountArr] = useState([]);

  const deliveryFirstName = useSelector((state) => state.delivery.deliveryFirstName);
  const deliveryLastName = useSelector((state) => state.delivery.deliveryLastName);
  const deliverySurName = useSelector((state) => state.delivery.deliverySurName);
  const deliveryNumberPhone = useSelector((state) => state.delivery.deliveryNumberPhone);
  const deliveryOrderComent = useSelector((state) => state.delivery.deliveryOrderComent);
  const deliveryDistance = useSelector((state) => state.delivery.deliveryDistance);
  const deliveryAdress = useSelector((state) => state.delivery.deliveryAdress);
  const deliveryBoolean = useSelector((state) => state.delivery.deliveryBoolean);

  // const [intslPrice, setIntslPrice] = useState(0);
  // const keyCsv = [
  //   {"Форма скла": currentType?.name },
  //   {"Тип дзеркала" : 'З фоновою підсвідкою'}
  // ];

  console.log('currentType',currentType);

  const calcTotalSumFunc = () => {
    if((sizeWidthMirrors && sizeWidthMirrors >= 0) && (sizeHeightMirrors && sizeHeightMirrors >= 0)) {
      setValidationInput(false)
      const priceMeterCord = data?.option?.cord?.price;

      const calcSize = Number(sizeWidthMirrors) * Number(sizeHeightMirrors);
      const calcSquareMeter = calcSize/1000000;
      const warmedUpPrice = data?.option?.warmedUp?.price;
  
      const resSizePrice = calcSquareMeter * currentGoods?.price;
      const resCordSum = currentCord * priceMeterCord;
      const resFrameSum = sizeFrame * (currentFrame?.price || 0);

      let intslPrice = 0;
      let deliveryPrice = 0;
      let deliveryPriceOverSity = 0;
      let isPaintingPrice = 0;

        if (calcSquareMeter < 2){
           intslPrice = calcSquareMeter * 300
        } else if (calcSquareMeter > 2){
          intslPrice = calcSquareMeter * 350
        };
        
        if (deliveryAdress != ''){
          deliveryPrice = 200
        }

        if (deliveryBoolean){
          deliveryPriceOverSity = Number(deliveryDistance) * 26
        }

        if(isPainting){
            isPaintingPrice = Number(sizeFrame) * Number( currentColor?.price);
        }

      const total = (resSizePrice || 0) + 
      (resCordSum || 0) + (resFrameSum || 0) + 
      (currentSwitch?.price || 0) + 
      (isPainting ? isPaintingPrice : 0) + 
      (isWarmedUp ? warmedUpPrice : 0) + (minInstallation ? 500 : 0) + 
      (isAssemblingt ? intslPrice : 0) + 
      (currentProcessingСutout?.price * currentProcessingСutoutCount || 0) + 
      (deliveryBoolean ? deliveryPriceOverSity : deliveryPrice);
  
      const finishedMirros = {
        type: currentType?.name, /* форма дзеркала */
        goodsPrice: currentGoods?.price, /* ціна дзеркала */
        goodsName: currentGoods?.name, /* тип дзеркала */
        width: sizeWidthMirrors, /* ширина дзеркала */
        height: sizeHeightMirrors, /* висота дзеркала */
        framePrice: currentFrame?.price ? currentFrame?.price : '', /* рамка ціна */
        frameSize: sizeFrame ? `${sizeFrame} м` : '', /* рамка розмір */
        frameName: currentFrame?.name ? currentFrame?.name : '' , /* рамка назва */
        switchName: currentSwitch?.name ? currentSwitch?.name : '', /* перемикач назва */
        switchCat: currentSwitch?.name ? 'Перемикач' : '', /* перемикач назва */
        switchPrice: currentSwitch?.price ? currentSwitch?.price : '', /* перемикач ціна */
        backLightName:currentBackLight?.name ? currentBackLight?.name : '', /* підсвітка назва */
        backLightAdd:currentBackLight?.name ? 'Додаткова підсвітка' : '', /* підсвітка назва */
        backLightPrice:currentBackLight?.price ? currentBackLight?.price : '', /* підсвітка ціна */
        cord: currentCord ? `${currentCord} м` : '' , /* довжина кабелю */
        cordName: currentCord ? 'Кабель' : '' , /* назва кабелю */
        cordPrice: resCordSum ? resCordSum : '',/* ціна кабелю */
        warmerUp: isWarmedUp ? 'Так' : '', /* підігрів */
        warmerUpPrice: isWarmedUp ? '500' : '', /* підігрів ціна */
        warmerUpName: isWarmedUp ? 'Підігрів' : '', /* підігрів ціна */
        painting: isPainting ? 'Так' : '', /* покраска рамки */
        paintingPrice: isPainting ? 'Ціна' : '', /* покраска рамки */
        colorName: isPainting ? currentColor?.name : '', /* колір покраски */
        colorFrame: isPainting ? 'Фарбування' : '', /* колір покраски */
        colorPrice: isPainting ? isPaintingPrice : '', /* Ціна кольору */
        adress:deliveryAdress, /* адреса доставки */
        deliveryPriceOverSity: deliveryBoolean ? deliveryPriceOverSity : '', /* ціна доставки за містом */
        deliveryPriceOver: !deliveryBoolean ? deliveryPrice : '',  /* ціна доставки по місту */
          firstName: deliveryFirstName,
          lastName: deliveryLastName,
          surname: deliverySurName,
          numberPhone: deliveryNumberPhone,
          orderComent: deliveryOrderComent,
        minInstallation: minInstallation ? 500 : '',
        minInstallationName: minInstallation ? 'Монтаж' : '',
        minInstallationOption: minInstallation ? "Мінімальний" : '',
        isAssemblingt: isAssemblingt ? intslPrice : '',
        isAssemblingtName: isAssemblingt ? 'Монтаж' : '',
        isAssemblingOption: isAssemblingt ? 'По розміру' : '',
        selectedProcessingName: currentProcessingСutout ? currentProcessingСutout?.name : '',
        selectedProcessingPrice: currentProcessingСutout ? currentProcessingСutout?.price : '',
        selectedProcessingCount: currentProcessingСutoutCount ? `${currentProcessingСutoutCount} шт` : '',
        total: total
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
    // const paintingObj = data?.option?.painting;
    setIsPainting(isPainting => !isPainting)
  }
  
  const selectedColorFunc = (e) => {
    const selectedColor = JSON.parse(e.target.value);
    setCurrentColor(selectedColor);
  }
  
  const changeIsAssemblingt = () => {
    // const paintingObj = data?.option?.painting;
    setIsAssembling(isAssemblingt => !isAssemblingt)
  }

    const changeMinInstallationFunc = () => {
    // const paintingObj = data?.option?.painting;
    setMinInstallation(minInstallation => !minInstallation)
  }

  const selectProcessingСutoutFunc = (e) => {
    const selectedProcessing = JSON.parse(e.target.value);
    setCurrentProcessingСutout(selectedProcessing);
  };

  const handleFetch = async () => {

    const furnitureFinObj = {

      frameName:{
        name : finishMirrorPdf.frameName,
        value : finishMirrorPdf.frameSize
      },
      colorFrame:{
        name : finishMirrorPdf.colorFrame,
        value : finishMirrorPdf.colorName
      },
      switchCat:{
        name : finishMirrorPdf.switchCat,
        value : finishMirrorPdf.switchName
      },
      backLightAdd:{
        name : finishMirrorPdf.backLightAdd,
        value : finishMirrorPdf.backLightName
      },
      cordName:{
        name : finishMirrorPdf.cordName,
        value : finishMirrorPdf.cord
      },
      warmerUpName:{
        name : finishMirrorPdf.warmerUpName,
        value : finishMirrorPdf.warmerUp
      },
      celect : {
        name : finishMirrorPdf.selectedProcessingName,
        value : finishMirrorPdf.selectedProcessingCount
      },
      minInstallationName : {
        name : finishMirrorPdf.minInstallationName,
        value : `${finishMirrorPdf.minInstallation}`
      },
      isAssemblingtName : {
        name : finishMirrorPdf.isAssemblingtName,
        value : `${finishMirrorPdf.isAssemblingt}`
      }

    }


     const celect = {
        name : finishMirrorPdf.selectedProcessingName,
        value : finishMirrorPdf.selectedProcessingCount
      }
      
    const minInstallationName ={
        name : finishMirrorPdf.minInstallationName,
        value : `${finishMirrorPdf.minInstallation}`
      }

    const isAssemblingtName={
        name : finishMirrorPdf.isAssemblingtName,
        value : `${finishMirrorPdf.isAssemblingt}`
      }

  //   const furnitureFinArr = [];

  //   cart.forEach((item, index) => {
  //     const itemData = {
  //       colorsFurniture: item.colorsFurniture[0].color,
  //       colorsFurniturePrice: item.colorsFurniture[0].price,
  //       tittleName: item.title,
  //       name2: item.depends[0],
  //       name3: item.depends[1],
  //       drawingImgSrc: item.drawingImg,
  //       mainImageSrc: item.mainImage,
  //       count: item.count,
  //     };
  //     furnitureFinArr.push(itemData);
      
  //   });

  // furnitureFinArr.forEach((item, index) => {
  //   furnitureFinObj[index] = `${item.name2} ${item.tittleName} ${item.colorsFurniture} - ${item.count} шт`   
  // });

  // const resDepth = (finishMirrorPdf.depth ? ` X ${finishMirrorPdf.depth}` : '')


    const deliver =  finishMirrorPdf.adress ? finishMirrorPdf.adress : 'Без доставки' ;


    const data = {
      order: {
        "source_id": 10,
        "buyer_comment": finishMirrorPdf.orderComent,
        "buyer": {
          "full_name": `${finishMirrorPdf.lastName} ${finishMirrorPdf.firstName} ${finishMirrorPdf.surname}`,
          "phone": finishMirrorPdf.numberPhone
        },
        "shipping": {
          "delivery_service_id": 2,
          "shipping_address_city": deliver
        },
        "products": [
          {
            "price": finishMirrorPdf.total,
            "quantity": 1,
            "name": `${finishMirrorPdf.goodsName} - ${finishMirrorPdf.width} X ${finishMirrorPdf.height}`,
            "comment": "",
            "properties": [
              {
                "name": 'Форма дзеркала',
                "value": finishMirrorPdf.type 
              },
              ...Object.entries(furnitureFinObj).filter(([_, value]) => value.name !== '').map(([key, value], idx) => ({
                "name": value.name,
                "value": value.value
              })),
            ]
          }
        ]
      }
    };

    // setIsLoading(true);

    const response = await fetch('https://calc-shower.herokuapp.com/create-crm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    setTimeout(() => {
      // setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  }

  return (
    <div className="wrap_item mirrors_item">
      <SelectObjecTemplate
        title={"Форма дзеркала:"}
        changeFunc={selectTypeFunc}
        state={currentType}
        data={data?.type}
        wrapClass={"choose_item item_mirrors"}
        selectDivWrap={false}
      />
      <SelectObjecTemplate
        title={"Тип:"}
        changeFunc={selectGoodsFunc}
        state={currentGoods}
        data={currentTypeArray}
        wrapClass={"choose_item item_mirrors"}
        selectDivWrap={false}
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
          {currentType?.name != "Круглі" && (
            <InputTemplate
              placeholder={"Висота"}
              onChangeFunc={setSizeHeightMirrors}
              value={sizeHeightMirrors}
              validationInput={validationInput}
              inputClass={"input_miroor_item cabel"}
            />
          )}
        </div>
      </div>

      <SelectObjecTemplate
        title={"Виберіть рамку:"}
        optionName={""}
        changeFunc={selectFrameFunc}
        state={currentFrame}
        data={data?.option?.frame}
        wrapClass={"choose_item item_mirrors"}
        selectDivWrap={false}
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

      <SelectObjecTemplate
        title={"Додаткова підсвітка:"}
        optionName={""}
        changeFunc={selectBackLightFunc}
        state={currentBackLight}
        data={data?.option?.backLight}
        wrapClass={"choose_item item_mirrors"}
        selectDivWrap={false}
      />

      <SelectObjecTemplate
        title={"Виберіть вимикач:"}
        optionName={""}
        changeFunc={selectSwitchFunc}
        state={currentSwitch}
        data={data?.option?.switch}
        wrapClass={"choose_item item_mirrors"}
        selectDivWrap={false}
      />

      <div className="choose_item item_mirrors">
        <h3>Довжина кабелю (м):</h3>
        <input
          className="cabel"
          placeholder="Довжина кабелю"
          value={currentCord}
          onChange={(e) => changeCord(e)}
        />
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

      <div className="choose_item item_mirrors check-item">
        <h3>Фарбування:</h3>
        <div className="checkbox_wrap">
          <input
            id="checkbox2"
            className="checkbox"
            type="checkbox"
            checked={isPainting}
            onChange={changePaintingFunc}
          />
          <label className="checkbox-label" htmlFor="checkbox2"></label>
        </div>
      </div>

      <SelectObjecTemplate
        title={"Фарбування рамки:"}
        optionName={""}
        changeFunc={selectedColorFunc}
        state={currentColor}
        data={data?.option?.color}
        wrapClass={"choose_item item_mirrors"}
        selectDivWrap={false}
      />
      {data?.processingСutout && (
        <GlassProcessingCountTemplate
          processingStandart={data?.processingСutout}
          currentArr={glassProcessingCountArr}
          setCurrentArr={setGlassProcessingCountArr}
          title={"Виберіть обробку:"}
        />
      )}

      <div className="choose_item item_mirrors item_montaje">
        <h3>Монтаж:</h3>
        <div className="montaje_wrap">
          <div className="checkbox_wrap montaje">
            <input
              id="checkbox3"
              className="checkbox"
              type="checkbox"
              checked={isAssemblingt}
              onChange={changeIsAssemblingt}
            />
            <label className="checkbox-label" htmlFor="checkbox3"></label>
            <p>Монтаж по розміру</p>
          </div>
          <div className="checkbox_wrap montaje">
            <input
              id="checkbox4"
              className="checkbox"
              type="checkbox"
              checked={minInstallation}
              onChange={changeMinInstallationFunc}
            />
            <label
              className="checkbox-label checkbox-label4"
              htmlFor="checkbox4"
            ></label>
            <p>Мінімальний монтаж - 500грн</p>
          </div>
        </div>
      </div>
      <DeliveryTemplate />
      <div className="footer_calc">
        <ClientFooter calcTotalSumFunc={calcTotalSumFunc} totalSum={totalSum} />
        <div className="send_order">
          {!isPrintPDF && (
            <div
              className="mirror_button_exel"
              style={{ fontSize: 14 }}
              onClick={() => setIsPrintPDF((state) => !state)}
            >
              Роздрукувати PDF
            </div>
          )}
          {isPrintPDF && (
            <div className="mirror_button_exel" style={{ fontSize: 14 }}>
              Роздрукувати PDF
              <div className="print_wrap">
                <div
                  className="close_pdf"
                  onClick={() => setIsPrintPDF((state) => !state)}
                >
                  {" "}
                  x{" "}
                </div>
                <PDFDownloadLink
                  className="print print_manager"
                  style={{ fontSize: 14 }}
                  document={<PdfFile order={finishMirrorPdf} />}
                  fileName={`Дзеркала менеджер ${new Date()
                    .toLocaleString()
                    .replaceAll("/", "-")
                    .replaceAll(":", "-")}.pdf`}
                >
                  {({ loading, error }) =>
                    loading ? "завантаження..." : "Для менеджера"
                  }
                </PDFDownloadLink>
                <PDFDownloadLink
                  className="print print_client"
                  style={{ fontSize: 14 }}
                  document={<PdfFileClient order={finishMirrorPdf} />}
                  fileName={`Дзеркала клієнт ${new Date()
                    .toLocaleString()
                    .replaceAll("/", "-")
                    .replaceAll(":", "-")}.pdf`}
                >
                  {({ loading, error }) =>
                    loading ? "завантаження..." : "Для клієнта"
                  }
                </PDFDownloadLink>
              </div>
            </div>
          )}
          <button
            className={isSuccess ? "success" : ""}
            onClick={handleFetch}
            disabled={isLoading}
          >
            {isLoading
              ? "Зачекайте..."
              : isSuccess
              ? "Замовлення відправлено"
              : "Оформити"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StandartMirrors;
