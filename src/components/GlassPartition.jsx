import React, { useState, useEffect } from "react";
import ModalGlassPartitions from "./ModalGlassPartitions";
import ListTheChoseFurniture from "./ListTheChoseFurniture";
import PdfFile from "./PdfFile/PdfFilePartitionManager";
import PdfFileClient from "./PdfFile/PdfFilePartitionClient";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from 'react-redux';
import DeliveryTemplate from "./DeliveryTemplate";
import '../style/shower.scss'

const GlassPartition = () => {
  const [allData, setAllData] = useState([]);
  const [currentObject, setCurrentObject] = useState({});
  const [currentType, setCurrentType] = useState(null);
  const [currentColor, setCurrentColor] = useState(null);
  const [currentProcessingStandart, setCurrentProcessingStandart] = useState(null);
  const [currentProcessingСutout, setCurrentProcessingСutout] = useState(null);
  const [currentTypePartitions, setCurrentTypePartitions] = useState('');
  const [widthValue, setWidthValue] = useState('');
  const [heightValue, setHeightValue] = useState('');
  const [depthValue, setDepthValue] = useState('');
  const [volumValue, setVolumValue] = useState(0);
  const [validationInput, setValidationInput] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [totalSum, setTotalSum] = useState(null);
  const cart = useSelector((state) => state.cart.items);
  const [isAssemblingt, setIsAssembling] = useState(false);
  const [isAssemblingtDovod, setIsAssemblingDovod] = useState(false);
  const [isAssemblingtZaklad, setIsAssemblingZaklad] = useState(false);
  const [minInstallation, setMinInstallation] = useState('');
  const [typeMontaje, setTypeMontaje] = useState('');
  const [typeDovod, setTypeDovod] = useState('');
  const [typeZaklad, setTypeZaklad] = useState('');
  const [finishedShowerPdf, setFinishedShowerPdf] = useState({});
  const [montaje] = useState([
    {
      name: 'Глуха перегородка',
      price: 450
    },
    {
      name: 'Відкривна перегородка',
      price: 500
    }
  ])
  const [dovod] = useState([
    {
      name: 'Доводчик',
      price: 500
    }
  ])
  const [zaklad] = useState([
    {
      name: 'Закладна 1 ',
      price: 100
    },
    {
      name: 'Закладна 2 ',
      price: 150
    },
    {
      name: 'Закладна 3 ',
      price: 200
    }
  ])
  
  const deliveryFirstName = useSelector((state) => state.delivery.deliveryFirstName);
  const deliveryLastName = useSelector((state) => state.delivery.deliveryLastName);
  const deliverySurName = useSelector((state) => state.delivery.deliverySurName);
  const deliveryNumberPhone = useSelector((state) => state.delivery.deliveryNumberPhone);
  const deliveryOrderComent = useSelector((state) => state.delivery.deliveryOrderComent);
  const deliveryDistance = useSelector((state) => state.delivery.deliveryDistance);
  const deliveryAdress = useSelector((state) => state.delivery.deliveryAdress);
  const deliveryBoolean = useSelector((state) => state.delivery.deliveryBoolean);

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

  const selectMontajeFunc = (e) => {
    const selectedMontaje = JSON.parse(e.target.value);
    setTypeMontaje(selectedMontaje);
  };

  const selectDovodFunc = (e) => {
    const selectedDovod = JSON.parse(e.target.value);
    setTypeDovod(selectedDovod);
  };

  const selectZakladFunc = (e) => {
    const selectedZaklad = JSON.parse(e.target.value);
    setTypeZaklad(selectedZaklad);
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
    if(heightValue && widthValue) {
      setValidationInput(false);
      const calcSize = (depthValue ? (Number(widthValue) * Number(heightValue)) + (Number(heightValue) * Number(depthValue)) : (Number(widthValue) * Number(heightValue) * 2));
      // const calcSize = Number(widthValue) * Number(heightValue);
      const calcSquareMeter = calcSize/1000000;
      const resCurrentProcessingStandart = Number(currentProcessingStandart?.price)  * calcSquareMeter
  
      let totalSumFurniture = 0;

      let intslPrice = 0;
      let deliveryPrice = 0;
      let deliveryPriceOverSity = 0;
      let deliveryFinalyPrice = 0;

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
  
      const totalSum = totalSumFurniture + 
      (calcSquareMeter * currentType?.price || 0) + 
      (calcSquareMeter * currentColor?.price || 0) + 
      (calcSquareMeter * currentProcessingStandart?.price || 0) + 
      (currentProcessingСutout?.price || 0) + 
      (deliveryBoolean ? deliveryPriceOverSity : deliveryPrice);
  
      const finishedShower = {
        type: currentTypePartitions, /* назва */
        width: widthValue, /* ширина */
        height: heightValue, /* висота */
        depth: depthValue, /* глубина */
        glassThicknessName:  currentType ? currentType?.name : '', /* скло - товщина */
        glassThicknessPrice: currentType ? currentType?.price : '', /* скло - ціна */
        glassColorName: currentColor ? currentColor?.name : '', /* скло колір - ціна */
        glassColorPrice: currentColor ? currentColor?.price : '', /* скло колір - ціна */
        adress:deliveryAdress, /* адреса доставки */
        deliveryPriceOverSity: deliveryBoolean ? deliveryPriceOverSity : '', /* ціна доставки за містом */
        deliveryPriceOver: !deliveryBoolean ? deliveryPrice : '',  /* ціна доставки по місту */
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
        total: totalSum, /* скло - ціна душ кабіни */
      }

      setFinishedShowerPdf(finishedShower)

      console.log('finishedShower',finishedShower);
      setTotalSum(totalSum)
    } else {
      setValidationInput(true);
    }
  }

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

  return (
    <div className="shower_wrapper">
      <h1>Скляні перегородки</h1>
      <div className="wrap_item type_glass">
            <h3>Виберіть перегородку</h3>
            <div className="choose_item selected_shower">
            <select value={currentTypePartitions} onChange={selectTypePartitions}>
              <option value="" disabled>
                
              </option>
              {currentObject &&
                currentObject.typePartitions &&
                currentObject.typePartitions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
            {/* <p>Вибране скло: <span>{currentGlass}</span> </p> */}
            </div>
        </div> 
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

        <div className="wrap_item size_shower">
          <h3>Вкажіть розміри (мм)</h3>
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
            <h3>Обробка скла</h3>
            <div className="choose_item selected_shower">
              <select
                value={currentProcessingStandart ? JSON.stringify(currentProcessingStandart) : ""}
                onChange={selectProcessingStandartFunc}
              >
                <option value="" disabled>
                  Без обробки
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

    
        <div className="firnitur">
            <button className="button_open" onClick={handleOpenModal}>Обрати фурнітуру</button>
            <ModalGlassPartitions currentPartitions={currentTypePartitions} isOpen={modalIsOpen} onClose={handleCloseModal} furnitureProps={currentObject?.furniture}/>
        </div>
        <ListTheChoseFurniture/>

        <div>
          <div className="choose_item item_mirrors item_montaje">
        <h3>Монтаж:</h3>
        <div className="montaje_wrap">
          <div className="checkbox_wrap montaje">
            <input id="checkbox3"  className="checkbox" type='checkbox' checked={isAssemblingt} onChange={changeIsAssemblingt}/>
            <label className="checkbox-label" htmlFor="checkbox3"></label>
          </div>

          <div className="choose_item selected_shower">
              <select 
              value={typeMontaje ? JSON.stringify(typeMontaje) : ""}
              onChange={selectMontajeFunc}>
                <option value="" disabled>
                  Тип:
                </option>
                {
                  montaje.map((item) => (
                    <option key={item.name} value={JSON.stringify(item)}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
        </div>
      </div>

      <div className="choose_item item_mirrors item_montaje">
        <h3>Доводчик:</h3>
        <div className="montaje_wrap">
          <div className="checkbox_wrap montaje">
            <input id="checkbox4"  className="checkbox" type='checkbox' checked={isAssemblingtDovod} onChange={() => setIsAssemblingDovod(state => !state)}/>
            <label className="checkbox-label" htmlFor="checkbox4"></label>
          </div>

          <div className="choose_item selected_shower">
              <select 
              value={typeDovod ? JSON.stringify(typeDovod) : ""}
              onChange={selectDovodFunc}>
                <option value="" disabled>
                  Тип:
                </option>
                {
                  dovod.map((item) => (
                    <option key={item.name} value={JSON.stringify(item)}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
        </div>
      </div>

      <div className="choose_item item_mirrors item_montaje">
        <h3>Закладна:</h3>
        <div className="montaje_wrap">
          <div className="checkbox_wrap montaje">
            <input id="checkbox5"  className="checkbox" type='checkbox' checked={isAssemblingtZaklad} onChange={() => setIsAssemblingZaklad(state => !state)}/>
            <label className="checkbox-label" htmlFor="checkbox5"></label>
          </div>

          <div className="choose_item selected_shower">
              <select 
              value={typeZaklad ? JSON.stringify(typeZaklad) : ""}
              onChange={selectZakladFunc}>
                <option value="" disabled>
                  Тип:
                </option>
                {
                  zaklad.map((item) => (
                    <option key={item.name} value={JSON.stringify(item)}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
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

export default GlassPartition;
