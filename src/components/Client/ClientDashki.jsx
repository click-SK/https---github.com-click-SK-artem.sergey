import React, { useState, useEffect } from "react";
import Modal from "../Furniture/Modal";
import ListTheChoseFurniture from "../Furniture/ListTheChoseFurniture";
import PdfFile from "./../PdfFile/PdfFileDashkiManager";
import PdfFileClient from "./../PdfFile/PdfFileDashkiClient";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from "react-redux";
import DeliveryTemplate from "../DeliveryTemplate";
import ClientFooter from "../Template/ClientFooter";
import SelectObjecTemplate from "../Template/SelectObjecTemplate";
import InputTemplate from "../Template/InputTemplate";
import ButtonGobackAndTitle from "../ButtonGobackAndTitle";
import "../../style/shower.scss";
const ClientDashki = () => {
  const [currentObject, setCurrentObject] = useState({});
  const [currentType, setCurrentType] = useState(null);
  const [validationInput, setValidationInput] = useState(false);
  const [widthValue, setWidthValue] = useState("");
  const [volumValue, setVolumValue] = useState("");
  const [currentColor, setCurrentColor] = useState(null);
  const [isVanta, setIsVanta] = useState(false);
  const [vantaValue, setVantaValue] = useState(false);
  const [isDepository, setIsDepository] = useState(false);
  const [depositoryValue, setDepositoryValue] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [totalSum, setTotalSum] = useState(null);
  const [currentProcessingStandart, setCurrentProcessingStandart] =
    useState(null);
  const [currentProcessingСutout, setCurrentProcessingСutout] = useState(null);
  const cart = useSelector((state) => state.cart.items);
  const [isAssemblingt, setIsAssembling] = useState(false);
  const [minInstallation, setMinInstallation] = useState("");
  const [typeMontaje, setTypeMontaje] = useState("");
  const [finishedShowerPdf, setFinishedShowerPdf] = useState({});
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

  useEffect(() => {
    fetch("https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/get-all-dashki")
      .then((res) => res.json())
      .then((data) => {
        setCurrentObject(data[0]);
      })
      .catch((error) => console.error(error));
  }, []);

  const selectTypeFunc = (e) => {
    const selectedType = JSON.parse(e.target.value);
    setCurrentType(selectedType);
  };

  const selectColorFunc = (e) => {
    const selectedColor = JSON.parse(e.target.value);
    setCurrentColor(selectedColor);
  };

  const changeVanta = () => {
    setIsVanta((isVanta) => !isVanta);
  };

  const changeDepository = () => {
    setIsDepository((isDepository) => !isDepository);
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const calcTotalSumFunc = () => {
    if (widthValue && widthValue >= 0) {
      setValidationInput(false);
      const calcSize = Number(widthValue) * Number(volumValue);
      const calcSquareMeter = calcSize / 1000000;
      const resCurrentProcessingStandart =
        Number(currentProcessingStandart?.price) * calcSquareMeter;

      let totalSumFurniture = 0;
      let deliveryPrice = 0;
      let deliveryPriceOverSity = 0;

      if (deliveryAdress != "") {
        deliveryPrice = 200;
      }

      if (deliveryBoolean) {
        deliveryPriceOverSity = Number(deliveryDistance) * 26;
      }

      cart.forEach((el) => {
        el.colorsFurniture.forEach((item) => {
          totalSumFurniture += item.price * el.count;
        });
      });

      const totalSum =
        totalSumFurniture +
        (calcSquareMeter * currentType?.price || 0) +
        (calcSquareMeter * currentColor?.price || 0) +
        (isVanta ? currentObject?.vanta * vantaValue : 0) +
        (isDepository
          ? currentObject?.depository?.price * depositoryValue
          : 0) +
        (calcSquareMeter * currentProcessingStandart?.price || 0) +
        (currentProcessingСutout?.price || 0) +
        (deliveryBoolean ? deliveryPriceOverSity : deliveryPrice);

      const finishedShower = {
        type: currentType ? currentType.name : "" /* назва */,
        goodsPrice: currentType ? currentType.price : "",
        width: widthValue /* ширина */,
        // height: heightValue, /* висота */
        depth: volumValue ? volumValue : "" /* глубина */,
        // glassThicknessName:  currentType ? currentType?.name : '', /* скло - товщина */
        // glassThicknessPrice: currentType ? currentType?.price : '', /* скло - ціна */
        glassColorName: currentColor
          ? currentColor?.name
          : "" /* скло колір - ціна */,
        glassColorPrice: currentColor
          ? currentColor?.price
          : "" /* скло колір - ціна */,
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
        currentProcessingStandartName: currentProcessingStandart
          ? "Обробка"
          : "",
        currentProcessingStandartVal: currentProcessingStandart
          ? currentProcessingStandart?.name
          : "",
        currentProcessingStandartPrice: currentProcessingStandart
          ? resCurrentProcessingStandart
          : "",
        currentProcessingСutoutName: currentProcessingСutout
          ? currentProcessingСutout?.name
          : "",
        currentProcessingСutoutPrice: currentProcessingСutout
          ? currentProcessingСutout?.price
          : "",
        currentProcessingСutoutCount: currentProcessingСutout
          ? `${currentProcessingСutout?.count} шт`
          : "1 шт",
        vantaName: isVanta ? "Ванта" : "",
        vantaPrice: isVanta ? currentObject?.vanta : "",
        vantaValue: isVanta ? vantaValue : "",
        depositoryName: isDepository ? "Закладна" : "",
        depositoryPrice: isDepository ? currentObject?.depository?.price : "",
        depositoryValue: isDepository ? depositoryValue : "",
        total: totalSum /* скло - ціна душ кабіни */,
      };

      setFinishedShowerPdf(finishedShower);

      setTotalSum(totalSum);
    } else {
      setValidationInput(true);
    }
  };

  const selectProcessingStandartFunc = (e) => {
    const selectedProcessing = JSON.parse(e.target.value);
    setCurrentProcessingStandart(selectedProcessing);
  };

  const selectProcessingСutoutFunc = (e) => {
    const selectedProcessing = JSON.parse(e.target.value);
    setCurrentProcessingСutout(selectedProcessing);
  };

  const changeIsAssemblingt = () => {
    // const paintingObj = data?.option?.painting;
    setIsAssembling((isAssemblingt) => !isAssemblingt);
  };

  const changeMinInstallationFunc = () => {
    // const paintingObj = data?.option?.painting;
    setMinInstallation((minInstallation) => !minInstallation);
  };

  const addPriceInstalation = (e) => {
    // const cordObj = data?.option?.cord;
    setMinInstallation(e.target.value);
  };

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
            "name": `Дашки, ${currentType.name} - ${widthValue} X ${volumValue}  мм2` ,
            "comment": ` `,
            "properties": [
            ]
          }
        ]
      }
    };

    setTimeout(() => {
      // setIsLoading(false);
      setIsSuccess(true);
    }, 1000);


    const response = await fetch('https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/create-crm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      
    });
    

  }

  return (
    <div className="shower_wrapper">
      <ButtonGobackAndTitle title={'Дашки'}/>
        <SelectObjecTemplate
        title={"Тип скла"}
        optionName={""}
        changeFunc={selectTypeFunc}
        state={currentType}
        data={currentObject?.typeGlass}
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
              placeholder={"Глибина"}
              onChangeFunc={setVolumValue}
              value={volumValue}
              validationInput={validationInput}
              inputClass={"input_miroor_item cabel"}
            />
          </div>
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

export default ClientDashki;
