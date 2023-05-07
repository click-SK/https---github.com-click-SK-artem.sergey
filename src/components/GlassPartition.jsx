import React, { useState, useEffect } from "react";
import ModalGlassPartitions from "./ModalGlassPartitions";
import ListTheChoseFurniture from "./ListTheChoseFurniture";
import PdfFile from "./PdfFile/PdfFilePartitionManager";
import PdfFileClient from "./PdfFile/PdfFilePartitionClient";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from 'react-redux';
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
  const [minInstallation, setMinInstallation] = useState('');
  const [adress, setAdress] = useState('');
  const [deliveryRoadDistance, setDeliveryRoadDistance] = useState('');
  const [delivery, setDelivery] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [surname, setSurname] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  const [orderComent, setOrderComent] = useState('');
  const [typeMontaje, setTypeMontaje] = useState('');
  const [finishedShowerPdf, setFinishedShowerPdf] = useState({});



  const montaje = {
      'Глуха перегородка' : 450,
      'Відкривна перегородка' : 500
  }

const dovod = {
    'Доводчик' : 500,
}
const zaklad = {
    'Закладна 1 ' : 100,
    'Закладна 2 ' : 150,
    'Закладна 3 ' : 200,
}

  console.log('На фінал');

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

  console.log('currentColor?.price',currentColor?.price);

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
  
      const totalSum = totalSumFurniture + (calcSquareMeter * currentType?.price || 0) + (calcSquareMeter * currentColor?.price || 0) + (calcSquareMeter * currentProcessingStandart?.price || 0) + (currentProcessingСutout?.price || 0) + (delivery ? deliveryPriceOverSity : deliveryPrice);
  
      const finishedShower = {
        type: currentTypePartitions, /* назва */
        width: widthValue, /* ширина */
        height: heightValue, /* висота */
        depth: depthValue, /* глубина */
        glassThicknessName:  currentType ? currentType?.name : '', /* скло - товщина */
        glassThicknessPrice: currentType ? currentType?.price : '', /* скло - ціна */
        glassColorName: currentColor ? currentColor?.name : '', /* скло колір - ціна */
        glassColorPrice: currentColor ? currentColor?.price : '', /* скло колір - ціна */
        adress:adress, /* адреса доставки */
        deliveryPriceOverSity: delivery ? deliveryPriceOverSity : '', /* ціна доставки за містом */
        deliveryPriceOver: !delivery ? deliveryPrice : '',  /* ціна доставки по місту */
        firstName: firstName,
        lastName: lastName,
        surname: surname,
        numberPhone: numberPhone,
        orderComent: orderComent,
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
  const addFirstName = (e) => {
    // const cordObj = data?.option?.cord;
    setFirstName(e.target.value);
  }
  const addLastName = (e) => {
    // const cordObj = data?.option?.cord;
    setLastName(e.target.value);
  }
  const addSurname = (e) => {
    // const cordObj = data?.option?.cord;
    setSurname(e.target.value);
  }
  const addPhone = (e) => {
    // const cordObj = data?.option?.cord;
    setNumberPhone(e.target.value);
  }
  const addComent = (e) => {
    // const cordObj = data?.option?.cord;
    setOrderComent(e.target.value);
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
          {/* <input className="cabel width_delivery" type="number" placeholder="Ціна монтажу" value={minInstallation} onChange={(e) => addPriceInstalation(e)}/> */}
          <div className="choose_item selected_shower">
              <select 
              value={typeMontaje ? typeMontaje : ""}>
                <option value="" disabled>
                  Тип:
                </option>
                {Object.entries(montaje).filter(([_, value]) => value !== '').map(([key, value], idx) => (
                    <option key={idx} >
                      {key}
                    </option>
                  ))}
              </select>
            </div>
        </div>
      </div>
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
      <div className="choose_item item_mirrors item_fullname">
      <h3>ПІБ:</h3>
        <div className="fullname_wrap">
          <div className="name_lastname">
            <input className="cabel" placeholder="Ім'я" value={firstName} onChange={(e) => addFirstName (e)} />
            <input className="cabel" placeholder="Прізвище" value={lastName} onChange={(e) => addLastName(e)}/>
          </div>
          <input className="cabel" placeholder="По батькові" value={surname} onChange={(e) => addSurname(e)}/>
        </div>
      </div>
      <div className="choose_item item_mirrors">
      <h3>Телефон</h3>
        <input className="cabel" placeholder="+ 38 (0ХХ) ХХХ ХХ ХХ " value={numberPhone} onChange={(e) => addPhone(e)}/>
      </div>
      <div className="choose_item item_mirrors item_textarea">
      <h3>Деталі замовлення</h3>
        <textarea className="cabel" style={{width: "70%", height:"100%"}} value={orderComent} name="" id="" cols="30" rows="10" onChange={(e) => addComent(e)}></textarea>
      </div>
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
