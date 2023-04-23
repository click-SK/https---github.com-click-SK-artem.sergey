import React from 'react';
import '../style/header.scss'
const Header = () => {
    return (
        <div className='header-wrap'>
            <div className='navigation-block'>
                <a className='navigatin-item' href='/'>Душові кабіни</a>
                <a className='navigatin-item' href='/mirrors'>Дзеркала</a>
                <a className='navigatin-item' href='/admin'>Адмінкка</a>
            </div>
        </div>
    );
};

export default Header;