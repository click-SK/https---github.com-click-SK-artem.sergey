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

{/* <View style={styles.section}>
{arr.map((item, idx)=>(
    <Text style={styles.text} key={idx}>
    {item.type}
    </Text>
))}
</View> */}

const PdfFileMirorrsClient = ({order}) => {

    
        const type = `${order.type}` /* форма дзеркала */
        const goodsPrice = `${order.goodsPrice}` /* ціна дзеркала */
        const goodsName = `${order.goodsName}` /* тип дзеркала */
        const width = `${order.width}` /* ширина дзеркала */
        const height = `${order.height}` /* висота дзеркала */
        const framePrice = `${order.framePrice}` /* рамка ціна */
        const frameSize =  `${order.frameSize}` /* рамка розмір */
        const frameName = `${order.frameName}` /* рамка назва */
        const switchCat = `${order.switchCat}` /* перемикач назва */
        const switchName = `${order.switchName}` /* перемикач назва */
        const switchPrice = `${order.switchPrice}` /* перемикач ціна */
        const backLightAdd = `${order.backLightAdd}` /* підсвітка назва */
        const backLightName = `${order.backLightName}` /* підсвітка назва */
        const backLightPrice = `${order.backLightPrice}` /* підсвітка ціна */
        const cord = `${order.cord}` /* довжина кабелю */
        const cordPrice = `${order.cordPrice}` /* ціна кабелю */
        const cordName = `${order.cordName}` /* ціна кабелю */
        const warmerUp = `${order.warmerUp}` /* підігрів */
        const warmerUpPrice = `${order.warmerUpPrice}` /* підігрів */
        const painting = `${order.painting}` /* покраска рамки */
        const paintingPrice = `${order.paintingPrice}` /* покраска рамки */
        const colorName = `${order.colorName}` /* колір покраски */
        const colorFrame = `${order.colorFrame}` /* колір покраски */
        const colorPrice = `${order.colorPrice}` /* Ціна кольору */
        const adress = `${order.adress}` /* адреса доставки */
        const deliveryPriceOverSity = `${order.deliveryPriceOverSity}` /* ціна доставки за містом */
        const deliveryPriceOver = `${order.deliveryPriceOver}` /* ціна доставки по місту */
        const firstName = `${order.firstName}`
        const lastName = `${order.lastName}`
        const surname = `${order.surname}`
        const numberPhone = `${order.numberPhone}`
        const orderComent = `${order.orderComent}`
        const minInstallation = `${order.minInstallation}`
        const minInstallationName = `${order.minInstallationName}`
        const minInstallationOption = `${order.minInstallationOption}`
        const isAssemblingt = `${order.isAssemblingt}`
        const isAssemblingtName = `${order.isAssemblingtName}`
        const isAssemblingOption = `${order.isAssemblingOption}`
        const selectedProcessingName  = `${order.selectedProcessingName}`
        const selectedProcessingPrice = `${order.selectedProcessingPrice}`
        const selectedProcessingCount = `${order.selectedProcessingCount}`
        const total = `${order.total}`

        const deliverPrice = {
            deliveryPriceOverSity: deliveryPriceOverSity,
            deliveryPriceOver: deliveryPriceOver
          }

        const fileFinish = {
            frame:{
                price: framePrice,
                size: frameSize,
                name: frameName,

            },
            frameColor:{
                name: colorFrame,
                size: colorName,
                price: colorPrice
            },
            switch:{
                name: switchCat,
                size: switchName,
                price: switchPrice,
            },
            backLight:{
                name: backLightAdd,
                size: backLightName,
                price: backLightPrice,
            },
            cord:{
                name: cordName,
                size: cord,
                price: cordPrice,
            },
            minInstall:{
                name: minInstallationName,
                size: minInstallationOption,
                price: minInstallation,
            },
            install:{
                name: isAssemblingtName,
                size: isAssemblingOption,
                price: isAssemblingt,
            },
            processing:{
                name: selectedProcessingName,
                size: selectedProcessingCount,
                price: selectedProcessingPrice,
            },
          };

    // const fileFinishArr = [
    //     `${order.framePrice}`, /* рамка ціна */
    //     `${order.frameSize}`, /* рамка розмір */
    //     `${order.frameName}` ,/* рамка назва */
    //     `${order.switchName}`, /* перемикач назва */
    //     `${order.switchPrice}` ,/* перемикач ціна */
    //     `${order.backLightName}`, /* підсвітка назва */
    //     `${order.backLightPrice}` ,/* підсвітка ціна */
    //     `${order.cord}`, /* довжина кабелю */
    //     `${order.cordPrice}`, /* ціна кабелю */
    //     `${order.warmerUp}`, /* підігрів */
    //     `${order.painting}`, /* покраска рамки */
    //     `${order.colorName}`, /* колір покраски */
    //     `${order.colorPrice}`, /* Ціна кольору */
    //     `${order.adress}`, /* адреса доставки */
    //     `${order.deliveryPriceOverSity}`, /* ціна доставки за містом */
    //     `${order.deliveryPriceOver}`, /* ціна доставки по місту */
    //     `${order.firstName}`,
    //     `${order.lastName}`,
    //     `${order.surname}`,
    //     `${order.numberPhone}`,
    //     `${order.orderComent}`,
    //     `${order.total}`
    // ];

    // const pdfArr =[]

    // fileFinishArr.forEach((item) => {
    //     if (item !== '') {
    //       pdfArr.push(item);
    //     }
    //   });
             

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
                           {goodsName} {'  '}
                           Форма: {type}
                        </Text>
                        <Text style={styles.text}>
                            {width} х {height} см2 
                        </Text>
                    </View>
                    <View style={styles.section} >
                        <Text style={styles.textLeft}> 
                            Підігрів: 
                        </Text>
                        <Text style={styles.text}>
                            {warmerUp}
                        </Text>
                    </View>                
                    <View style={styles.section} >
                        <Text style={styles.textLeft}> 
                            Покраска: 
                        </Text>
                        <Text style={styles.text}>
                            {painting}
                        </Text>
                    </View>                
                    <View>
                        {Object.values(fileFinish).map((value, idx) => (
                            // Перевіряємо чи значення не є пустими рядками
                            // Якщо умова true, то виводимо дані
                            // Значення, що не є пустими, може бути числом, рядком або булевим значенням
                            // Тому не можна використовувати value.name !== ''
                            // Оскільки у числа і булеві значення також можуть бути значеннями, які не є порожніми рядками
                            (typeof value === 'string' && value !== '') && (
                                <View style={styles.section} key={idx}>
                                    <Text style={styles.textLeft}>
                                        {value.name}
                                    </Text>
                                    <Text style={styles.text}>
                                        {value.size} 
                                    </Text>
                                </View>
                            )
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