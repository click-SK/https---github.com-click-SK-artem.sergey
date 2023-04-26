import React from 'react';
import { CSVLink } from "react-csv";
import '../style/exelButton.scss'


const ExelPrint = () => {

    const logoImg = '/logo.png';
    // <img className='logo_img' src='/logo.png' alt="My Image" />

    const keyCsv = [
        // [ `${<img className='logo_img' style={{width:'20px', height: '20px'}} src='/logo.png' alt="My Image" />}`]
        [ "Магазин", "Дзеркала" ],
        [ "Назва", "Модифікація", "Ціна" ],
        [ 'Форма скла', , "" ],
        [ 'Тип дзеркала', 'Дзеркало з фоновою підсвідкою', "4700 грн\м2" ],
        [ 'Розмір', 'В: 1м, Ш:1 ', "4700 грн" ],
        [ 'Рамка', 'Металева рамка буквою П', "900 грн" ]
      ];


    return (
        <div>
            <CSVLink className="mirror_button_exel " data={keyCsv} filename = { "date.csv" } separator={";"} >Друк</CSVLink>
        </div>
    );
};

export default ExelPrint;