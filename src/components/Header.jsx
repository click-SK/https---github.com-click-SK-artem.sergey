import React from 'react';
import '../style/header.scss'
import {BsFillGearFill} from 'react-icons/bs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <div className='header-wrap'>
            <div className='navigation-block'>
                <a className='navigatin-item' href='/'>Душові кабіни</a>
                <a className='navigatin-item' href='/mirrors'>Дзеркала</a>
                <a className='navigatin-item' href='/admin'><BsFillGearFill className='gears'/> </a>
            </div>
        </div>
    );
};

export default Header;