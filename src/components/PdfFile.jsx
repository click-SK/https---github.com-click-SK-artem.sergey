import React from 'react';
import {Font, View, Page, Image, Text, Document, StyleSheet, Link } from '@react-pdf/renderer';
import Logo from '../img/logo.png';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
// import Roboto from '../fonts/roboto/Roboto-Regular.ttf'

// Font.registerHyphenationCallback(word => [word]);



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
        marginHorizontal: 100
    },
    header:{
        fontSize: 12,
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
        width:'100%'
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
    {item}
    </Text>
))}
</View> */}

const PdfFile = () => {
    const arr = [1,2,3,4,5]
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
                        Кількість
                    </Text>
                    <Text style={styles.Hedertext}>
                        Ціна
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>
                        Дзеркало "Стандарт" з фоновою підсвіткою
                        1х1м
                    </Text>
                    <Text style={styles.text}>
                        1 шт
                    </Text>
                    <Text style={styles.text}>
                        4200 грн
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>
                        Металева рамка
                    </Text>
                    <Text style={styles.text}>
                        4 м
                    </Text>
                    <Text style={styles.text}>
                        1200 грн
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>
                        Фронтальна підсвітка
                    </Text>
                    <Text style={styles.text}>
                        
                    </Text>
                    <Text style={styles.text}>
                        1200 грн
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>
                        Сенсорний вимикач
                    </Text>
                    <Text style={styles.text}>
                        1шт
                    </Text>
                    <Text style={styles.text}>
                        550 грн
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>
                        Кабель підключення + вилка
                    </Text>
                    <Text style={styles.text}>
                        3м
                    </Text>
                    <Text style={styles.text}>
                        130 грн
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>
                        Підігрів
                    </Text>
                    <Text style={styles.text}>
                        Так
                    </Text>
                    <Text style={styles.text}>
                        1000 грн
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>
                        Покраска 
                    </Text>
                    <Text style={styles.text}>
                        Ні
                    </Text>
                    <Text style={styles.text}>
                        
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>
                        
                    </Text>
                    <Text style={styles.text}>
                        Заальна вартість
                    </Text>
                    <Text style={styles.text}>
                        8280 грн
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default PdfFile;