import React from 'react';
import {Font, View, Page, Image, Text, Document, StyleSheet } from '@react-pdf/renderer';
import Logo from '../img/logo.png';
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
    const arr = [1,2,3,4,5]
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
                    {arr.map((item)=>(
                        <Text style={styles.text}>
                        {item}
                        </Text>
                    ))}
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