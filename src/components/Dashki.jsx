
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import ListTheChoseFurniture from "./ListTheChoseFurniture";
import PdfFile from "./PdfFile/PdfFileDashkiManager";
import PdfFileClient from "./PdfFile/PdfFileDashkiClient";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from 'react-redux';
import DeliveryTemplate from "./DeliveryTemplate";
import '../style/shower.scss'

const Dashki = () => {
  const [currentObject, setCurrentObject] = useState({});
  const [currentType, setCurrentType] = useState(null);
  const [validationInput, setValidationInput] = useState(false);
  const [widthValue, setWidthValue] = useState('');
  const [volumValue, setVolumValue] = useState('');
  const [currentColor, setCurrentColor] = useState(null);
  const [isVanta, setIsVanta] = useState(false);
  const [vantaValue, setVantaValue] = useState(false);
  const [isDepository, setIsDepository] = useState(false);
  const [depositoryValue, setDepositoryValue] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [totalSum, setTotalSum] = useState(null);
  const [currentProcessingStandart, setCurrentProcessingStandart] = useState(null);
  const [currentProcessingСutout, setCurrentProcessingСutout] = useState(null);
  const cart = useSelector((state) => state.cart.items);
  const [isAssemblingt, setIsAssembling] = useState(false);
  const [minInstallation, setMinInstallation] = useState('');
  const [adress, setAdress] = useState('');
  const [deliveryRoadDistance, setDeliveryRoadDistance] = useState('');
  const [delivery, setDelivery] = useState(false);
  const [finishedShowerPdf, setFinishedShowerPdf] = useState({});

  const deliveryFirstName = useSelector((state) => state.delivery.deliveryFirstName);
  const deliveryLastName = useSelector((state) => state.delivery.deliveryLastName);
  const deliverySurName = useSelector((state) => state.delivery.deliverySurName);
  const deliveryNumberPhone = useSelector((state) => state.delivery.deliveryNumberPhone);
  const deliveryOrderComent = useSelector((state) => state.delivery.deliveryOrderComent);

  console.log('finalFile',depositoryValue );

  useEffect(() => {
    fetch("https://calc-shower.herokuapp.com/get-all-dashki")
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
    setIsVanta(isVanta => !isVanta)
  }

  const changeDepository = () => {
    setIsDepository(isDepository => !isDepository)
  }

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  console.log('depositoryValue',depositoryValue);

  const calcTotalSumFunc = () => {
    if(widthValue) {
      setValidationInput(false);
      const calcSize = Number(widthValue) * Number(volumValue);
      const calcSquareMeter = calcSize/1000000;
      const resCurrentProcessingStandart = Number(currentProcessingStandart?.price)  * calcSquareMeter
  
      let totalSumFurniture = 0;
      let deliveryPrice = 0;
      let deliveryPriceOverSity = 0;

      if (adress != ''){
        deliveryPrice = 200
      }
 
      if (delivery){
        deliveryPriceOverSity = Number(deliveryRoadDistance) * 26
      }
  
      cart.forEach((el) => {
        el.colorsFurniture.forEach((item) => {
          totalSumFurniture += item.price * el.count
        })
      })

      const totalSum = totalSumFurniture + 
      (calcSquareMeter * currentType?.price || 0) +
      (calcSquareMeter * currentColor?.price || 0) +
      (isVanta ? currentObject?.vanta * vantaValue : 0) +
      (isDepository ? currentObject?.depository?.price * depositoryValue : 0) +
      (calcSquareMeter * currentProcessingStandart?.price || 0) +
      (currentProcessingСutout?.price || 0);
  
      const finishedShower = {
        type:  currentType ?  currentType.name : '', /* назва */
        goodsPrice: currentType ?  currentType.price : '',
        width: widthValue, /* ширина */
        // height: heightValue, /* висота */
        depth: volumValue ? volumValue : '', /* глубина */
        // glassThicknessName:  currentType ? currentType?.name : '', /* скло - товщина */
        // glassThicknessPrice: currentType ? currentType?.price : '', /* скло - ціна */
        glassColorName: currentColor ? currentColor?.name : '', /* скло колір - ціна */
        glassColorPrice: currentColor ? currentColor?.price : '', /* скло колір - ціна */
        adress:adress, /* адреса доставки */
        deliveryPriceOverSity: delivery ? deliveryPriceOverSity : '', /* ціна доставки за містом */
        deliveryPriceOver: !delivery ? deliveryPrice : '',  /* ціна доставки по місту */
        firstName: deliveryFirstName,
        lastName: deliveryLastName,
        surname: deliverySurName,
        numberPhone: deliveryNumberPhone,
        orderComent: deliveryOrderComent,
        currentProcessingStandartName: currentProcessingStandart ? 'Обробка' : '',
        currentProcessingStandartVal: currentProcessingStandart ? currentProcessingStandart?.name : '',
        currentProcessingStandartPrice: currentProcessingStandart ? resCurrentProcessingStandart : '',
        currentProcessingСutoutName: currentProcessingСutout ? currentProcessingСutout?.name : '',
        currentProcessingСutoutPrice: currentProcessingСutout ? currentProcessingСutout?.price : '',
        currentProcessingСutoutCount: currentProcessingСutout ? `${currentProcessingСutout?.count} шт` : '1 шт',
        vantaName: isVanta ? "Ванта" : '',
        vantaPrice: isVanta ? currentObject?.vanta : '',
        vantaValue: isVanta ? vantaValue : '',
        depositoryName : isDepository ? 'Закладна' : '',
        depositoryPrice : isDepository ? currentObject?.depository?.price : '',
        depositoryValue : isDepository ? depositoryValue : '',
        total: totalSum, /* скло - ціна душ кабіни */
      }

      setFinishedShowerPdf(finishedShower)
      console.log('finishedShower',finishedShower);
      setTotalSum(totalSum)
    } else {
      setValidationInput(true);
    }
  }

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
    setIsAssembling(isAssemblingt => !isAssemblingt)
  }

    const changeMinInstallationFunc = () => {
    // const paintingObj = data?.option?.painting;
    setMinInstallation(minInstallation => !minInstallation)
  }
    const isDelivery = () => {
    // const paintingObj = data?.option?.painting;
    setDelivery(delivery => !delivery)
  }

  const addAdress = (e) => {
    // const cordObj = data?.option?.cord;
    setAdress(e.target.value);
  }
  const addPriceInstalation = (e) => {
    // const cordObj = data?.option?.cord;
    setMinInstallation(e.target.value);
  }


  const roadDistance = (e) => {
    // const cordObj = data?.option?.cord;
    setDeliveryRoadDistance(e.target.value);
  }

  return (
    <div className="shower_wrapper">
      <h1>Дашки</h1>

      <div className="wrap_item type_shower">
            <h3>Виберіть тип</h3>
            <div className="choose_item selected_shower">
              <select
                value={currentType ? JSON.stringify(currentType) : ""}
                onChange={selectTypeFunc}
              >
                <option value="" disabled>
                  Оберіть тип
                </option>
                {currentObject?.typeGlass &&
                  currentObject.typeGlass.map((item) => (
                    <option key={item.name} value={JSON.stringify(item)}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
        </div>

        
        <div className="wrap_item size_shower">
          <h3>Вкажіть розміри (мм)</h3>
          <div className="size_input">
            <div className="size_item" >
              <input type="number" placeholder="Ширина" value={widthValue} onChange={(e) => setWidthValue(e.target.value)}/>
            <p style={{color: 'red'}}>{validationInput && 'Введіть данні'}</p>
            </div>
            <div className="size_item" >
              <input type="number" placeholder="Глибина" value={volumValue} onChange={(e) => setVolumValue(e.target.value)}/>
              <p style={{color: 'red'}}>{validationInput && 'Введіть данні'}</p>
            </div>
          </div>
        </div>

        <div className="wrap_item type_shower">
            <h3>Виберіть колір</h3>
            <div className="choose_item selected_shower">
              <select
                value={currentColor ? JSON.stringify(currentColor) : ""}
                onChange={selectColorFunc}
              >
                <option value="" disabled>
                  Оберіть колір
                </option>
                {currentObject?.color &&
                  currentObject.color.map((item) => (
                    <option key={item.name} value={JSON.stringify(item)}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
        </div>

        <div className="wrap_item type_shower">
            <h3>Виберіть обробку</h3>
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
            <h3>Виберіть обробку</h3>
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

        <div className="choose_item item_mirrors check-item">
        <h3>Ванта:</h3>
        <div className="checkbox_wrap">
        <input id="checkbox1" className="checkbox" type='checkbox' checked={isVanta} onChange={changeVanta}/>
        <label className="checkbox-label" htmlFor="checkbox1"></label>
        </div>
      </div>
      {isVanta &&
            <div className="wrap_item size_shower">
            <h3>Вкажіть розміри</h3>
            <div className="size_input">
              <div className="size_item" >
                <input type="number" placeholder="М/погонний" value={vantaValue} onChange={(e) => setVantaValue(e.target.value)}/>
              </div>
            </div>
          </div>
      }
              <div className="choose_item item_mirrors check-item">
        <h3>Закладна:</h3>
        <div className="checkbox_wrap">
        <input id="checkbox2" className="checkbox" type='checkbox' checked={isDepository} onChange={changeDepository}/>
        <label className="checkbox-label" htmlFor="checkbox2"></label>
        </div>
      </div>
      {isDepository &&
            <div className="wrap_item size_shower">
            <h3>Вкажіть кількість шт</h3>
            <div className="size_input">
              <div className="size_item" >
                <input type="number" placeholder="Кількість" value={depositoryValue} onChange={(e) => setDepositoryValue(e.target.value)}/>
              </div>
            </div>
          </div>
      }
              <div className="firnitur">
            <button className="button_open" onClick={handleOpenModal}>Обрати фурнітуру</button>
            <Modal isOpen={modalIsOpen} onClose={handleCloseModal} furnitureProps={currentObject?.furniture}/>
        </div>
        <ListTheChoseFurniture/>
        <div className="choose_item item_mirrors item_delivery">
      <h3>Доставка</h3>
              <div className="delivery_wrap">
                  <input className="cabel" placeholder="Адреса доставки" value={adress} onChange={(e) => addAdress(e)}/>
                  <div className="delivery_addres">
                      <div className="checkbox_wrap ">
                        <input id="checkbox5"  className="checkbox" type='checkbox' checked={delivery} onChange={isDelivery}/>
                        <label className="checkbox-label" htmlFor="checkbox5"></label>
                        <p style={{marginTop: 5}}>За місто</p> 
                      </div>
                      <input className="cabel width_delivery" type="number" placeholder="Відстань - км" value={deliveryRoadDistance} onChange={(e) => roadDistance(e)}/>
                  </div>
              </div>
      </div>
      <DeliveryTemplate/>
        <div className="footer_calc">
            <div className="summ">
              <div>
              <button onClick={calcTotalSumFunc}>Підрахувати вартість</button>
              </div>
              <div className="order_sum">
              <h3>Кінцева вартість: <span>{totalSum ? totalSum.toFixed(0) : 0} грн</span> </h3>
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
            <button>Оформити</button>
            </div>
        </div> 
    </div>
    
  );
};

export default Dashki;
