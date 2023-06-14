import React, { useState, useEffect } from "react";
import ModalGlassPartitions from "./ModalGlassPartitions";
import ListTheChoseFurniture from "./Furniture/ListTheChoseFurniture";
import PdfFile from "./PdfFile/PdfFileCosmeticMirorrsManager";
import PdfFileClient from "./PdfFile/PdfFileCosmeticMirorrsClient";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useSelector, useDispatch } from "react-redux";
import DeliveryTemplate from "./DeliveryTemplate";
import SelectObjecTemplate from "./Template/SelectObjecTemplate";
import SelectObjecTemplateAndPhoto from "./Template/SelectObjecTemplateAndPhoto";
import InputTemplate from "./Template/InputTemplate";
import ClientFooter from './Template/ClientFooter';
import SendPdfBlockTemplate from './Template/SendPdfBlockTemplate';
import ProcessingCoutPlusCountTemplate from './Template/ProcessingCoutPlusCountTemplate';
import GlassProcessingCountTemplate from './Template/GlassProcessingCountTemplate';
import "../style/shower.scss";

const CosmeticMirrors = ({ data }) => {
  const [currentType, setCurrentType] = useState(null);
  const [widthValue, setWidthValue] = useState("");
  const [heightValue, setHeightValue] = useState("");
  const [validationInput, setValidationInput] = useState(false);
  const [lightBulbsCount, setLightBulbsCount] = useState('');
  const [patronCount, setPatronCount] = useState('');
  const [currentProcessingСutout, setCurrentProcessingСutout] = useState(null);
  const [totalSum, setTotalSum] = useState(null);
  const [finishMirrorPdf, setFinishMirrorPdf] = useState({});
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

  let deliveryPrice = 0;
  let deliveryPriceOverSity = 0;

  if (deliveryAdress != ''){
    deliveryPrice = 200
  }

  if (deliveryBoolean){
    deliveryPriceOverSity = Number(deliveryDistance) * 26
  }

  const selectTypeFunc = (e) => {
    setCurrentType(e);
  };

  const selectProcessingСutoutFunc = (e) => {
    const selectedProcessing = JSON.parse(e.target.value);
    setCurrentProcessingСutout(selectedProcessing);
  };

  const calcTotalSumFunc = () => {
    if((heightValue && heightValue >= 0) && (widthValue && widthValue >= 0)) {
      setValidationInput(false);
      const calcSize = Number(widthValue) * Number(heightValue);
      const calcSquareMeter = calcSize/1000000;
  
      let totalSumProcessing = 0

      glassProcessingCountArr.forEach((el) =>{
        totalSumProcessing += el.price * el.count 
    })
  
      const totalSum = (calcSquareMeter * currentType?.price || 0 ) +
      (data?.lightBulbs * lightBulbsCount || 0) + totalSumProcessing +
      (data?.patron * patronCount || 0) +
      (currentProcessingСutout?.price * currentProcessingСutoutCount || 0) + 
      (deliveryBoolean ? deliveryPriceOverSity : deliveryPrice);
  
      const finishedShower = {
        type: currentType?.name,
        typePrice: currentType?.price,
        width: widthValue ? widthValue : '' ,
        height: heightValue ? heightValue : '',
        lightValue: lightBulbsCount ? lightBulbsCount : '',
        lightPrice: lightBulbsCount ? data?.lightBulbs : '',
        lightName: lightBulbsCount ? 'Лампочки' : '',
        patronPrice: patronCount ? data?.patron : '',
        patronValue: patronCount ? patronCount : '',
        patronName: patronCount ? 'Патрони' : '',
        adress:deliveryAdress, /* адреса доставки */
        deliveryPriceOverSity: deliveryBoolean ? deliveryPriceOverSity : '', /* ціна доставки за містом */
        deliveryPriceOver: !deliveryBoolean ? deliveryPrice : '',  /* ціна доставки по місту */
        firstName: deliveryFirstName,
        lastName: deliveryLastName,
        surname: deliverySurName,
        numberPhone: deliveryNumberPhone,
        orderComent: deliveryOrderComent,
        selectedProcessingName: currentProcessingСutout ? currentProcessingСutout?.name : '',
        selectedProcessingPrice: currentProcessingСutout ? currentProcessingСutout?.price : '',
        selectedProcessingCount: currentProcessingСutoutCount ? `${currentProcessingСutoutCount} шт` : '',
        total: totalSum,
      }

      setFinishMirrorPdf(finishedShower)

      setTotalSum(totalSum)
    } else {
      setValidationInput(true);
    }
  }

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
                glassProcessingCountArr.forEach((el) => (
                {"name": `${el.name}`,
                "value": `${el.count}`}
              ))
            ]
          }
        ]
      }
    };

    // setIsLoading(true);

    setTimeout(() => {
      // setIsLoading(false);
      setIsSuccess(true);
    }, 1500);

    const response = await fetch('https://sklo-expert.herokuapp.com/create-crm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });


  }

  return (
    <div>
      <SelectObjecTemplateAndPhoto
        title={"Виберіть тип"}
        optionName={""}
        changeFunc={selectTypeFunc}
        state={currentType}
        data={data?.typeGlass}
        wrapClass={"wrap_item type_shower"}
        selectWrapClass={"choose_item selected_shower"}
        selectDivWrap={true}
      />

<div className="img_standart_mirror_wrap">
        {currentType != null && 
        <img src={currentType.mirrorsImage}/>
      }
      </div>

      <div className="wrap_item size_shower">
        <h3>Вкажіть розміри (мм)</h3>
        <div className="size_input">
          <div className="size_item">
            <InputTemplate
              placeholder={"Ширина"}
              onChangeFunc={setWidthValue}
              value={widthValue}
              validationInput={validationInput}
              inputClass={"input_miroor_item cabel"}
            />
          </div>
          <div className="size_item">
            <InputTemplate
              placeholder={"Висота"}
              onChangeFunc={setHeightValue}
              value={heightValue}
              validationInput={validationInput}
              inputClass={"input_miroor_item cabel"}
            />
          </div>
        </div>
      </div>

      <div className="wrap_item size_shower">
        <h3>Кількість лампочок</h3>
        <div className="size_input">
          <div className="size_item">
            <input
              type="number"
              placeholder="Кількість"
              value={lightBulbsCount}
              onChange={(e) => setLightBulbsCount(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="wrap_item size_shower">
        <h3>Кількість патронів</h3>
        <div className="size_input">
          <div className="size_item">
            <input
              type="number"
              placeholder="Кількість"
              value={patronCount}
              onChange={(e) => setPatronCount(e.target.value)}
            />
          </div>
        </div>
      </div>

        {data?.processingСutout && (
        <GlassProcessingCountTemplate
          processingStandart={data?.processingСutout}
          currentArr={glassProcessingCountArr}
          setCurrentArr={setGlassProcessingCountArr}
          title={"Виберіть обробку:"}
        />
      )}

      <DeliveryTemplate />
      {/* <div className="footer_calc">
      <ClientFooter calcTotalSumFunc={calcTotalSumFunc} totalSum={totalSum} />
        <div className="send_order">
          <div className="mirror_button_exel" style={{ fontSize: 14 }}>
            <PDFDownloadLink
              document={<PdfFile order={finishMirrorPdf} />}
              fileName={`Косметичні дзеркала менеджер ${new Date().toLocaleString().replaceAll('/', '-').replaceAll(':', '-')}.pdf`}
            >
              {({ loading, error }) =>
                loading ? "завантаження..." : "Для менеджера"
              }
            </PDFDownloadLink>
            <PDFDownloadLink
              className=""
              document={<PdfFileClient order={finishMirrorPdf} />}
              fileName={`Косметичні дзеркала клієнт ${new Date().toLocaleString().replaceAll('/', '-').replaceAll(':', '-')}.pdf`}
            >
              {({ loading, error }) =>
                loading ? "завантаження..." : "Для клієнта"
              }
            </PDFDownloadLink>
          </div>
          <button>Оформити</button>
        </div>
      </div> */}
                  <div className="footer_calc">
        <ClientFooter calcTotalSumFunc={calcTotalSumFunc} totalSum={totalSum} />
        <div className="send_order">
          {!isPrintPDF && (
            <div
              className="mirror_button_exel"
              style={{ fontSize: 14, }}
              onClick={() => setIsPrintPDF((state) => !state)}
            >
              Роздрукувати PDF
            </div>
          )}
          {isPrintPDF && (
             
            <div className="mirror_button_exel" style={{ fontSize: 14, }}>
                 Роздрукувати PDF
              <div className="print_wrap">
                <div className="close_pdf" onClick={() => setIsPrintPDF((state) => !state)}> x </div>
                <PDFDownloadLink
                  className="print print_manager" style={{ fontSize: 14 }}
                  document={<PdfFile 
                    order={finishMirrorPdf}
                    glassProcessingCountArr = {glassProcessingCountArr} 
                    />}
                  fileName={`Дзеркала кабіни менеджер ${new Date().toLocaleString().replaceAll('/', '-').replaceAll(':', '-')}.pdf`}
            >
                  {({ loading, error }) =>
                    loading ? "завантаження..." : "Для менеджера"
                  }
                </PDFDownloadLink>
                <PDFDownloadLink
                  className="print print_client" style={{ fontSize: 14,}}
                  document={<PdfFileClient 
                    order={finishMirrorPdf} />}
                  fileName={`Дзеркала кабіни клієнт ${new Date().toLocaleString().replaceAll('/', '-').replaceAll(':', '-')}.pdf`}
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
            {isLoading ? "Зачекайте..." : isSuccess ? "Замовлення відправлено" : "Оформити"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CosmeticMirrors;
