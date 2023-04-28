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

const PdfFile = ({order}) => {


    const type = `${order.type}`
    const goodsPrice = `${order.goodsPrice}`
    const goodsName = `${order.goodsName}`
    const width = `${order.width}`
    const height = `${order.height}`
    const framePrice = `${order.framePrice}`
    const frameSize = `${order.frameSize}`
    const frameName = `${order.frameName}`
    const switchName = `${order.switchName}`
    const switchPrice = `${order.switchPrice}`
    const cord = `${order.cord}`
    const warmerUp = `${order.warmerUp}`
    const painting = `${order.painting}`
    const colorName = `${order.colorName}`
    const colorPrice = `${order.colorPrice}`
    const total = `${order.total}`

    const pdfPrint = [
        {
        type:`${order.type}`,
        name:goodsName,
        price:goodsPrice,
        }
    ];

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
                        Одиниця
                    </Text>
                    <Text style={styles.Hedertext}>
                        Ціна
                    </Text>
                </View>
                     <View style={styles.section} >
                        <Text style={styles.text}>
                            {type} {goodsName}
                        </Text>
                        <Text style={styles.text}>
                            {width} X {height} см2
                        </Text>
                        <Text style={styles.text}>
                            {goodsPrice} грн
                        </Text>
                     </View>                
                     <View style={styles.section} >
                        <Text style={styles.text}>
                            {frameName}
                        </Text>
                        <Text style={styles.text}>
                            {frameSize} м
                        </Text>
                        <Text style={styles.text}>
                            {framePrice} грн
                        </Text>
                     </View>                
                     <View style={styles.section} >
                        <Text style={styles.text}>
                            {switchName}
                        </Text>
                        <Text style={styles.text}>
                            
                        </Text>
                        <Text style={styles.text}>
                            {switchPrice} грн
                        </Text>
                     </View>                
                     <View style={styles.section} >
                        <Text style={styles.text}>
                            Кабель
                        </Text>
                        <Text style={styles.text}>
                            {cord} м
                        </Text>
                        <Text style={styles.text}>
                            Ціна кабель грн
                        </Text>
                     </View>                
                     <View style={styles.section} >
                        <Text style={styles.text}>
                            Підігів
                        </Text>
                        <Text style={styles.text}>
                            {warmerUp}
                        </Text>
                        <Text style={styles.text}>
                            Ціна грн
                        </Text>
                     </View>                                
                     <View style={styles.section} >
                        <Text style={styles.text}>
                            Покраска
                        </Text>
                        <Text style={styles.text}>
                            {painting}
                        </Text>
                        <Text style={styles.text}>
                            {colorPrice }грн
                        </Text>
                     </View>                
                     <View style={styles.section} >
                        <Text style={styles.text}>
                            Колір покраски "{colorName}"
                        </Text>
                        <Text style={styles.text}>
                        </Text>
                        <Text style={styles.text}>
                            {colorPrice }грн
                        </Text>
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

export default PdfFile;