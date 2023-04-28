import React from 'react';
import {Font, View, Page, Image, Text, Document, StyleSheet } from '@react-pdf/renderer';
import Logo from '../img/logo.png';
// import Roboto from '../fonts/roboto/Roboto-Regular.ttf'

// Font.registerHyphenationCallback(word => [word]);


// import React, { useState, useEffect } from "react";
// import { CSVLink } from "react-csv";
// import ExelPrint from "./ExelPrint";
// import PdfFile from "./PdfFile";
// import Api from "./Api";
// import '../style/shower.scss'
// import '../style/mirrors.scss'
// import { PDFDownloadLink } from '@react-pdf/renderer';

// const StandartMirrors = ({ data }) => {

//   const [currentType, setCurrentType] = useState(null);
//   const [currentTypeArray, setCurrentTypeArray] = useState(null);
//   const [currentGoods, setCurrentGoods] = useState(null);
//   const [currentFrame, setCurrentFrame] = useState(null);
//   const [currentBackLight, setCurrentBackLight] = useState(null);
//   const [currentSwitch, setCurrentSwitch] = useState(null);
//   const [currentColor, setCurrentColor] = useState(null);
//   const [currentCord, setCurrentCord] = useState('');
//   const [isWarmedUp, setIsWarmedUp] = useState(false);
//   const [isPainting, setIsPainting] = useState(false);
//   const [sizeWidthMirrors,setSizeWidthMirrors] = useState(0);
//   const [sizeHeightMirrors,setSizeHeightMirrors] = useState(0);
//   const [sizeFrame,setSizeFrame] = useState(0);
//   const [totalSum, setTotalSum] = useState(0);
//   const [finishMirrorPdf, setFinishMirrorPdf] = useState({});
//   // const keyCsv = [
//   //   {"Форма скла": currentType?.name },
//   //   {"Тип дзеркала" : 'З фоновою підсвідкою'}
//   // ];

//   const keyCsv = [
//     [ "Магазин", "Дзеркала" ],
//     [ "Назва", "Модифікація", "Ціна" ],
//     [ 'Форма скла', currentType?.name, "" ],
//     [ 'Тип дзеркала', 'Дзеркало з фоновою підсвідкою', "4700 грн\м2" ],
//     [ 'Розмір', 'В: 1м, Ш:1 ', "4700 грн" ],
//     [ 'Рамка', 'Металева рамка буквою П', "900 грн" ]
//   ];

  


//   const calcTotalSum = () => {
//     const priceMeterCord = data?.option?.cord?.price;

//     const calcSize = Number(sizeWidthMirrors) * Number(sizeHeightMirrors);
//     const calcSquareMeter = calcSize/10000;
//     const warmedUpPrice = data?.option?.warmedUp?.price;

//     const resSizePrice = calcSquareMeter * currentGoods.price;
//     const resCordSum = currentCord * priceMeterCord;
//     const resFrameSum = sizeFrame * currentFrame.price;

//     const total = resSizePrice + resCordSum + resFrameSum + currentSwitch.price + (isPainting ? currentColor.price : 0) + (isWarmedUp ? warmedUpPrice : 0);

//     const finishedMirros = {
//       type: currentType.name,
//       goodsPrice: currentGoods.price,
//       goodsName: currentGoods.name,
//       width: sizeWidthMirrors,
//       height: sizeHeightMirrors,
//       framePrice: currentFrame.price,
//       frameSize: sizeFrame,
//       frameName: currentFrame.name,
//       switchName: currentSwitch.name,
//       switchPrice: currentSwitch.price,
//       cord: currentCord,
//       warmerUp: isWarmedUp ? 'Так' : 'Ні', 
//       painting: isPainting ? 'Так' : 'Ні',
//       colorName: isPainting ? currentColor.name : '-',
//       colorPrice: isPainting ? currentColor.price : '-',
//       total: total,
//       print: "hello"
//     }

//     setFinishMirrorPdf(finishedMirros)
    

//     setTotalSum(total)

//   }

//   console.log("Type", finishMirrorPdf);

//   const selectTypeFunc = (e) => {
//     const selectedType = JSON.parse(e.target.value);
//     setCurrentType(selectedType);
//     setCurrentTypeArray(selectedType.goods);
//   };

//   const selectGoodsFunc = (e) => {
//     const selectedGoods = JSON.parse(e.target.value);
//     setCurrentGoods(selectedGoods);
//   };

//   const selectFrameFunc = (e) => {
//     const selectedFrame = JSON.parse(e.target.value);
//     setCurrentFrame(selectedFrame);
//   };

//   const selectBackLightFunc = (e) => {
//     const selectedBackLight = JSON.parse(e.target.value);
//     setCurrentBackLight(selectedBackLight);
//   };

//   const selectSwitchFunc = (e) => {
//     const selectedSwitch = JSON.parse(e.target.value);
//     setCurrentSwitch(selectedSwitch);
//   };

//   const changeCord = (e) => {
//     const cordObj = data?.option?.cord;
//     setCurrentCord(e.target.value);
//   }

//   const changeWarmUpFunc = () => {
//     const warmeUpObj = data?.option?.warmedUp;
//     setIsWarmedUp(isWarmedUp => !isWarmedUp)
//   }

//   const changePaintingFunc = () => {
//     const paintingObj = data?.option?.painting;
//     setIsPainting(isPainting => !isPainting)
//   }

//   const selectedColorFunc = (e) => {
//     const selectedColor = JSON.parse(e.target.value);
//     setCurrentColor(selectedColor);
//   }

//   // console.log('currentType',currentType);
//   // console.log('currentGoods',currentGoods);
//   // console.log('sizeWidthMirrors',sizeWidthMirrors);
//   // console.log('sizeHeightMirrors',sizeHeightMirrors);
//   // console.log('currentFrame',currentFrame);
//   // console.log('currentBackLight',currentBackLight);
//   // console.log('currentSwitch',currentSwitch);
//   // console.log('currentCord',currentCord);
//   // console.log('isWarmedUp',isWarmedUp);
//   // console.log('isPainting',isPainting);
//   // console.log('currentColor',currentColor);
//   console.log('totalSum',totalSum);

//   return (
//     <div className="wrap_item mirrors_item">
//       <div className="choose_item item_mirrors">
//       <h3>Форма скла:</h3>
//         <select
//           onChange={selectTypeFunc}
//           value={currentType ? JSON.stringify(currentType) : ""}
//         >
//           <option value="" disabled>
//             Оберіть форму
//           </option>
//           {data?.type &&
//             data.type.map((item) => (
//               <option key={item.name} value={JSON.stringify(item)}>
//                 {item.name}
//               </option>
//             ))}
//         </select>
//       </div>

      
//           <div className="choose_item item_mirrors">
//           <h3>Тип:</h3>
//             <select
//               onChange={selectGoodsFunc}
//               value={currentGoods ? JSON.stringify(currentGoods) : ""}
//             >
//               <option value="" disabled>
//                 Оберіть тип
//               </option>
//               {currentTypeArray &&
//                 currentTypeArray.map((item) => (
//                   <option key={item.name} value={JSON.stringify(item)}>
//                     {item.name}
//                   </option>
//                 ))}
//             </select>
//             </div>

//             <div className="choose_item item_mirrors">
//             <h3>Розмір скла (см)</h3>
//             <div class=" input_miroor">
//               <input class=" input_miroor_item cabel" type="number" value={sizeWidthMirrors} onChange={(e) => setSizeWidthMirrors(e.target.value)}/>
//               <input class="input_miroor_item  cabel" type="number" value={sizeHeightMirrors} onChange={(e) => setSizeHeightMirrors(e.target.value)}/>
//             </div>
//             </div>
      

      
//         <div className="choose_item item_mirrors">         
//         <h3>Виберіть рамку:</h3>
//         <select
//           onChange={selectFrameFunc}
//           value={currentFrame ? JSON.stringify(currentFrame) : ""}
//         >
//           <option value="" disabled>
//             Оберіть Рамку
//           </option>
//           {data?.option?.frame &&
//             data.option.frame.map((item) => (
//               <option key={item.name} value={JSON.stringify(item)}>
//                 {item.name}
//               </option>
//             ))}
//         </select>
//         </div>

//         <div className="choose_item item_mirrors">
//             <h3>Вкажіть розмір рамки</h3>
//             <div>
//               <input class="input_miroor cabel" type="number" value={sizeFrame} onChange={(e) => setSizeFrame(e.target.value)}/>
//             </div>
//             </div>
      
//         <div className="choose_item item_mirrors">
//         <h3>Виберіть підсвітку:</h3>
//         <select
//           onChange={selectBackLightFunc}
//           value={currentBackLight ? JSON.stringify(currentBackLight) : ""}
//         >
//           <option value="" disabled>
//             Оберіть підсвітку
//           </option>
//           {data?.option?.backLight &&
//             data.option.backLight.map((item) => (
//               <option key={item.name} value={JSON.stringify(item)}>
//                 {item.name}
//               </option>
//             ))}
//         </select>
//         </div>
      

      
//         <div className="choose_item item_mirrors">
//         <h3>Виберіть вимикач:</h3>
//         <select
//           onChange={selectSwitchFunc}
//           value={currentSwitch ? JSON.stringify(currentSwitch) : ""}
//         >
//           <option value="" disabled>
//             Оберіть вимикач
//           </option>
//           {data?.option?.switch &&
//             data.option.switch.map((item) => (
//               <option key={item.name} value={JSON.stringify(item)}>
//                 {item.name}
//               </option>
//             ))}
//         </select>
//         </div>
      

//       <div className="choose_item item_mirrors">
//       <h3>Довжину кабелю (м):</h3>
//         <input className="cabel" placeholder="Довжина кабелю" value={currentCord} onChange={(e) => changeCord(e)}/>
//       </div>

//       <div className="choose_item item_mirrors check-item">
//         <h3>Підігрів:</h3>
//         <div className="checkbox_wrap">
//         <input id="checkbox1" className="checkbox" type='checkbox' checked={isWarmedUp} onChange={changeWarmUpFunc}/>
//         <label className="checkbox-label" htmlFor="checkbox1"></label>
//         </div>
//       </div>

//       <div className="choose_item item_mirrors check-item">
//         <h3>Покраска:</h3>
//         <div className="checkbox_wrap">
//         <input id="checkbox2"  className="checkbox" type='checkbox' checked={isPainting} onChange={changePaintingFunc}/>
//         <label className="checkbox-label" htmlFor="checkbox2"></label>
//         </div>
//       </div>

      
//         <div className="choose_item item_mirrors">
//         <h3>Виберіть колір:</h3>
//         <select
//           onChange={selectedColorFunc}
//           value={currentColor ? JSON.stringify(currentColor) : ""}
//         >
//           <option value="" disabled>
//             Оберіть колір
//           </option>
//           {isPainting && data?.option?.color &&
//             data.option.color.map((item) => (
//               <option key={item.name} value={JSON.stringify(item)}>
//                 {item.name}
//               </option>
//             ))}
//         </select>
//         </div>

//         <div className="footer_calc">
//             <div className="mirror_sum">
//               <div>
//                 <button className="mirror_buttom" onClick={calcTotalSum}>Підрахувати вартість</button>
//               </div>
//               <h3 className="order_sum mirror_sum">Кінцева вартість: <span> {totalSum} грн</span> </h3>
//             </div>
//             <div className="send_order mirror_button">
//             {/* <CSVLink className="mirror_button_exel " data={keyCsv} filename = { "date.csv" } separator={";"} >Друк</CSVLink> */}
//             {/* <ExelPrint className="mirror_button_exel"></ExelPrint> */}
//             <PDFDownloadLink className="mirror_button_exel" document={<PdfFile order={finishMirrorPdf}/>} fileName="orderDate">
//              {({loading,error})=> (loading? "завантаження..." : "Зберегти" )}
//             </PDFDownloadLink>
//             <button className="mirror_button_order" >Оформити</button>
//             </div>
//         </div> 
//     </div>
//   );
// };

// export default StandartMirrors;




Font.register({
    family: "Roboto",
    src:
      "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf"
  });

const styles = StyleSheet.create({
    body:{
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        fontFamily : "Roboto"

    },
    tittle:{
        fontSize: 24,
        textAlign: 'center',

    },
    text:{
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
    },
    image:{
        marginVertical: 15,
        marginHorizontal: 100
    },
    header:{
        fontSize: 12,
        // marginBottom: 20,
        textAlign: "center",
        color: "grey"
    },
    section: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        // flexGrow: 1,
      }
});

const PdfFile = () => {
    return (
        <Document>
            <Page style={styles.body}>
                <Image style={styles.image} src={Logo}/>
                <Text style={styles.header}>
                +38 (067) 320 60 23
                skloexpert.ua@gmail.com
                Адреса нашого офісу: 46000, м. Тернопіль, вул. Текстильна, 42 ПН-ПТ: 09:00-18:00
                </Text>
                <Text style={styles.header}>
                skloexpert.ua@gmail.com
                </Text>
                <Text style={styles.header}>
                Адреса нашого офісу: 46000, м. Тернопіль, вул. Текстильна, 42 ПН-ПТ: 09:00-18:00
                </Text>
                <View style={styles.section}>
                    <Text style={styles.text}>
                        Назва
                    </Text>
                    <Text style={styles.text}>
                        Комплектація
                    </Text>
                    <Text style={styles.text}>
                        Кількість
                    </Text>
                    <Text style={styles.text}>
                        Ціна
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>
                        Кругле дзеркало з підсвіткою 1м Х 1м
                    </Text>
                    <Text style={styles.text}>
                        без вимикача
                    </Text>
                    <Text style={styles.text}>
                        1
                    </Text>
                    <Text style={styles.text}>
                        2400 грн
                    </Text>
                </View>
                <Text style={styles.text}>

                </Text>
                <Text style={styles.text}>
                    Замовлення
                </Text>
            </Page>
        </Document>
    );
};

export default PdfFile;