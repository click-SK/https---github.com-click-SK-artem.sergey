import React, { useState, useEffect } from "react";
import ModalGlassPartitions from "./ModalGlassPartitions";
import ModalAllFurniture from "./ModalAllFurniture";
import ListTheChoseFurniture from "./ListTheChoseFurniture";
import PdfFile from "./PdfFile/PdfFilePartitionManager";
import PdfFileClient from "./PdfFile/PdfFilePartitionClient";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from 'react-redux';
import DeliveryTemplate from "./DeliveryTemplate";
import SelectObjecTemplate from "./Template/SelectObjecTemplate";
import InputTemplate from "./Template/InputTemplate";
import ClientFooter from './Template/ClientFooter';
import SendPdfBlockTemplate from './Template/SendPdfBlockTemplate';
import ProcessingCoutPlusCountTemplate from './Template/ProcessingCoutPlusCountTemplate';
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
  const [modalAllFurnitureIsOpen, setModalAllFurnitureIsOpen] = useState(false);
  const [totalSum, setTotalSum] = useState(null);
  const cart = useSelector((state) => state.cart.items);
  const [isAssemblingt, setIsAssembling] = useState(false);
  const [isAssemblingtDovod, setIsAssemblingDovod] = useState(false);
  const [isAssemblingtZaklad, setIsAssemblingZaklad] = useState(false);
  const [minInstallation, setMinInstallation] = useState('');
  const [typeMontaje, setTypeMontaje] = useState('');
  const [typeDovod, setTypeDovod] = useState('');
  const [dovodCout, setdovodCout] = useState('');
  const [typeZaklad, setTypeZaklad] = useState('');
  const [finishedShowerPdf, setFinishedShowerPdf] = useState({});
  const [currentProcessingСutoutCount, setCurrentProcessingСutoutCount] = useState('');
  const [isPrintPDF, setIsPrintPDF] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

  
  const handleOpenAllFurnitureModal = () => {
    setModalAllFurnitureIsOpen(true);
  };

  const handleCloseModalAllFurniture = () => {
    setModalAllFurnitureIsOpen(false);
  };


  const calcTotalSumFunc = () => {
    if(heightValue && widthValue) {
      setValidationInput(false);
      const calcSize = (depthValue ? (Number(widthValue) * Number(heightValue)) + (Number(heightValue) * Number(depthValue)) : (Number(widthValue) * Number(heightValue) * 2));
      // const calcSize = Number(widthValue) * Number(heightValue);
      const calcSquareMeter = calcSize/10000;
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
      (currentProcessingСutout?.price * currentProcessingСutoutCount || 0) + 
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
        currentProcessingСutoutCount: currentProcessingСutoutCount ? `${currentProcessingСutoutCount} шт` : '',
        total: totalSum, /* скло - ціна душ кабіни */
      }

      setFinishedShowerPdf(finishedShower)

      console.log('обробка',currentProcessingСutoutCount);
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


  let result = JSON.stringify(furnitureFinObj).replace(/\\|"|\[|\]/g, '').replace(/},{/g, ', ');
  result = result.replace(/{"\d+":|}/g, '');

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
            "name": ` Скляна перегородка ${finishedShowerPdf.type} - ${finishedShowerPdf.width} X ${finishedShowerPdf.height} ${resDepth} мм2` ,
            "comment": ` `,
            "properties": [
              {
                "name": `Скло`,
                "value": finishedShowerPdf.glassThicknessName
              },
              {
                "name": `Колір скла`,
                "value": finishedShowerPdf.glassColorName
              },
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
    console.log('HsI', data  );
    setIsLoading(true);

    const response = await fetch('https://calc-shower.herokuapp.com/create-crm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  }


  return (
    <div className="shower_wrapper">
      <h1>Скляні перегородки</h1>
      <div className="wrap_item type_glass">
        <h3>Виберіть перегородку</h3>
        <div className="choose_item selected_shower">
          <select value={currentTypePartitions} onChange={selectTypePartitions}>
            <option value="" disabled></option>
            {currentObject &&
              currentObject.typePartitions &&
              currentObject.typePartitions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>
      </div>

      <SelectObjecTemplate
        title={"Виберіть тип"}
        optionName={""}
        changeFunc={selectTypeFunc}
        state={currentType}
        data={currentObject.typeGlass}
        wrapClass={"wrap_item type_shower"}
        selectWrapClass={"choose_item selected_shower"}
        selectDivWrap={true}
      />

      <div className="wrap_item size_shower">
        <h3>Вкажіть розміри (cм)</h3>
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
        <ModalGlassPartitions
          currentPartitions={currentTypePartitions}
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
      <ListTheChoseFurniture />

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

            <div className="choose_item selected_shower">
              <select
                value={typeMontaje ? JSON.stringify(typeMontaje) : ""}
                onChange={selectMontajeFunc}
              >
                <option value="" disabled>
                  Тип:
                </option>
                {montaje.map((item) => (
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
              <input
                id="checkbox4"
                className="checkbox"
                type="checkbox"
                checked={isAssemblingtDovod}
                onChange={() => setIsAssemblingDovod((state) => !state)}
              />
              <label className="checkbox-label" htmlFor="checkbox4"></label>
            </div>

            <div className="choose_item selected_shower">
              <input className="input_miroor_item cabel"
              placeholder="Кількість"
              value={dovodCout}
              onChange={(e) => setdovodCout(e.target.value)}/>
            </div>
          </div>
        </div>

        <div className="choose_item item_mirrors item_montaje">
          <h3>Закладна:</h3>
          <div className="montaje_wrap">
            <div className="checkbox_wrap montaje">
              <input
                id="checkbox5"
                className="checkbox"
                type="checkbox"
                checked={isAssemblingtZaklad}
                onChange={() => setIsAssemblingZaklad((state) => !state)}
              />
              <label className="checkbox-label" htmlFor="checkbox5"></label>
            </div>

            <div className="choose_item selected_shower">
              <select
                value={typeZaklad ? JSON.stringify(typeZaklad) : ""}
                onChange={selectZakladFunc}
              >
                <option value="" disabled>
                  Тип:
                </option>
                {zaklad.map((item) => (
                  <option key={item.name} value={JSON.stringify(item)}>
                    {item.name}
                  </option>
                ))}
              </select>
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
                <PDFDownloadLink
                  className="print print_manager" style={{ fontSize: 14 }}
                  document={<PdfFile order={finishedShowerPdf} cart={cart} />}
                  fileName={`Душові кабіни менеджер ${new Date().toLocaleString().replaceAll('/', '-').replaceAll(':', '-')}.pdf`}
            >
                  {({ loading, error }) =>
                    loading ? "завантаження..." : "Для менеджера"
                  }
                </PDFDownloadLink>
                <PDFDownloadLink
                  className="print print_client" style={{ fontSize: 14,}}
                  document={<PdfFileClient order={finishedShowerPdf} />}
                  fileName={`Душові кабіни клієнт ${new Date().toLocaleString().replaceAll('/', '-').replaceAll(':', '-')}.pdf`}
            >
                  {({ loading, error }) =>
                    loading ? "завантаження..." : "Для клієнта"
                  }
                </PDFDownloadLink>
            </div>
            </div>
          )}
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

export default GlassPartition;
