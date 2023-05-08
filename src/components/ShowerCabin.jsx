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
  const [furniture, setFurniture] = useState('none');


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
          totalSumFurniture += item.price
        })
      })
  
      const totalSum = resSizePrice +  
      totalSumFurniture +  
      (isAssemblingt ? currentType?.price : 0) + 
      (deliveryBoolean ? deliveryPriceOverSity : deliveryPrice) +
      (calcSquareMeter * currentProcessingStandart?.price || 0) + 
      (currentProcessingСutout?.price || 0);

      
      const finishedShower = {
        type: currentType?.name, /* назва душ кабіни */
        goodsPrice: currentType?.price,  /* ціна душ кабіни */
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
        currentProcessingСutoutCount: currentProcessingСutout ? `${currentProcessingСutout?.count} шт` : '1 шт',
        total: totalSum, /* скло - ціна душ кабіни */
      }

      setFinishedShowerPdf(finishedShower)


      // console.log("файл друк", finishedShower);
      console.log("фурнітура", finishedShower.cart);

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

  // console.log('currentType',currentType);
  // console.log('currentGlass',currentGlass);
  // console.log('currentGlassColor',currentGlassColor);
  // console.log('currentGlassColor',currentGlassColor);


  const testCrm = async () => {
    const url = 'https://openapi.keycrm.app/v1/order';
    const correlationId = '3c1cdba9-75bf-4a63-920b-80ff07f142c0';
    const token = 'ODQ0MDA5YjE3ZmJhMGYwNzQxMTFlN2FmYmRlZjE0MzEwNDljYzM5OQ';
    
    

    const data = {
      "source_id": 10,
      "buyer_comment": finishedShowerPdf.orderComent,
      "buyer": {
        "full_name": `${finishedShowerPdf.lastName} ${finishedShowerPdf.firstName} ${finishedShowerPdf.surname}`,
        "phone": finishedShowerPdf.numberPhone
      },
      "shipping": {
        "delivery_service_id": 1,
        "shipping_address_city": finishedShowerPdf.adress,
      },
      "products": [
        {
          "price": finishedShowerPdf.total,
          "quantity": 1,
          "name": finishedShowerPdf.type,
          "comment": `${finishedShowerPdf.minInstallationName} ${finishedShowerPdf.minInstallation}`,
          "properties": [
            {
              "name": finishedShowerPdf.currentProcessingStandartName,
              "value": finishedShowerPdf.currentProcessingStandartVal
            },
            {
              "name": finishedShowerPdf.currentProcessingСutoutName,
              "value": finishedShowerPdf.currentProcessingСutoutCount
            },
          ]
        }
      ],
    };

    console.log(data);
  
    // try {
    //   const response = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${token}`,
    //       'Correlation-Id': correlationId,
    //       'Accept': 'application/json',
    //       'Pragma': 'no-cache'
    //     },
    //     body: JSON.stringify(data)
    //   });
  
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
  
    //   const responseData = await response.json();
    //   console.log(responseData);
    // } catch (error) {
    //   console.error('Error:', error.message);

    // }
    console.log("press order");
  };

  console.log('currentObject',currentObject);

  return (
    <div className="shower_wrapper">
      <h1>Душові кабіни</h1>
        <div className="wrap_item type_shower">
            <h3>Варіанти душових</h3>
            <div className="choose_item selected_shower">
              <select
                value={currentType ? JSON.stringify(currentType) : ""}
                onChange={selectTypeFunc}
              >
                <option value="" disabled>
                  Душові:
                </option>
                {currentObject?.type &&
                  currentObject.type.map((item) => (
                    <option key={item.name} value={JSON.stringify(item)}>
                      {item.name}
                    </option>
                  ))}
              </select>
              {/* <p>Вибраний тип: <span>{currentType?.name && currentType.name}</span>  </p> */}
            </div>
        </div>
        <div className="wrap_item type_glass">
            <h3>Виберіть скло</h3>
            <div className="choose_item selected_shower">
            <select value={currentGlass} onChange={selectGlassFunc}>
              <option value="" disabled>
                Тип скла:
              </option>
              {currentObject &&
                currentObject.color &&
                currentObject.color.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
            {/* <p>Вибране скло: <span>{currentGlass}</span> </p> */}
            </div>
        </div>            
        <div className="wrap_item color_glass">
          <h3>Колір скла</h3>
          <div className="choose_item selected_shower">
            <select value={currentGlassColor ? JSON.stringify(currentGlassColor) : ""} onChange={selectGlassColorFunc}>
              <option value="" disabled>
                Оберіть колір
              </option>
              {currentObject &&
                currentObject.glassThickness &&
                currentObject.glassThickness.map((item) => (
                  <option key={item.name} value={JSON.stringify(item)}>
                    {item.name}
                  </option>
                ))}
            </select>
            {/* <p>Вибраний колір скла: <span>{currentGlassColor}</span> </p> */}
          </div>
          
        </div> 
        <div className="wrap_item size_shower">
          <h3>Вкажіть розміри (см)</h3>
          <div className="size_input">
            <div className="size_item" >
              {/* <h4>Ширина:</h4> */}
              <input type="number" placeholder="Ширина" value={widthValue} onChange={(e) => setWidthValue(e.target.value)}/>
            <p style={{color: 'red'}}>{validationInput && 'Введіть данні'}</p>
            </div>
            <div  className="size_item" >
              {/* <h4>Висота:</h4> */}
              <input type="number" placeholder="Висота" value={heightValue} onChange={(e) => setHeightValue(e.target.value)}/>
              <p style={{color: 'red'}}>{validationInput && 'Введіть данні'}</p>
            </div>
            <div className="size_item" >
              {/* <h4>Глубина:</h4> */}
              <input type="number" placeholder="Глибина" value={depthValue} onChange={(e) => setDepthValue(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="wrap_item type_shower">
            <h3>Обробка скла:</h3>
            <div className="choose_item selected_shower">
              <select
                value={currentProcessingStandart ? JSON.stringify(currentProcessingStandart) : ""}
                onChange={selectProcessingStandartFunc}
              >
                <option value="" disabled>
                  Оберіть обробку
                </option>
                {currentObject?.processingStandart &&
                  currentObject.processingStandart.map((item) => (
                    <option key={item.name} value={JSON.stringify(item)}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
        </div>

        <div className="wrap_item type_shower">
            <h3>Додаткова обробка</h3>
            <div className="choose_item selected_shower">
              <select
                value={currentProcessingСutout ? JSON.stringify(currentProcessingСutout) : ""}
                onChange={selectProcessingСutoutFunc}
              >
                <option value="" disabled>
                  Оберіть обробку
                </option>
                {currentObject?.processingСutout &&
                  currentObject.processingСutout.map((item) => (
                    <option key={item.name} value={JSON.stringify(item)}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
        </div>

        <div className="firnitur">
            <button className="button_open" onClick={handleOpenModal}>Обрати фурнітуру</button>
            <Modal isOpen={modalIsOpen} onClose={handleCloseModal} furnitureProps={currentObject?.furniture}/>
        </div>
        <div className="firnitur">
            <button className="button_open" onClick={handleOpenAllFurnitureModal}>Вся фурнітура</button>
            <ModalAllFurniture isOpen={modalAllFurnitureIsOpen} onClose={handleCloseModalAllFurniture}/>
        </div>
        <ListTheChosenFurniture />

          <div>
          <div className="choose_item item_mirrors item_montaje">
        <h3>Монтаж:</h3>
        <div className="montaje_wrap">
          <div className="checkbox_wrap montaje">
            <input id="checkbox3"  className="checkbox" type='checkbox' checked={isAssemblingt} onChange={changeIsAssemblingt}/>
            <label className="checkbox-label" htmlFor="checkbox3"></label>
          </div>
          <input className="cabel width_delivery" type="number" placeholder="Ціна монтажу" value={minInstallation} onChange={(e) => addPriceInstalation(e)}/>
        </div>
      </div>
      <DeliveryTemplate/>
          </div> 
                
          <div className="footer_calc">
            <div className="summ">
              <div>
                <button onClick={calcTotalSumFunc}>Підрахувати вартість</button>
              </div>
              <div className="order_sum">
              <h3>Кінцева вартість: <span>{totalSum ? totalSum : 0} грн</span> </h3>
              </div>
            </div>
            <div className="send_order">
            <div className="mirror_button_exel" style={{fontSize: 14}}>
            <PDFDownloadLink  document={<PdfFile order={finishedShowerPdf} cart={cart}/>} fileName="orderDate">
             {({loading,error})=> (loading? "завантаження..." : "Для менеджера" )}
            </PDFDownloadLink>
            <PDFDownloadLink className="" document={< PdfFileClient order={finishedShowerPdf}/>} fileName="orderDate">
             {({loading,error})=> (loading? "завантаження..." : "Для клієнта" )}
            </PDFDownloadLink>
            </div>
               <button onClick={testCrm}>Оформити</button>
            </div>
        </div> 
    </div>
    
  );
};

export default ShowerCabin;
