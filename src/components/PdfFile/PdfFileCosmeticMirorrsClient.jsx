import React from 'react';
import {Font, View, Page, Image, Text, Document, StyleSheet, Link } from '@react-pdf/renderer';
import Logo from '../../img/logo.png';
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

const PdfFileMirorrsClient = ({order}) => {

    
        const type = `${order.type}` /* форма дзеркала */
        const width = `${order.width}` /* ширина дзеркала */
        const height = `${order.height}` /* висота дзеркала */
        const lightPrice = `${order.lightPrice}` /* рамка ціна */
        const lightValue =  `${order.lightValue}` /* рамка розмір */
        const lightName = `${order.lightName}` /* рамка назва */
        const patronValue = `${order.patronValue}` /* перемикач назва */
        const patronName = `${order.patronName}` /* перемикач назва */
        const patronPrice = `${order.patronPrice}` /* перемикач ціна */
        const adress = `${order.adress}` /* адреса доставки */
        const deliveryPriceOverSity = `${order.deliveryPriceOverSity}` /* ціна доставки за містом */
        const deliveryPriceOver = `${order.deliveryPriceOver}` /* ціна доставки по місту */
        const firstName = `${order.firstName}`
        const lastName = `${order.lastName}`
        const surname = `${order.surname}`
        const numberPhone = `${order.numberPhone}`
        const orderComent = `${order.orderComent}`
        const selectedProcessingName  = `${order.selectedProcessingName}`
        const selectedProcessingPrice = `${order.selectedProcessingPrice}`
        const selectedProcessingCount = `${order.selectedProcessingCount}`
        const total = `${order.total}`

        const deliverPrice = {
            deliveryPriceOverSity: deliveryPriceOverSity,
            deliveryPriceOver: deliveryPriceOver
          }

        const fileFinish = {
            light:{
                price: lightPrice,
                size: lightValue,
                name: lightName,

            },
            patron:{
                price: patronPrice,
                size: patronValue,
                name: patronName,

            },
            processing:{
                name: selectedProcessingName,
                size: selectedProcessingCount,
                price: selectedProcessingPrice,
            },
          };
             

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
                </View>
                    <View style={styles.section} >
                        <Text style={styles.textLeft}>
                           {type}
                           
                        </Text>
                        <Text style={styles.text}>
                            {width} х {height} мм2 
                        </Text>
                    </View>
                                 
                                
                    <View>
                        {Object.entries(fileFinish).filter(([_, value]) => value.name !== '').map(([key, value], idx) => (
                            <View style={styles.section} key={idx}>
                                <Text style={styles.textLeft}>
                                    {value.name}
                                </Text>
                                <Text style={styles.text}>
                                    {value.size} шт
                                </Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.section} >
                        <Text style={styles.text}> 
                        </Text>
                        <Text style={styles.text}>
                             
                        </Text>
                        <Text style={styles.textSum}>
                            Ціна {total} грн
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

export default PdfFileMirorrsClient;