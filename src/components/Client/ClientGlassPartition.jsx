import React, { useState, useEffect } from "react";
import ModalGlassPartitions from "./../ModalGlassPartitions";
import ListTheChoseFurniture from "./../ListTheChoseFurniture";
import PdfFile from "./../PdfFile/PdfFilePartitionManager";
import PdfFileClient from "./../PdfFile/PdfFilePartitionClient";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from "react-redux";
import DeliveryTemplate from "../DeliveryTemplate";
import ClientFooter from "../Template/ClientFooter";
import SelectObjecTemplate from "../Template/SelectObjecTemplate";
import InputTemplate from "../Template/InputTemplate";
import ButtonGobackAndTitle from "../ButtonGobackAndTitle";
import "../../style/shower.scss";

const ClientGlassPartition = () => {
  const [allData, setAllData] = useState([]);
  const [currentObject, setCurrentObject] = useState({});
  const [currentType, setCurrentType] = useState(null);
  const [currentColor, setCurrentColor] = useState(null);
  const [currentProcessingStandart, setCurrentProcessingStandart] =
    useState(null);
  const [currentProcessingСutout, setCurrentProcessingСutout] = useState(null);
  const [currentTypePartitions, setCurrentTypePartitions] = useState("");
  const [widthValue, setWidthValue] = useState("");
  const [heightValue, setHeightValue] = useState("");
  const [depthValue, setDepthValue] = useState("");
  const [volumValue, setVolumValue] = useState(0);
  const [validationInput, setValidationInput] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [totalSum, setTotalSum] = useState(null);
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

  const montaje = {
    "Глуха перегородка": 450,
    "Відкривна перегородка": 500,
  };

  const dovod = {
    Доводчик: 500,
  };
  const zaklad = {
    "Закладна 1 ": 100,
    "Закладна 2 ": 150,
    "Закладна 3 ": 200,
  };

  useEffect(() => {
    fetch("https://calc-shower.herokuapp.com/get-all-glass-partitions")
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
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

  const selectProcessingStandartFunc = (e) => {
    const selectedProcessing = JSON.parse(e.target.value);
    setCurrentProcessingStandart(selectedProcessing);
  };

  const selectProcessingСutoutFunc = (e) => {
    const selectedProcessing = JSON.parse(e.target.value);
    setCurrentProcessingСutout(selectedProcessing);
  };

  const selectTypePartitions = (e) => {
    setCurrentTypePartitions(e.target.value);
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const calcTotalSumFunc = () => {
    if ((heightValue && heightValue >= 0) && (widthValue && widthValue >= 0)) {
      setValidationInput(false);
      const calcSize = depthValue
        ? Number(widthValue) * Number(heightValue) +
          Number(heightValue) * Number(depthValue)
        : Number(widthValue) * Number(heightValue) * 2;
      // const calcSize = Number(widthValue) * Number(heightValue);
      const calcSquareMeter = calcSize / 1000000;
      const resCurrentProcessingStandart =
        Number(currentProcessingStandart?.price) * calcSquareMeter;

      let totalSumFurniture = 0;

      let intslPrice = 0;
      let deliveryPrice = 0;
      let deliveryPriceOverSity = 0;
      let deliveryFinalyPrice = 0;

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
        (calcSquareMeter * currentProcessingStandart?.price || 0) +
        (currentProcessingСutout?.price || 0) +
        (deliveryBoolean ? deliveryPriceOverSity : deliveryPrice);

      const finishedShower = {
        type: currentTypePartitions /* назва */,
        width: widthValue /* ширина */,
        height: heightValue /* висота */,
        depth: depthValue /* глубина */,
        glassThicknessName: currentType
          ? currentType?.name
          : "" /* скло - товщина */,
        glassThicknessPrice: currentType
          ? currentType?.price
          : "" /* скло - ціна */,
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
        total: totalSum /* скло - ціна душ кабіни */,
      };

      setFinishedShowerPdf(finishedShower);
      setTotalSum(totalSum);
    } else {
      setValidationInput(true);
    }
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

    const resDepth = (depthValue ? ` X ${depthValue}` : '')

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
            "name": `Перегородка ${currentTypePartitions}, ${currentType.name} - ${widthValue} X ${heightValue} ${resDepth} см2` ,
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


    const response = await fetch('https://calc-shower.herokuapp.com/create-crm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      
    });
    

  }

  return (
    <div className="shower_wrapper">
      <ButtonGobackAndTitle title={'Скляні перегородки'}/>
      <div className="wrap_item type_glass">
        <h3>Виберіть перегородку</h3>
        <div className="choose_item selected_shower">
          <select value={currentTypePartitions} onChange={selectTypePartitions}>
            <option value="" disabled></option>
            {currentObject &&
              currentObject.typePartitions &&
              currentObject.typePartitions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>
      </div>
        <SelectObjecTemplate
          title={"Виберіть тип"}
          optionName={""}
          changeFunc={selectTypeFunc}
          state={currentType}
          data={currentObject.typeGlass}
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
          <div className="size_item">
            <InputTemplate
              placeholder={"Глибина"}
              onChangeFunc={setDepthValue}
              value={depthValue}
              validationInput={validationInput}
              inputClass={"input_miroor_item cabel"}
            />
          </div>
        </div>
      </div>

      <div>
        <DeliveryTemplate />
      </div>

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

export default ClientGlassPartition;
