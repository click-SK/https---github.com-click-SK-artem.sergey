
import React, { useState, useEffect } from "react";
import ModalGlassPartitions from "./../ModalGlassPartitions";
import ListTheChoseFurniture from "./../ListTheChoseFurniture";
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from 'react-redux';
import '../../style/shower.scss'

const ClientGlassPartition = () => {
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


  console.log('На фінал',currentTypePartitions);

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
  
      let totalSumFurniture = 0;
  
      cart.forEach((el) => {
        el.colorsFurniture.forEach((item) => {
          totalSumFurniture += item.price * el.count
        })
      })
  
      const totalSum = totalSumFurniture + (calcSquareMeter * currentType?.price || 0) + (calcSquareMeter * currentColor?.price || 0) + (calcSquareMeter * currentProcessingStandart?.price || 0) + (currentProcessingСutout?.price || 0);
  
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
      }
      console.log('finishedShower',finishedShower);
      setTotalSum(totalSum)
    } else {
      setValidationInput(true);
    }
  }

  console.log('currentTypePartitions',currentTypePartitions);

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
    
        {/* <div className="firnitur">
            <button className="button_open" onClick={handleOpenModal}>Обрати фурнітуру</button>
            <ModalGlassPartitions currentPartitions={currentTypePartitions} isOpen={modalIsOpen} onClose={handleCloseModal} furnitureProps={currentObject?.furniture}/>
        </div>
        <ListTheChoseFurniture/> */}
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
            <button>Оформити</button>
            </div>
        </div> 
    </div>
    
  );
};

export default ClientGlassPartition;
