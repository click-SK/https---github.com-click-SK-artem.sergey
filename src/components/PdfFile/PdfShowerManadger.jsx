import React from 'react';
import {Font, View, Page, Image, Text, Document, StyleSheet, Link } from '@react-pdf/renderer';
import Logo from '../../img/logo.png';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';



Font.register({
    family: "Roboto",
    src:
      "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf"
  });

const styles = StyleSheet?.create({
    body:{
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        fontFamily : "Roboto",
        borderWidth: 1,
        borderColor: '#eee'
    },
    tittle:{
        fontSize: "14px",
        textAlign: 'center',
        marginTop:'20px'
    },
    text:{
        margin: 6,
        fontSize: "8px",
        textAlign: 'center',
        flex: '1'
    },
    textFur:{
        margin: 6,
        fontSize: "8px",
        textAlign: 'center',
        flex: '1'
    },
    textLeft:{
        margin: 6,
        fontSize: "8px",
        textAlign: 'left',
        flex: '1'
    },
    textInfo:{
        margin: 4,
        fontSize: "8px",
        textAlign: 'left',
        flex: '1'
    },
    textSum:{
        margin: 8,
        borderBottomWidth: 1,
        fontSize: "10px",
        textAlign: 'right',
        flex: '1'
    },
    Hedertext:{
        margin: 12,
        fontSize: "10px",
        textAlign: 'center',
        flex: 1
    },
    image:{
        marginVertical: 5,
        position: 'absolute',
        left: 20,
        top: 10,
        width: '234px',
        height: '64px'
    },
    imgGoods:{
        width: '100px',
        height: '100px'
    },
    header:{
        fontSize: '8px',
        textAlign: 'right',
        color: "grey",
        marginTop: 8
    },
    section: {
        marginBottom: '2px',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        display: 'flex',
        alignContent: 'stretch',
        alignItems: 'center',
        width:'100%', 
        height: 'auto'
      },
    sectionDeliv: {
        marginTop: '5px',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        display: 'flex',
        alignContent: 'stretch',
        alignItems: 'center',
        width:'100%', 
        height: 'auto'
      },
    tableHeder:{
        marginTop: '10px',
        marginBottom: '5px',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        display: 'flex',
        alignContent: 'stretch',
        alignItems: 'center',
        width:'100%'
    },

});

const PdfShowerManadger = ({order, cart, img, glassProcessingCountArr, glassProcessingArr}) => {

    
        const type = `${order?.type}` /* форма дзеркала */
        const goodsPrice = `${order?.goodsPrice}` /* ціна дзеркала */
        const width = `${order?.width}` /* ширина дзеркала */
        const height = `${order?.height}` /* висота дзеркала */
        const depth = Number(order?.depth) /* глубина */
        const adress = `${order?.adress}` /* адреса доставки */
        const glass = `${order?.glass}` /* адреса доставки */
        const glassColorName = `${order?.glassColorName}` /* адреса доставки */
        const glassColorPrice = `${order?.glassColorPrice}` /* адреса доставки */
        const dovodCoutName = `${order?.dovodCoutName}`
        const dovodCoutPrice = `${order?.dovodCoutPrice}`
        const dovodCoutCount = `${order?.dovodCoutCount}`
        const zakladName = `${order?.zakladName}`
        const zakladPrice = `${order?.zakladPrice}`
        const zakladCount = `${order?.zakladCount}`
        const montajePrice = `${order?.montajePrice}`
        const montajeName = `${order?.montajeName}`
        const montajeValue = `${order?.montajeValue}`
        const furniture = order?.cart;
        const currentProcessingStandartName = `${order?.currentProcessingStandartName}` /* адреса доставки */
        const currentProcessingStandartVal = `${order?.currentProcessingStandartVal}` /* адреса доставки */
        const currentProcessingStandartPrice = `${order?.currentProcessingStandartPrice}` /* адреса доставки */
        const currentProcessingСutoutName = `${order?.currentProcessingСutoutName}` /* адреса доставки */
        const currentProcessingСutoutPrice = `${order?.currentProcessingСutoutPrice}` /* адреса доставки */
        const currentProcessingСutoutCount = `${order?.currentProcessingСutoutCount}` /* адреса доставки */
        const deliveryPriceOverSity = `${order?.deliveryPriceOverSity}` /* ціна доставки за містом */
        const deliveryPriceOver = `${order?.deliveryPriceOver}` /* ціна доставки по місту */
        const firstName = `${order?.firstName}`
        const lastName = `${order?.lastName}`
        const surname = `${order?.surname}`
        const numberPhone = `${order?.numberPhone}`
        const orderComent = `${order?.orderComent}`
        const minInstallation = `${order?.minInstallation}`
        const minInstallationName = `${order?.minInstallationName}`
        const minInstallationOption = `${order?.minInstallationOption}`
        const isAssemblingt = `${order?.isAssemblingt}`
        const isAssemblingtName = `${order?.isAssemblingtName}`
        const isAssemblingOption = `${order?.isAssemblingOption}`
        const selectedProcessingName  = `${order?.selectedProcessingName}`
        const selectedProcessingPrice = `${order?.selectedProcessingPrice}`
        const selectedProcessingCount = `${order?.selectedProcessingCount}`
        const additionalAssemblingValue = `${order?.additionalAssemblingValue}`
        const additionalAssemblingName = `${order?.additionalAssemblingName}`
        const additionalAssemblingPrice = `${order?.additionalAssemblingPrice}`
        const total = `${order?.total}`

        const deliverPrice = {
            deliveryPriceOverSity: deliveryPriceOverSity,
            deliveryPriceOver: deliveryPriceOver
        }

        const resDepth = (depth ? ` X ${depth}` : '')

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
          furnitureFinObj[index] = `${item.name2} ${item.tittleName}                        ${item?.name3}                     Колір:  ${item.colorsFurniture} -  ${item.count} шт.                         ${item.colorsFurniturePrice * item.count } грн`   
        });

        let result = JSON.stringify(furnitureFinArr);


        const fileFinish = {
            isAssemblingt:{
                price: goodsPrice,
                name: isAssemblingtName,
            },
            dditionalAssembling:{
                price: additionalAssemblingPrice,
                size: additionalAssemblingValue,
                name: additionalAssemblingName
            },

          };

          glassProcessingCountArr.forEach((item, index) => {
            const processingKey = `processing${index + 1}`;
          
            fileFinish[processingKey] = {
              price: item.price,
              size: item.count,
              name: item.name,
              _id: item._id
            };
          });

          glassProcessingArr.forEach((item, index) => {
            const processingGlassKey = `processingGlass${index + 1}`;
          
            fileFinish[processingGlassKey] = {
              price: item.price,
              size: item.count,
              name: item.name,
              _id: item._id
            };
          });



    return (
        <Document>
            <Page style={styles.body}>
                <Image style={styles.image} src={Logo}/>
                <Text style={styles.header}>
                +38 (067) 320 60 23
                </Text>
                <Text style={styles.header}>
                skloexpert.ua@gmail.com
                </Text>
                <Text style={styles.header}>
                Адреса нашого офісу: 46000, м. Тернопіль, вул. Текстильна, 42 ПН-ПТ: 09:00-18:00
                </Text>
                <Link style={styles.header} src="http://skloexpert.com.ua/">
                http:/skloexpert.com.ua/
                </Link>
                <Text style={styles.tittle}>
                    Замовлення
                </Text>
                <View style={styles.tableHeder}>
                    <Text style={styles.Hedertext}>
                        Назва
                    </Text>
                    <Text style={styles.Hedertext}>
                        Розмір / Тип
                    </Text>
                    <Text style={styles.Hedertext}>
                        Ціна
                    </Text>
                </View>
                    <View style={styles.section} >
                        <Image style={styles.imgGoods} src={img}/>
                        <Text style={styles.textLeft}>
                           {type}  {glassColorName}
                        </Text>
                        <Text style={styles.text}>
                            {width} х {height}{resDepth} 
                        </Text>
                        <Text style={styles.text}>
                            
                        </Text>
                    </View>               

                    <View>
                        {Object.entries(fileFinish).filter(([_, value]) => value.name !== '').map(([key, value], idx) => (
                            <View style={styles.section} key={idx}>
                                <Text style={styles.textLeft}>
                                    {value.name}
                                </Text>
                                <Text style={styles.text}>
                                    {value.size} 
                                </Text>
                                <Text style={styles.text}>
                                    {value.price} грн
                                </Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.tableHeder}>
                                <Text style={styles.Hedertext}>
                                    Фурнітура
                                </Text>
                    </View>
                    <View>
                        {Object.entries(furnitureFinObj).filter(([_, value]) => value.name !== '').map(([key, value], idx) => (
                            <View style={styles.section} key={idx}>
                                <Text style={styles.textFur}>
                                    {value}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section} >
                        <Text style={styles.text}> 
                        </Text>
                        <Text style={styles.textSum}>
                            Загальна сума 
                        </Text>
                        <Text style={styles.textSum}>
                            {total} грн
                        </Text>
                    </View> 
                    <View style={styles.tableHeder}>
                    <Text style={styles.Hedertext}>
                        Інформація замовника:
                    </Text>
                </View>             
                    <View style={styles.sectionDeliv} >
                        <Text style={styles.textInfo}> 
                            П.І.Б. 
                        </Text>
                        <Text style={styles.textInfo}> 
                            {firstName} {lastName} {surname}
                        </Text>
                        <Text style={styles.textInfo}> 
                        </Text>
                    </View>
                    
                    <View style={styles.sectionDeliv} >
                        <Text style={styles.textInfo}> 
                            Телефон:
                        </Text>
                        <Text style={styles.textInfo}> 
                            {numberPhone}
                        </Text>
                        <Text style={styles.textInfo}> 
                        </Text>
                        
                    </View>
                    <View style={styles.sectionDeliv} >
                        <Text style={styles.textInfo}> 
                            Адреса доставки:
                        </Text>
                        <Text style={styles.textInfo}> 
                            {adress}
                        </Text>
                        <Text style={styles.textInfo}> 
                        </Text>
                    </View>
                    <View style={styles.section} >
                        <Text style={styles.textInfo}> 
                        </Text>
                        <Text style={styles.textInfo}> 
                            Ціна доставки:
                        </Text>
                        <Text style={styles.textInfo}> 
                        {Object.entries(deliverPrice).filter(([_, value]) => value !== '').map(([key, value], idx) => (
                            <Text style={styles.text} key={idx}>
                            {value} грн
                            </Text>
                        ))}
                        </Text>
                    </View> 
                    <View style={styles.sectionDeliv} >
                        <Text style={styles.textInfo}> 
                            Коментар замовлення:
                        </Text>
                        <Text style={styles.textInfo}>
                        </Text>
                        <Text style={styles.textInfo}>
                        </Text>
                    </View>
                    <View style={styles.section} >
                        <Text style={styles.textInfo}> 
                            {orderComent}
                        </Text>
                    </View> 
            </Page>
        </Document>
    );
};

export default PdfShowerManadger;