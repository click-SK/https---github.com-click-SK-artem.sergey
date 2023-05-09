import React, { useState, useEffect } from "react";
import ModalGlassPartitions from "./ModalGlassPartitions";
import ListTheChoseFurniture from "./ListTheChoseFurniture";
import PdfFile from "./PdfFile/PdfFileCosmeticMirorrsManager";
import PdfFileClient from "./PdfFile/PdfFileCosmeticMirorrsClient";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useSelector, useDispatch } from "react-redux";
import DeliveryTemplate from "./DeliveryTemplate";
import SelectObjecTemplate from "./Template/SelectObjecTemplate";
import InputTemplate from "./Template/InputTemplate";
import ClientFooter from './Template/ClientFooter';
import SendPdfBlockTemplate from './Template/SendPdfBlockTemplate';
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

  const deliveryFirstName = useSelector((state) => state.delivery.deliveryFirstName);
  const deliveryLastName = useSelector((state) => state.delivery.deliveryLastName);
  const deliverySurName = useSelector((state) => state.delivery.deliverySurName);
  const deliveryNumberPhone = useSelector((state) => state.delivery.deliveryNumberPhone);
  const deliveryOrderComent = useSelector((state) => state.delivery.deliveryOrderComent);
  const deliveryDistance = useSelector((state) => state.delivery.deliveryDistance);
  const deliveryAdress = useSelector((state) => state.delivery.deliveryAdress);
  const deliveryBoolean = useSelector((state) => state.delivery.deliveryBoolean);
  
  console.log("TEST ",data?.lightBulbs);

  let deliveryPrice = 0;
  let deliveryPriceOverSity = 0;

  if (deliveryAdress != ''){
    deliveryPrice = 200
  }

  if (deliveryBoolean){
    deliveryPriceOverSity = Number(deliveryDistance) * 26
  }

  const selectTypeFunc = (e) => {
    const selectedType = JSON.parse(e.target.value);
    setCurrentType(selectedType);
  };

  const selectProcessingСutoutFunc = (e) => {
    const selectedProcessing = JSON.parse(e.target.value);
    setCurrentProcessingСutout(selectedProcessing);
  };

  const calcTotalSumFunc = () => {
    if(heightValue && widthValue) {
      setValidationInput(false);
      const calcSize = Number(widthValue) * Number(heightValue);
      const calcSquareMeter = calcSize/1000000;
  

  
      const totalSum = (calcSquareMeter * currentType?.price || 0 ) +
      (data?.lightBulbs * lightBulbsCount || 0) +
      (data?.patron * patronCount || 0) +
      (currentProcessingСutout?.price || 0)+ 
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
        selectedProcessingCount: currentProcessingСutout ? currentProcessingСutout?.count : '',
        total: totalSum,
      }

      setFinishMirrorPdf(finishedShower)

      setTotalSum(totalSum)
    } else {
      setValidationInput(true);
    }
  }

  return (
    <div>
      {/* <div className="wrap_item type_shower">
        <h3>Виберіть тип</h3>
        <div className="choose_item selected_shower">
          <select
            value={currentType ? JSON.stringify(currentType) : ""}
            onChange={selectTypeFunc}
          >
            <option value="" disabled>
              Оберіть тип
            </option>
            {data?.typeGlass &&
              data.typeGlass.map((item) => (
                <option key={item.name} value={JSON.stringify(item)}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      </div> */}
      <SelectObjecTemplate
        title={"Виберіть тип"}
        optionName={"Оберіть тип"}
        changeFunc={selectTypeFunc}
        state={currentType}
        data={data?.typeGlass}
        wrapClass={"wrap_item type_shower"}
        selectWrapClass={"choose_item selected_shower"}
        selectDivWrap={true}
      />

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

      <SelectObjecTemplate
        title={"Виберіть обробку"}
        optionName={"Оберіть обробку"}
        changeFunc={selectProcessingСutoutFunc}
        state={currentProcessingСutout}
        data={data?.processingСutout}
        wrapClass={"wrap_item type_shower"}
        selectWrapClass={"choose_item selected_shower"}
        selectDivWrap={true}
      />

      <DeliveryTemplate />
      <div className="footer_calc">
      <ClientFooter calcTotalSumFunc={calcTotalSumFunc} totalSum={totalSum} />
        <div className="send_order">
          <div className="mirror_button_exel" style={{ fontSize: 14 }}>
            <PDFDownloadLink
              document={<PdfFile order={finishMirrorPdf} />}
              fileName="orderDate"
            >
              {({ loading, error }) =>
                loading ? "завантаження..." : "Для менеджера"
              }
            </PDFDownloadLink>
            <PDFDownloadLink
              className=""
              document={<PdfFileClient order={finishMirrorPdf} />}
              fileName="orderDate"
            >
              {({ loading, error }) =>
                loading ? "завантаження..." : "Для клієнта"
              }
            </PDFDownloadLink>
          </div>
          {/* <SendPdfBlockTemplate 
          finishedPdf={finishMirrorPdf}/> */}
          <button>Оформити</button>
        </div>
      </div>
    </div>
  );
};

export default CosmeticMirrors;
