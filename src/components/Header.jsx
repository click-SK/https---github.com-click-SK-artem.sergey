import React from 'react';
import '../style/header.scss'
import {BsFillGearFill, BsFillPersonFill} from 'react-icons/bs';
import {GiExitDoor} from 'react-icons/gi';
import { useNavigate } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate();
    const admin = localStorage.getItem('isManager') === 'true';
    const clearStoregeIsManager = () => {
        localStorage.setItem('isManager',false)
        navigate('/')
    }
    return (
        <div className='header-wrap'>
            {!admin
            ?
        <div className='navigation-block'>
            <a className='navigatin-item' href='/'>Душові</a>
            <a className='navigatin-item' href='/client-standart-mirrors'> Дзеркала</a>
            <a className='navigatin-item' href='/client-cosmetic-mirrors'>Дзеркала косметичні</a>
            <a className='navigatin-item' href='/client-glass-partition'>Перегородки</a>
            <a className='navigatin-item' href='/client-dashki'>Дашки</a>
            <a className='navigatin-item' href='/login-manager'><BsFillPersonFill style={{cursor:'pointer',width:'auto', height:'45px'}}/> </a>
        </div>
            :
            <div className='navigation-block'>
                <a className='navigatin-item' href='manager-shower'>Душові кабіни</a>
                <a className='navigatin-item' href='/manager-mirrors'>Дзеркала</a>
                <a className='navigatin-item' href='/manager-glass-partition'>Скляні перегородки</a>
                <a className='navigatin-item' href='/manager-dashki'>Дашки</a>
                <a className='navigatin-item' href='/edit'><BsFillGearFill className='gears'/> </a>
                <GiExitDoor onClick={clearStoregeIsManager} style={{cursor:'pointer',width:'auto', height:'45px'}}/>
            </div>
            }
        </div>
    );
};

export default Header;