import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import ListTheChosenFurniture from "./ListTheChoseFurniture";
import PdfFile from "./PdfFile/PdfShowerManadger";
import { useSelector, useDispatch } from 'react-redux';
import '../style/shower.scss'
import { PDFDownloadLink } from '@react-pdf/renderer';

const ShowerCabin = () => {
  const [allData, setAllData] = useState([]);
  const [currentObject, setCurrentObject] = useState({});
  const [totalSum, setTotalSum] = useState(null);
  const [currentType, setCurrentType] = useState(null);
  const [currentGlass, setCurrentGlass] = useState("");
  const [currentGlassColor, setCurrentGlassColor] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [widthValue, setWidthValue] = useState('');
  const [heightValue, setHeightValue] = useState('');
  const [volumValue, setVolumValue] = useState(0);
  const [widthSum, setWidthSum] = useState(0);
  const [heightSum, setHeightSum] = useState(0);
  const [volumSum, setVolumSum] = useState(0);
  const [validationInput, setValidationInput] = useState(false);
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
  const [finishedShowerPdf, setFinishedShowerPdf] = useState({});
  const [currentProcessingStandart, setCurrentProcessingStandart] = useState(null);
  const [currentProcessingСutout, setCurrentProcessingСutout] = useState(null);
  const [furniture, setFurniture] = useState('none');

 

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
      const calcSize = Number(widthValue) * Number(heightValue);
      const calcSquareMeter = calcSize/10000;
      const resSizePrice = calcSquareMeter * (currentGlassColor?.price || 0);
  
      let totalSumFurniture = 0;

      let intslPrice = 0;
      let deliveryPrice = 0;
      let deliveryPriceOverSity = 0;
      let deliveryFinalyPrice = 0;

      const furnitureFinArr = [];

      // cart.forEach((item, index) => {
      //   const itemData = [
      //       `${item.depends[0]} ${item.title} ${item.depends[1]} ${item.colorsFurniture.color} ${item.count} ${item.colorsFurniture.price * item.count } грн`
      //     // colorsFurniture: item.colorsFurniture[0].color,
      //     // colorsFurniturePrice: item.colorsFurniture[0].price,
      //     // tittleName: item.title,
      //     // name2: item.depends[0],
      //     // name3: item.depends[1],
      //     // drawingImgSrc: item.drawingImg,
      //     // mainImageSrc: item.mainImage,
      //     // count: item.count,
      //   ];
      //   furnitureFinArr.push(itemData);
      // });

      
      // const furnitureFinArr2 = [];
      // const furnitureFinObj = {};



      // furniture.forEach((item, index) => {
      //     const itemData = {
      //       colorsFurniture: item.colorsFurniture[0].color,
      //       colorsFurniturePrice: item.colorsFurniture[0].price,
      //       tittleName: item.title,
      //       name2: item.depends[0],
      //       name3: item.depends[1],
      //       drawingImgSrc: item.drawingImg,
      //       mainImageSrc: item.mainImage,
      //       count: item.count,
      //     };
      //     furnitureFinArr.push(itemData);
      //   });
      

      // furnitureFinArr.forEach((item, index) => {
      //     furnitureFinObj[index] = `${item.name2} ${item.tittleName} ${item.name3} ${item.colorsFurniture} ${item.count} ${item.colorsFurniturePrice * item.count } грн`   
      //     // setFurniture(furnitureFinArr);
      //   });

      // // setfurnitureFin(furnitureFinArr)
      // console.log('фурнітура ТЕСТ', furnitureFinArr);
      // console.log('фурнітура obj ТЕСТ', furnitureFinObj);

     
      console.log('tset fimal', furniture);

      if (calcSquareMeter < 2){
        intslPrice = calcSquareMeter * 300
     } else if (calcSquareMeter > 2){
       intslPrice = calcSquareMeter * 350
     };
     
     if (adress != ''){
       deliveryPrice = 200
     }

     if (delivery){
       deliveryPriceOverSity = Number(deliveryRoadDistance) * 26
     }
  
      cart.forEach((el) => {
        el.colorsFurniture.forEach((item) => {
          totalSumFurniture += item.price
        })
      })
  
      const totalSum = resSizePrice + 
      (currentType?.price || 0) + 
      totalSumFurniture + (minInstallation ? 500 : 0) + 
      (isAssemblingt ? intslPrice : 0) + 
      (delivery ? deliveryPriceOverSity : deliveryPrice) +
      (calcSquareMeter * currentProcessingStandart?.price || 0) + 
      (currentProcessingСutout?.price || 0);
  
      const finishedShower = {
        type: currentType?.name, /* назва душ кабіни */
        goodsPrice: currentType?.price,  /* ціна душ кабіни */
        width: widthValue, /* ширина душ кабіни */
        height: heightValue, /* висота - ціна душ кабіни */ 
        glass: currentGlass ? currentGlass : '' ,  /* скло - товщина душ кабіни */
        glassColorName:  currentGlass ? currentGlassColor?.name : '', /* скло - колір душ кабіни */
        glassColorPrice: currentGlass ? currentGlassColor?.price : '', /* скло - ціна душ кабіни */
        volume: volumValue, 
        cart: cart, /* масив фурнітур душ кабіни */
        adress:adress, /* адреса доставки */
        deliveryPriceOverSity: delivery ? deliveryPriceOverSity : '', /* ціна доставки за містом */
        deliveryPriceOver: !delivery ? deliveryPrice : '',  /* ціна доставки по місту */
        firstName: firstName,
        lastName: lastName,
        surname: surname,
        numberPhone: numberPhone,
        orderComent: orderComent,
        minInstallation: minInstallation ? 500 : '',
        minInstallationName: minInstallation ? 'Монтаж' : '',
        minInstallationOption: minInstallation ? "Мінімальний" : '',
        isAssemblingt: isAssemblingt ? minInstallation : '',
        isAssemblingtName: isAssemblingt ? 'Монтаж' : '',
        isAssemblingOption: isAssemblingt ? 'По розміру' : '',
        currentProcessingStandartName: currentProcessingStandart ? 'Обробка' : '',
        currentProcessingStandartVal: currentProcessingStandart ? currentProcessingStandart?.name : '',
        currentProcessingStandartPrice: currentProcessingStandart ? currentProcessingStandart?.price : '',
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

  const handleCloseModal = () => {
    setModalIsOpen(false);

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
        // setFurniture(furnitureFinObj);
        
      });
    
    furnitureFinArr.forEach((item, index) => {
        furnitureFinObj[index] = `${item.name2} ${item.tittleName} ${item.name3} ${item.colorsFurniture} ${item.count} ${item.colorsFurniturePrice * item.count } грн`   
        // setFurniture(furnitureFinArr);
        setFurniture(furnitureFinObj);
      });
    
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

  console.log('currentObject',currentObject);

  return (
    <div className="shower_wrapper">
      <h1>Душові кабіни</h1>
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
                Оберіть скло
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
          <h3>Виберіть колір скла</h3>
          <div className="choose_item selected_shower">
            <select value={currentGlassColor ? JSON.stringify(currentGlassColor) : ""} onChange={selectGlassColorFunc}>
              <option value="" disabled>
                Оберіть колір скла
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
              <input type="number" placeholder="Глибина" />
            </div>
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

        <div className="firnitur">
            <button className="button_open" onClick={handleOpenModal}>Обрати фурнітуру</button>
            <Modal isOpen={modalIsOpen} onClose={handleCloseModal} furnitureProps={currentObject?.furniture}/>
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
          <input className="cabel width_delivery" type="number" placeholder="Ціна монтажу" value={minInstallation} onChange={(e) => minInstallation(e)}/>
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
              <h3>Кінцева вартість: <span>{totalSum ? totalSum : 0} грн</span> </h3>
              </div>
            </div>
            <div className="send_order">
            <PDFDownloadLink className="mirror_button_exel" document={<PdfFile order={finishedShowerPdf} cart={cart}/>} fileName="orderDate">
             {({loading,error})=> (loading? "завантаження..." : "Зберегти" )}
            </PDFDownloadLink>
            <button>Оформити1</button>
            </div>
        </div> 
    </div>
    
  );
};

export default ShowerCabin;
