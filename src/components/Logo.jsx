import React from 'react';

const Logo = () => {
    return (
    <div className='logo'>
        <div className='logo_wrap' style={{cursor:'pointer'}}>
        <a href='https://skloexpert.com.ua/'>
        <img className='logo_img' src='/logo.png' alt="My Image"/>
        </a>
        <div className='info'>
          <p> +38 (067) 320 60 23 </p>
          <p> skloexpert.ua@gmail.com </p>
          <p> Адреса нашого офісу: 46000, м. Тернопіль, вул. Текстильна, 42 ПН-ПТ: 09:00-18:00 </p>
        </div>
        </div>
    </div>
    );
};

export default Logo;