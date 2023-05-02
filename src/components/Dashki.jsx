
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import ListTheChoseFurniture from "./ListTheChoseFurniture";
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from 'react-redux';
import '../style/shower.scss'

const Dashki = () => {
  const [currentObject, setCurrentObject] = useState({});
  const [currentType, setCurrentType] = useState(null);
  const [validationInput, setValidationInput] = useState(false);
  const [widthValue, setWidthValue] = useState('');
  const [volumValue, setVolumValue] = useState(0);
  const [currentColor, setCurrentColor] = useState(null);
  const [currentProcessing, setCurrentProcessing] = useState(null);
  const [isVanta, setIsVanta] = useState(false);
  const [isDepository, setIsDepository] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [totalSum, setTotalSum] = useState(null);
  const cart = useSelector((state) => state.cart.items);

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

  const selectProcessing = (e) => {
    const selectedProcessing = JSON.parse(e.target.value);
    setCurrentProcessing(selectedProcessing);
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

  const calcTotalSumFunc = () => {
    if(widthValue) {
      setValidationInput(false);
    //   const calcSize = Number(widthValue) * Number(heightValue);
    //   const calcSquareMeter = calcSize/1000000;
  
    //   let totalSumFurniture = 0;
  
    //   cart.forEach((el) => {
    //     el.colorsFurniture.forEach((item) => {
    //       totalSumFurniture += item.price * el.count
    //     })
    //   })
  
    //   const totalSum = totalSumFurniture + (calcSquareMeter * currentType?.price || 0) + (calcSquareMeter * currentColor?.price || 0) + (calcSquareMeter * currentProcessingStandart?.price || 0) + (currentProcessingСutout?.price || 0);
  
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
      setTotalSum(0)
    } else {
      setValidationInput(true);
    }
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
                value={currentProcessing ? JSON.stringify(currentProcessing) : ""}
                onChange={selectProcessing}
              >
                <option value="" disabled>
                  Оберіть обробку
                </option>
                {currentObject?.processing &&
                  currentObject.processing.map((item) => (
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
            <h3>Вкажіть розміри (мм)</h3>
            <div className="size_input">
              <div className="size_item" >
                <input type="number" placeholder="М/погонний" />
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
                <input type="number" placeholder="Кількість" />
              </div>
            </div>
          </div>
      }
              <div className="firnitur">
            <button className="button_open" onClick={handleOpenModal}>Обрати фурнітуру</button>
            <Modal isOpen={modalIsOpen} onClose={handleCloseModal} furnitureProps={currentObject?.furniture}/>
        </div>
        <ListTheChoseFurniture/>
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

export default Dashki;
