import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeliveryTemplate from "../DeliveryTemplate";
import ClientFooter from "../Template/ClientFooter";
import SelectObjecTemplate from "../Template/SelectObjecTemplate";
import SelectObjecTemplateAndPhoto from "../Template/SelectObjecTemplateAndPhoto";
import InputTemplate from "../Template/InputTemplate";
import InputTemplateWithoutValidation from "../Template/InputTemplateWithoutValidation";
import ButtonGobackAndTitle from "../ButtonGobackAndTitle";
import "../../style/shower.scss";

const ClientShower = () => {
  const [currentObject, setCurrentObject] = useState({});
  const [currentType, setCurrentType] = useState(null);
  const [currentDorsHandles, setCurrentDorsHandles] = useState(null);
  const [widthValue, setWidthValue] = useState("");
  const [heightValue, setHeightValue] = useState("");
  const [depthValue, setDepthValue] = useState("");
  const [depthSecondValue, setDepthSecondValue] = useState('');
  const [validationInput, setValidationInput] = useState(false);
  const [totalSum, setTotalSum] = useState(null);
  const [isPrintPDF, setIsPrintPDF] = useState(false);
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
    fetch("https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/get-all-shower")
      .then((res) => res.json())
      .then((data) => {
        setCurrentObject(data[0]);
      })
      .catch((error) => console.error(error));
  }, []);

  const selectTypeFunc = (e) => {
    setCurrentType(e);
  };

  const selectDorsHandlesFunc = (e) => {
    const selectedType = JSON.parse(e.target.value);
    setCurrentDorsHandles(selectedType);
  };

  const testCrm = async () => {
    const url = "https://openapi.keycrm.app/v1/order";
    const correlationId = "3c1cdba9-75bf-4a63-920b-80ff07f142c0";
    const token = "ODQ0MDA5YjE3ZmJhMGYwNzQxMTFlN2FmYmRlZjE0MzEwNDljYzM5OQ";

    const data = {
      source_id: 10,
      buyer_comment: "I want this sentence to be my buyer comment on KeyCRM",
      discount_percent: 11.5,
      discount_amount: 9.99,
      shipping_price: 2.5,
      wrap_price: 3.5,
      taxes: 2.5,
      buyer: {
        full_name: "Test Kushnir",
        email: "john.doe@mail.app",
        phone: "+380635530117",
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Correlation-Id": correlationId,
          Accept: "application/json",
          Pragma: "no-cache",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const calcTotalSumFunc = () => {
    if ((heightValue && heightValue >= 0) && (widthValue && widthValue >= 0)) {
      setValidationInput(false);
      // const calcSize = depthValue
      //   ? Number(widthValue) * Number(heightValue) +
      //     Number(heightValue) * Number(depthValue)
      //   : Number(widthValue) * Number(heightValue) * 2;
      const calcSize = (depthValue ? 
        (((Number(widthValue) * Number(heightValue)) + (Number(heightValue) * Number(depthValue)) + (depthSecondValue ? (Number(heightValue) * Number(depthSecondValue)) : 0)) * 2) 
        : (Number(widthValue) * Number(heightValue) * 2));
        console.log('calcSize',calcSize);
      const calcSquareMeter = calcSize / 1000000;

      let totalSumFurniture = 0;

      let intslPrice = 0;
      let deliveryPrice = 0;
      let deliveryPriceOverSity = 0;
      let deliveryFinalyPrice = 0;

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

      const totalSum =
        (currentType?.price || 0) +
        totalSumFurniture +
        (deliveryBoolean ? deliveryPriceOverSity : deliveryPrice);

      const finishedShower = {};

      setTotalSum(totalSum);
    } else {
      setValidationInput(true);
    }
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
            "name": `${currentType.name} - ${widthValue} X ${heightValue} ${resDepth} мм2` ,
            "comment": ` `,
            "properties": [
              {
                "name": currentDorsHandles.name,
                "value": `${currentDorsHandles.price} грн`
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


    const response = await fetch('https://sklo-expert-server-v2-008be2d9257c.herokuapp.com/create-crm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      
    });
  }

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="shower_wrapper">
      <ButtonGobackAndTitle title={'Душові кабіни'}/>
      {/* <div className="wrap_item type_shower">
        <SelectObjecTemplateAndPhoto
          title={"Варіанти душових"}
          optionName={""}
          changeFunc={selectTypeFunc}
          state={currentType}
          data={currentObject?.typeWordpress}
          wrapClass={"wrap_item type_shower"}
          selectWrapClass={"choose_item selected_shower"}
          selectDivWrap={true}
        />
      </div> */}
        <SelectObjecTemplateAndPhoto
        title={"Варіанти душових"}
        optionName={""}
        changeFunc={selectTypeFunc}
        state={currentType}
        data={currentObject?.typeWordpress}
        wrapClass={"wrap_item type_shower"}
        selectWrapClass={"choose_item selected_shower"}
        selectDivWrap={true}
      />
      <div className="img_shower_wrap">
        {currentType && 
        <img src={currentType.showerImage}/>
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
          <div className="size_item">
            <InputTemplateWithoutValidation
              placeholder={"Глибина"}
              onChangeFunc={setDepthValue}
              value={depthValue}
              inputClass={"input_miroor_item cabel"}
            />
          </div>
          <div className="size_item">
            <InputTemplateWithoutValidation
              placeholder={"Глибина"}
              onChangeFunc={setDepthSecondValue}
              value={depthSecondValue}
              inputClass={"input_miroor_item cabel"}
            />
          </div>
        </div>
      </div>
        <SelectObjecTemplate
          title={"Виберіть ручки"}
          changeFunc={selectDorsHandlesFunc}
          state={currentDorsHandles}
          data={currentObject?.dorsHandles}
          wrapClass={"wrap_item color_glass"}
          selectWrapClass={"choose_item selected_shower"}
          selectDivWrap={true}
        />
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

export default ClientShower;