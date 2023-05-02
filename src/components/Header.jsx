import React from 'react';
import '../style/header.scss'
import {BsFillGearFill} from 'react-icons/bs';

const Header = () => {
    return (
        <div className='header-wrap'>
            <div className='navigation-block'>
                <a className='navigatin-item' href='/'>Душові кабіни</a>
                <a className='navigatin-item' href='/mirrors'>Дзеркала</a>
                <a className='navigatin-item' href='/glass-partition'>Скляні перегородки</a>
                <a className='navigatin-item' href='/dashki'>Дашки</a>
                <a className='navigatin-item' href='/admin'><BsFillGearFill className='gears'/> </a>
            </div>
        </div>
    );
};

export default Header;