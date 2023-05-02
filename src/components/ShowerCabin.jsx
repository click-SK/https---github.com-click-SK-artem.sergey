import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import ListTheChoseFurniture from "./ListTheChoseFurniture";
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from 'react-redux';
import '../style/shower.scss'
// import { PDFDownloadLink } from '@react-pdf/renderer';

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

  const keyCsv = [
    [ "Магазин", "Дзеркала" ],
    [ "Назва", "Модифікація", "Ціна" ],
    [ 'Форма скла', currentType?.name, "" ],
    [ 'Тип дзеркала', 'Дзеркало з фоновою підсвідкою', "4700 грн\м2" ],
    [ 'Розмір', 'В: 1м, Ш:1 ', "4700 грн" ],
    [ 'Рамка', 'Металева рамка буквою П', "900 грн" ]
  ];

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

  const calcTotalSumFunc = () => {
    if(heightValue && widthValue) {
      setValidationInput(false);
      const calcSize = Number(widthValue) * Number(heightValue);
      const calcSquareMeter = calcSize/10000;
      const resSizePrice = calcSquareMeter * (currentGlassColor?.price || 0);
  
      let totalSumFurniture = 0;

  
      cart.forEach((el) => {
        el.colorsFurniture.forEach((item) => {
          totalSumFurniture += item.price * el.count
        })
      })
  
      const totalSum = resSizePrice + (currentType?.price || 0) + totalSumFurniture;
  
      const finishedShower = {
        typeName: currentType?.name,
        typePrice: currentType?.price,
        glass: currentGlass,
        glassColorName: currentGlassColor?.name,
        glassColorPrice: currentGlassColor?.price,
        width: widthValue,
        height: heightValue,
        volume: volumValue,
        furniture: cart,
        total: totalSum,
      }
      console.log('finishedShower',finishedShower);
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
        <div className="firnitur">
            <button className="button_open" onClick={handleOpenModal}>Обрати фурнітуру</button>
            <Modal isOpen={modalIsOpen} onClose={handleCloseModal} furnitureProps={currentObject?.furniture}/>
        </div>
        <ListTheChoseFurniture />
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
            {/* <PDFDownloadLink className="mirror_button_exel" document={<PdfFile order={finishedShower}/>} fileName="orderDate">
             {({loading,error})=> (loading? "завантаження..." : "Зберегти" )}
            </PDFDownloadLink> */}
            <button>Оформити</button>
            </div>
        </div> 
    </div>
    
  );
};

export default ShowerCabin;
