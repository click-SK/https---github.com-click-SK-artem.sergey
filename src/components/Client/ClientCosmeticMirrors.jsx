import React, { useState, useEffect } from "react";
import ModalGlassPartitions from ".././ModalGlassPartitions";
// import ListTheChoseFurniture from "../.ListTheChoseFurniture";
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from "react-redux";
import "../../style/shower.scss";
import DeliveryTemplate from "../DeliveryTemplate";
import ClientFooter from "../Template/ClientFooter";
import SelectObjecTemplate from "../Template/SelectObjecTemplate";
import InputTemplate from "../Template/InputTemplate";

const ClientCosmeticMirrors = ({ data }) => {
  const [currentObject, setCurrentObject] = useState({});
  const [currentType, setCurrentType] = useState(null);
  const [widthValue, setWidthValue] = useState("");
  const [heightValue, setHeightValue] = useState("");
  const [validationInput, setValidationInput] = useState(false);
  const [lightBulbsCount, setLightBulbsCount] = useState("");
  const [patronCount, setPatronCount] = useState("");
  const [currentProcessingСutout, setCurrentProcessingСutout] = useState(null);
  const [totalSum, setTotalSum] = useState(null);

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
    fetch("https://calc-shower.herokuapp.com/get-all-cosmetic-mirrors")
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

  const selectProcessingСutoutFunc = (e) => {
    const selectedProcessing = JSON.parse(e.target.value);
    setCurrentProcessingСutout(selectedProcessing);
  };

  const calcTotalSumFunc = () => {
    if (heightValue && widthValue) {
      setValidationInput(false);
      const calcSize = Number(widthValue) * Number(heightValue);
      const calcSquareMeter = calcSize / 1000000;

      let deliveryPrice = 0;
      let deliveryPriceOverSity = 0;

      if (deliveryAdress != "") {
        deliveryPrice = 200;
      }

      if (deliveryBoolean) {
        deliveryPriceOverSity = Number(deliveryDistance) * 26;
      }

      const totalSum =
        (calcSquareMeter * currentType?.price || 0) +
        (currentObject?.lightBulbs * lightBulbsCount || 0) +
        (currentObject?.patron * patronCount || 0) +
        (currentProcessingСutout?.price || 0) +
        (deliveryBoolean ? deliveryPriceOverSity : deliveryPrice);

      const finishedShower = {
        // typeName: currentType?.name,
        // typePrice: currentType?.price,
        // glass: currentGlass,
        // glassColorName: currentGlassColor?.name,
        // glassColorPrice: currentGlassColor?.price,
        // width: widthValue,
        // height: heightValue,
        // volume: volumValue,
        // furniture: cart,
        // total: totalSum,
      };
      console.log("finishedShower", finishedShower);
      setTotalSum(totalSum);
    } else {
      setValidationInput(true);
    }
  };
  console.log("data", currentObject);
  return (
    <div>
      <h1>Косметичні дзеркала</h1>
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
      <DeliveryTemplate />
      <div className="footer_calc">
      <ClientFooter calcTotalSumFunc={calcTotalSumFunc} totalSum={totalSum} />
        <div className="send_order mirror_button">
          <button className="mirror_button_order">Оформити</button>
        </div>
      </div>
    </div>
  );
};

export default ClientCosmeticMirrors;
