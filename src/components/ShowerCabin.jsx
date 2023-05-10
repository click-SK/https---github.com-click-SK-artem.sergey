import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import ModalAllFurniture from "./ModalAllFurniture";
import ListTheChosenFurniture from "./ListTheChoseFurniture";
import PdfFile from "./PdfFile/PdfShowerManadger";
import PdfFileClient from "./PdfFile/PdfShowerClient";
import { useSelector, useDispatch } from 'react-redux';
import '../style/shower.scss'
import { PDFDownloadLink } from '@react-pdf/renderer';
import DeliveryTemplate from "./DeliveryTemplate";
import { json } from "react-router-dom";
import SelectObjecTemplate from "./Template/SelectObjecTemplate";
import InputTemplate from "./Template/InputTemplate";
import ClientFooter from './Template/ClientFooter';
import SendPdfBlockTemplate from './Template/SendPdfBlockTemplate';
import ProcessingCoutPlusCountTemplate from './Template/ProcessingCoutPlusCountTemplate';

const ShowerCabin = () => {
  const [allData, setAllData] = useState([]);
  const [currentObject, setCurrentObject] = useState({});
  const [totalSum, setTotalSum] = useState(null);
  const [currentType, setCurrentType] = useState(null);
  const [currentGlass, setCurrentGlass] = useState("");
  const [currentGlassColor, setCurrentGlassColor] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalAllFurnitureIsOpen, setModalAllFurnitureIsOpen] = useState(false);
  const [widthValue, setWidthValue] = useState('');
  const [heightValue, setHeightValue] = useState('');
  const [depthValue, setDepthValue] = useState('');
  const [volumValue, setVolumValue] = useState(0);
  const [widthSum, setWidthSum] = useState(0);
  const [heightSum, setHeightSum] = useState(0);
  const [volumSum, setVolumSum] = useState(0);
  const [validationInput, setValidationInput] = useState(false);
  const cart = useSelector((state) => state.cart.items);
  const [isAssemblingt, setIsAssembling] = useState(false);
  const [minInstallation, setMinInstallation] = useState('');
  const [finishedShowerPdf, setFinishedShowerPdf] = useState({});
  const [currentProcessingStandart, setCurrentProcessingStandart] = useState(null);
  const [currentProcessingСutout, setCurrentProcessingСutout] = useState(null);
  const [currentProcessingСutoutCount, setCurrentProcessingСutoutCount] = useState('');
  const [furniture, setFurniture] = useState('none');
  const [isPrintPDF, setIsPrintPDF] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  const deliveryFirstName = useSelector((state) => state.delivery.deliveryFirstName);
  const deliveryLastName = useSelector((state) => state.delivery.deliveryLastName);
  const deliverySurName = useSelector((state) => state.delivery.deliverySurName);
  const deliveryNumberPhone = useSelector((state) => state.delivery.deliveryNumberPhone);
  const deliveryOrderComent = useSelector((state) => state.delivery.deliveryOrderComent);
  const deliveryDistance = useSelector((state) => state.delivery.deliveryDistance);
  const deliveryAdress = useSelector((state) => state.delivery.deliveryAdress);
  const deliveryBoolean = useSelector((state) => state.delivery.deliveryBoolean);
 

  useEffect(() => {
    fetch("https://calc-shower.herokuapp.com/get-all-shower")
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
  const selectGlassFunc = (e) => {
    setCurrentGlass(e.target.value);
  };
  const selectGlassColorFunc = (e) => {
    const selectedGlassColor = JSON.parse(e.target.value);
    setCurrentGlassColor(selectedGlassColor);
  };
  const minInstallationFunc = (e) => {
    const selectedGlassColor = JSON.parse(e.target.value);
    setMinInstallation(minInstallation);
  };

  const calcTotalSumFunc = () => {
    if(heightValue && widthValue) {
      setValidationInput(false);
      const calcSize = (depthValue ? (Number(widthValue) * Number(heightValue)) + (Number(heightValue) * Number(depthValue)) : (Number(widthValue) * Number(heightValue) * 2));
      const calcSquareMeter = calcSize/10000;
      const resSizePrice = calcSquareMeter * (currentGlassColor?.price || 0);
      const resCurrentProcessingStandart = Number(currentProcessingStandart?.price)  * calcSquareMeter

      console.log("глибина",  resCurrentProcessingStandart );
  
      let totalSumFurniture = 0;

      let intslPrice = 0;
      let deliveryPrice = 0;
      let deliveryPriceOverSity = 0;
      let deliveryFinalyPrice = 0;

     

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
  
      cart.forEach((el) => {
        el.colorsFurniture.forEach((item) => {
          totalSumFurniture += item.price * el.count
        })
      })
  
      const totalSum = resSizePrice +  
      totalSumFurniture +  
      (isAssemblingt ? currentType?.price : 0) + 
      (deliveryBoolean ? deliveryPriceOverSity : deliveryPrice) +
      (calcSquareMeter * currentProcessingStandart?.price || 0) + 
      (currentProcessingСutout?.price * currentProcessingСutoutCount || 0);

      
      const finishedShower = {
        type: currentType?.name, /* назва душ кабіни */
        goodsPrice: isAssemblingt ? currentType?.price : '',  /* ціна душ кабіни */
        width: widthValue, /* ширина душ кабіни */
        height: heightValue, /* висота - ціна душ кабіни */ 
        depth: depthValue, /* глубина */
        glass: currentGlass ? currentGlass : '' ,  /* скло - товщина душ кабіни */
        glassColorName:  currentGlass ? currentGlassColor?.name : '', /* скло - колір душ кабіни */
        glassColorPrice: currentGlass ? currentGlassColor?.price : '', /* скло - ціна душ кабіни */
        volume: volumValue, 
        cart: cart, /* масив фурнітур душ кабіни */
        adress:deliveryAdress, /* адреса доставки */
        deliveryPriceOverSity: deliveryBoolean ? deliveryPriceOverSity : '', /* ціна доставки за містом */
        deliveryPriceOver: !deliveryBoolean ? deliveryPrice : '',  /* ціна доставки по місту */
        firstName: deliveryFirstName,
        lastName: deliveryLastName,
        surname: deliverySurName,
        numberPhone: deliveryNumberPhone,
        orderComent: deliveryOrderComent,
        minInstallation: minInstallation ? minInstallation : '',
        minInstallationName: minInstallation ? 'Монтаж' : '',
        minInstallationOption: minInstallation ? "Мінімальний" : '',
        isAssemblingt: isAssemblingt ? minInstallation : '',
        isAssemblingtName: isAssemblingt ? 'Монтаж' : '',
        isAssemblingOption: isAssemblingt ? 'По розміру' : '',
        currentProcessingStandartName: currentProcessingStandart ? 'Обробка' : '',
        currentProcessingStandartVal: currentProcessingStandart ? currentProcessingStandart?.name : '',
        currentProcessingStandartPrice: currentProcessingStandart ? resCurrentProcessingStandart : '',
        currentProcessingСutoutName: currentProcessingСutout ? currentProcessingСutout?.name : '',
        currentProcessingСutoutPrice: currentProcessingСutout ? currentProcessingСutout?.price : '',
        currentProcessingСutoutCount: currentProcessingСutoutCount ? `${currentProcessingСutoutCount} шт` : '',
        total: totalSum, /* скло - ціна душ кабіни */
      }

      setFinishedShowerPdf(finishedShower)
      // console.log("файл друк", finishedShower);
      console.log("finishedShower", finishedShower);

      setTotalSum(totalSum)
    } else {
      setValidationInput(true);
    }
  }

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleOpenAllFurnitureModal = () => {
    setModalAllFurnitureIsOpen(true);
  };

  const handleCloseModalAllFurniture = () => {
    setModalAllFurnitureIsOpen(false);
  };


  const handleCloseModal = () => {
    setModalIsOpen(false);
  };


  const changeIsAssemblingt = () => {
    // const paintingObj = data?.option?.painting;
    setIsAssembling(isAssemblingt => !isAssemblingt)
  }

    const changeMinInstallationFunc = () => {
    // const paintingObj = data?.option?.painting;
    setMinInstallation(minInstallation => !minInstallation)
  }

  const addPriceInstalation = (e) => {
    // const cordObj = data?.option?.cord;
    setMinInstallation(e.target.value);
  }

  const selectProcessingStandartFunc = (e) => {
    const selectedProcessing = JSON.parse(e.target.value);
    setCurrentProcessingStandart(selectedProcessing);
  };

  const selectProcessingСutoutFunc = (e) => {
    const selectedProcessing = JSON.parse(e.target.value);
    setCurrentProcessingСutout(selectedProcessing);
  };


  // const changeWidth = (e) => {
  //   setWidthValue(e);
  //   setWidthSum(Number(e) * 5)
  // }

  // const changeHeight = (e) => {
  //   setHeightValue(e)
  //   setHeightSum(Number(e) * 5)
  // }

  // const changeVolume = (e) => {
  //   setVolumValue(e)
  //   setVolumSum(Number(e) * 5)
  // }

  // const data = {
  //   "source_id": 10,
  //   "buyer_comment": finishedShowerPdf.orderComent,
  //   "buyer": {
  //     "full_name": `${finishedShowerPdf.lastName} ${finishedShowerPdf.firstName} ${finishedShowerPdf.surname}`,
  //     "phone": finishedShowerPdf.numberPhone
  //   },
  //   "shipping": {
  //     "delivery_service_id": 1,
  //     "shipping_address_city": finishedShowerPdf.adress,
  //   },
  //   "products": [
  //     {
  //       "price": finishedShowerPdf.total,
  //       "quantity": 1,
  //       "name": finishedShowerPdf.type,
  //       "comment": `${finishedShowerPdf.minInstallationName} ${finishedShowerPdf.minInstallation}`,
  //       "properties": [
  //         {
  //           "name": finishedShowerPdf.currentProcessingStandartName,
  //           "value": finishedShowerPdf.currentProcessingStandartVal
  //         },
  //         {
  //           "name": finishedShowerPdf.currentProcessingСutoutName,
  //           "value": finishedShowerPdf.currentProcessingСutoutCount
  //         },
  //       ]
  //     }
  //   ],
  // };



  // console.log('currentType',currentType);
  // console.log('currentGlass',currentGlass);
  // console.log('currentGlassColor',currentGlassColor);
  // console.log('currentGlassColor',currentGlassColor);

  console.log('currentProcessingСutoutCount',currentProcessingСutoutCount);

  const handleFetch = async () => {

    const furnitureFinObj = {};
    const furnitureFinArr = [];

    cart.forEach((item, index) => {
      const itemData = {
        colorsFurniture: item.colorsFurniture[0].color,
        colorsFurniturePrice: item.colorsFurniture[0].price,
        tittleName: item.title,
        name2: item.depends[0],
        name3: item.depends[1],
        drawingImgSrc: item.drawingImg,
        mainImageSrc: item.mainImage,
        count: item.count,
      };
      furnitureFinArr.push(itemData);
      
    });

  furnitureFinArr.forEach((item, index) => {
    furnitureFinObj[index] = `${item.name2} ${item.tittleName} ${item.colorsFurniture} - ${item.count} шт`   
  });

  const resDepth = (finishedShowerPdf.depth ? ` X ${finishedShowerPdf.depth}` : '')

  // let result = JSON.stringify(furnitureFinObj);
  let result = JSON.stringify(furnitureFinObj).replace(/\\|"|\[|\]/g, '').replace(/},{/g, ', ');
  result = result.replace(/{"\d+":|}/g, '');


    //  const data = {
    //       order: {
    //   "source_id": 10,
    //   "buyer_comment": finishedShowerPdf.orderComent,
    //   "buyer": {
    //     "full_name": `${finishedShowerPdf.lastName} ${finishedShowerPdf.firstName} ${finishedShowerPdf.surname}`,
    //     "phone": finishedShowerPdf.numberPhone
    //   },
    //   "shipping": {
    //     "delivery_service_id": 1,
    //     "shipping_address_city": finishedShowerPdf.adress,
    //   },
    //   "products": [
    //     {
    //       "price": finishedShowerPdf.total,
    //       "quantity": 1,
    //       "name": `${finishedShowerPdf.type} - ${finishedShowerPdf.width} X ${finishedShowerPdf.height} ${resDepth}` ,
    //       "comment": ` `,
    //       "properties": [
    //         {
    //           "name": finishedShowerPdf.currentProcessingStandartName,
    //           "value": finishedShowerPdf.currentProcessingStandartVal
    //         },
    //         {
    //           "name": finishedShowerPdf.currentProcessingСutoutName,
    //           "value": finishedShowerPdf.currentProcessingСutoutCount
    //         },
    //         {
    //           "name": 'Фурнітура',
    //           "value": result
    //         },
    //       ]
    //     }
    //   ],
    // } };

    const deliver = finishedShowerPdf.adress ? finishedShowerPdf.adress : 'Без доставки' ;

    const data = {
      order: {
        "source_id": 10,
        "buyer_comment": finishedShowerPdf.orderComent,
        "buyer": {
          "full_name": `${finishedShowerPdf.lastName} ${finishedShowerPdf.firstName} ${finishedShowerPdf.surname}`,
          "phone": finishedShowerPdf.numberPhone
        },
        "shipping": {
          "delivery_service_id": 2,
          "shipping_address_city": deliver,
        },
        "products": [
          {
            "price": finishedShowerPdf.total,
            "quantity": 1,
            "name": `${finishedShowerPdf.type} - ${finishedShowerPdf.width} X ${finishedShowerPdf.height} ${resDepth} см2` ,
            "comment": ` `,
            "properties": [
              {
                "name": finishedShowerPdf.currentProcessingStandartName,
                "value": finishedShowerPdf.currentProcessingStandartVal
              },
              {
                "name": finishedShowerPdf.currentProcessingСutoutName,
                "value": finishedShowerPdf.currentProcessingСutoutCount
              },
              ...Object.values(furnitureFinObj).filter(value => value.name !== '').map(value => ({
                "name": 'Фурнітура',
                "value": value
              }))
            ]
          }
        ]
      }
    };

    // console.log('HI', furnitureFinObj , );
    console.log('HsI', Object.entries(furnitureFinObj)  );
    setIsLoading(true);

    // const response = await fetch('https://calc-shower.herokuapp.com/create-crm', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data)
      
    // });
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  }

  console.log('currentObject',currentObject);
  console.log('currentGlassColor',currentGlassColor);
  console.log('currentGlass',currentGlass);

  return (
    <div className="shower_wrapper">
      <h1>Душові кабіни</h1>

      <SelectObjecTemplate
        title={"Варіанти душових"}
        optionName={""}
        changeFunc={selectTypeFunc}
        state={currentType}
        data={currentObject?.type}
        wrapClass={"wrap_item type_shower"}
        selectWrapClass={"choose_item selected_shower"}
        selectDivWrap={true}
      />

      <div className="wrap_item type_glass">
        <h3>Виберіть скло</h3>
        <div className="choose_item selected_shower">
          <select value={currentGlass} onChange={selectGlassFunc}>
            <option value="" disabled></option>
            {currentObject &&
              currentObject.color &&
              currentObject.color.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>
      </div>
      <SelectObjecTemplate
        title={"Колір скла"}
        optionName={""}
        changeFunc={selectGlassColorFunc}
        state={currentGlassColor}
        data={currentObject?.glassThickness}
        wrapClass={"wrap_item color_glass"}
        selectWrapClass={"choose_item selected_shower"}
        selectDivWrap={true}
      />
      <div className="wrap_item size_shower">
        <h3>Вкажіть розміри (см)</h3>
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

      <SelectObjecTemplate
        title={"Обробка скла:"}
        optionName={""}
        changeFunc={selectProcessingStandartFunc}
        state={currentProcessingStandart}
        data={currentObject?.processingStandart}
        wrapClass={"wrap_item type_shower"}
        selectWrapClass={"choose_item selected_shower"}
        selectDivWrap={true}
      />

      <ProcessingCoutPlusCountTemplate
        title={"Додаткова обробка"}
        optionName={""}
        changeFunc={selectProcessingСutoutFunc}
        state={currentProcessingСutout}
        data={currentObject?.processingСutout}
        wrapClass={"wrap_item size_item "}
        selectWrapClass={"choose_item choose_procesing  "}
        selectDivWrap={true}
        currentProcessingСutoutCount={currentProcessingСutoutCount}
        setCurrentProcessingСutoutCount={setCurrentProcessingСutoutCount}
        inputClass={"input_miroor_item cabel"}
      />

      <div className="firnitur">
        <button className="button_open" onClick={handleOpenModal}>
          Обрати фурнітуру
        </button>
        <Modal
          isOpen={modalIsOpen}
          onClose={handleCloseModal}
          furnitureProps={currentObject?.furniture}
        />
      </div>
      <div className="firnitur">
        <button className="button_open" onClick={handleOpenAllFurnitureModal}>
          Вся фурнітура
        </button>
        <ModalAllFurniture
          isOpen={modalAllFurnitureIsOpen}
          onClose={handleCloseModalAllFurniture}
        />
      </div>
      <ListTheChosenFurniture />

      <div>
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
            </div>
          </div>
        </div>
        <DeliveryTemplate />
      </div>

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
              {/* <div className="print print_manager" style={{ fontSize: 14 }}> */}
                <PDFDownloadLink
                  className="print print_manager" style={{ fontSize: 14 }}
                  document={<PdfFile order={finishedShowerPdf} cart={cart} />}
                  fileName={`Душові кабіни менеджер ${new Date().toLocaleString().replaceAll('/', '-').replaceAll(':', '-')}.pdf`}
            >
                  {({ loading, error }) =>
                    loading ? "завантаження..." : "Для менеджера"
                  }
                </PDFDownloadLink>
              {/* </div> */}
              {/* <div className="print print_client" style={{ fontSize: 14 }}> */}
                <PDFDownloadLink
                  className="print print_client" style={{ fontSize: 14,}}
                  document={<PdfFileClient order={finishedShowerPdf} />}
                  fileName={`Душові кабіни клієнт ${new Date().toLocaleString().replaceAll('/', '-').replaceAll(':', '-')}.pdf`}
            >
                  {({ loading, error }) =>
                    loading ? "завантаження..." : "Для клієнта"
                  }
                </PDFDownloadLink>
              {/* </div> */}
            </div>
            </div>
          )}
          {/* <SendPdfBlockTemplate 
          finishedPdf={finishedShowerPdf}
          furniture={cart}/> */}
          {/* <button onClick={handleFetch}>Оформити</button> */}
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

export default ShowerCabin;
