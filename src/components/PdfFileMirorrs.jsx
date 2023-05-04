import React from 'react';
import {Font, View, Page, Image, Text, Document, StyleSheet, Link } from '@react-pdf/renderer';
import Logo from '../img/logo.png';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';


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
        marginTop:'20px'
    },
    text:{
        margin: 12,
        fontSize: 14,
        textAlign: 'center',
        flex: '1'
    },
    Hedertext:{
        margin: 12,
        fontSize: 14,
        textAlign: 'center',
        flex: 1
    },
    image:{
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header:{
        fontSize: 10,
        textAlign: 'right',
        color: "grey"
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

{/* <View style={styles.section}>
{arr.map((item, idx)=>(
    <Text style={styles.text} key={idx}>
    {item.type}
    </Text>
))}
</View> */}

const PdfFileMirorrs = ({order}) => {

    
        const type = `${order.type}` /* форма дзеркала */
        const goodsPrice = `${order.goodsPrice}` /* ціна дзеркала */
        const goodsName = `${order.goodsName}` /* тип дзеркала */
        const width = `${order.width}` /* ширина дзеркала */
        const height = `${order.height}` /* висота дзеркала */
        const framePrice = `${order.framePrice}` /* рамка ціна */
        const frameSize =  `${order.frameSize}` /* рамка розмір */
        const frameName = `${order.frameName}` /* рамка назва */
        const switchName = `${order.switchName}` /* перемикач назва */
        const switchPrice = `${order.switchPrice}` /* перемикач ціна */
        const backLightName = `${order.backLightName}` /* підсвітка назва */
        const backLightPrice = `${order.backLightPrice}` /* підсвітка ціна */
        const cord = `${order.cord}` /* довжина кабелю */
        const cordPrice = `${order.cordPrice}` /* ціна кабелю */
        const warmerUp = `${order.warmerUp}` /* підігрів */
        const painting = `${order.painting}` /* покраска рамки */
        const colorName = `${order.colorName}` /* колір покраски */
        const colorPrice = `${order.colorPrice}` /* Ціна кольору */
        const adress = `${order.adress}` /* адреса доставки */
        const deliveryPriceOverSity = `${order.deliveryPriceOverSity}` /* ціна доставки за містом */
        const deliveryPriceOver = `${order.deliveryPriceOver}` /* ціна доставки по місту */
        const firstName = `${order.firstName}`
        const lastName = `${order.lastName}`
        const surname = `${order.surname}`
        const numberPhone = `${order.numberPhone}`
        const orderComent = `${order.orderComent}`
        const total = `${order.total}`

        const fileFinish = {
            frame:{
                price: framePrice,
                size: frameSize,
                name: frameName,

            },
            frameColor:{
                name: colorName,
                price: colorPrice
            },
            switch:{
                name: switchName,
                price: switchPrice,
            },
            backLight:{
                name: backLightName,
                price: backLightPrice,
            },
          };

    const fileFinishArr = [
        `${order.framePrice}`, /* рамка ціна */
        `${order.frameSize}`, /* рамка розмір */
        `${order.frameName}` ,/* рамка назва */
        `${order.switchName}`, /* перемикач назва */
        `${order.switchPrice}` ,/* перемикач ціна */
        `${order.backLightName}`, /* підсвітка назва */
        `${order.backLightPrice}` ,/* підсвітка ціна */
        `${order.cord}`, /* довжина кабелю */
        `${order.cordPrice}`, /* ціна кабелю */
        `${order.warmerUp}`, /* підігрів */
        `${order.painting}`, /* покраска рамки */
        `${order.colorName}`, /* колір покраски */
        `${order.colorPrice}`, /* Ціна кольору */
        `${order.adress}`, /* адреса доставки */
        `${order.deliveryPriceOverSity}`, /* ціна доставки за містом */
        `${order.deliveryPriceOver}`, /* ціна доставки по місту */
        `${order.firstName}`,
        `${order.lastName}`,
        `${order.surname}`,
        `${order.numberPhone}`,
        `${order.orderComent}`,
        `${order.total}`
    ];

    const pdfArr =[]

    fileFinishArr.forEach((item) => {
        if (item !== '') {
          pdfArr.push(item);
        }
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
                        Розмір
                    </Text>
                    <Text style={styles.Hedertext}>
                        Ціна
                    </Text>
                </View>
                    <View style={styles.section} >
                        <Text style={styles.text}>
                           {goodsName} {'  '}
                           Форма: {type}
                        </Text>
                        <Text style={styles.text}>
                            {width} {height} см2 
                        </Text>
                        <Text style={styles.text}>
                            {goodsPrice} грн
                        </Text>
                    </View>
                    <View style={styles.section} >
                        <Text style={styles.text}> 
                            Підігрів: 
                        </Text>
                        <Text style={styles.text}>
                            {warmerUp}
                        </Text>
                        <Text style={styles.text}>
                            {total} грн
                        </Text>
                    </View>                
                    <View style={styles.section} >
                        <Text style={styles.text}> 
                            Покраска: 
                        </Text>
                        <Text style={styles.text}>
                            {painting}
                        </Text>
                        <Text style={styles.text}>
                            {total} грн
                        </Text>
                    </View>                
                    <View>
                        {/* {Object.entries(fileFinish).filter(([_, value]) => value).map(([key, value], idx) => (
                            <View style={styles.section}>
                                <Text style={styles.text} key={idx}>
                                    {value.name}
                                </Text>
                                <Text style={styles.text} key={idx}>
                                    {value.size}
                                </Text>
                                <Text style={styles.text} key={idx}>
                                    {value.price}
                                </Text>
                            </View>
                        ))} */}
                        {Object.entries(fileFinish).filter(([_, value]) => value.name !== '').map(([key, value], idx) => (
                            <View style={styles.section}>
                                <Text style={styles.text} key={idx}>
                                    {value.name}
                                </Text>
                                <Text style={styles.text} key={idx}>
                                    {value.size} 
                                </Text>
                                <Text style={styles.text} key={idx}>
                                    {value.price} грн
                                </Text>
                            </View>
                        ))}
                    </View>  
              
                    <View style={styles.section} >
                        <Text style={styles.text}> 
                        </Text>
                        <Text style={styles.text}>
                            Загальна сума 
                        </Text>
                        <Text style={styles.text}>
                            {total} грн
                        </Text>
                    </View>              
            </Page>
        </Document>
    );
};

export default PdfFileMirorrs;