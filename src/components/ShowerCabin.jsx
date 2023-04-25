import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { CSVLink } from "react-csv";
import '../style/shower.scss'

const ShowerCabin = () => {
  const [allData, setAllData] = useState([]);
  const [currentObject, setCurrentObject] = useState({});
  const [totalSum, setTotalSum] = useState(null);
  const [currentType, setCurrentType] = useState(null);
  const [currentGlass, setCurrentGlass] = useState("");
  const [currentGlassColor, setCurrentGlassColor] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [widthValue, setWidthValue] = useState(0);
  const [heightValue, setHeightValue] = useState(0);
  const [volumValue, setVolumValue] = useState(0);
  const [widthSum, setWidthSum] = useState(0);
  const [heightSum, setHeightSum] = useState(0);
  const [volumSum, setVolumSum] = useState(0);


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

  console.log("allData", allData);

  const selectTypeFunc = (e) => {
    const selectedType = JSON.parse(e.target.value);
    setCurrentType(selectedType);
  };
  const selectGlassFunc = (e) => {
    setCurrentGlass(e.target.value);
  };
  const selectGlassColorFunc = (e) => {
    setCurrentGlassColor(e.target.value);
  };

  const calcTotalSumFunc = () => {
    const priceForSize = widthSum + heightSum + volumSum;
    console.log('priceForSize',priceForSize);
    let total = 0;
    if(currentType?.price) {
      total = currentType.price;
    }

    const res = total + priceForSize;
    setTotalSum(res)
  }

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const changeWidth = (e) => {
    setWidthValue(e);
    setWidthSum(Number(e) * 5)
  }

  const changeHeight = (e) => {
    setHeightValue(e)
    setHeightSum(Number(e) * 5)
  }

  const changeVolume = (e) => {
    setVolumValue(e)
    setVolumSum(Number(e) * 5)
  }

  console.log('widthSum',widthSum);
  console.log('heightSum',heightSum);
  console.log('volumSum',volumSum);
  console.log('totalSum',totalSum);

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
                currentObject.glassThickness &&
                currentObject.glassThickness.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
            </select>
            {/* <p>Вибране скло: <span>{currentGlass}</span> </p> */}
            </div>
        </div>            
        <div className="wrap_item color_glass">
          <h3>Виберіть колір скла</h3>
          <div className="choose_item selected_shower">
            <select value={currentGlassColor} onChange={selectGlassColorFunc}>
              <option value="" disabled>
                Оберіть колір скла
              </option>
              {currentObject &&
                currentObject.color &&
                currentObject.color.map((item) => (
                  <option key={item} value={item}>
                    {item}
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
              <input type="number" placeholder="Ширина" />
            </div>
            <div  className="size_item" >
              {/* <h4>Висота:</h4> */}
              <input type="number" placeholder="Висота" />
            </div>
            <div className="size_item" >
              {/* <h4>Глубина:</h4> */}
              <input type="number" placeholder="Глибина" />
            </div>
          </div>
        </div>
        <div className="firnitur">
            <button className="button_open" onClick={handleOpenModal}>Обрати фурнітуру</button>
            <Modal isOpen={modalIsOpen} onClose={handleCloseModal}/>
        </div>
            <div className="list_firnitur">
              <ul>
                <div className="list_header">
                  <p>фото</p>
                  <p>Опис</p>
                  <p>Креслення</p>
                  <p>Колір</p>
                  <p>Ціна</p>
                </div>
                <li>option 1</li>
              </ul>
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
            <CSVLink className="exel" data={keyCsv} filename = { "date.csv" } separator={";"} >Друк</CSVLink>
            <button>Оформити</button>
            </div>
        </div> 
    </div>
    
  );
};

export default ShowerCabin;
