import React from 'react';
import '../../style/admin.scss'

const AdminPanel = () => {
    return (
        <div className='admin_rout'>
            <h1>Менеджер</h1>
            <div>
                <a href='/admin-showers'>Душові кабіни</a>
                <a href='/admin-mirrors'>Дзеркала</a>
                <a href='/admin-cosmetic-mirrors'>Косметичні дзеркала</a>
                <a href='/admin-dashki'>Дашки</a>
                <a href='/admin-glass-partition'>Скляні перегородки</a>
            </div>
            <h1>Клієнт</h1>
            <div>
                <a href='/edit-client-showers'>Душові кабіни</a>
                <a href='/edit-client-standart-mirror'>Дзеркала</a>
                <a href='/edit-client-cosmetic-mirror'>Косметичні дзеркала</a>
                <a href='/edit-client-dashki'>Дашки</a>
                <a href='/edit-client-glass-partition'>Скляні перегородки</a>
            </div>
        </div>
    );
};

export default AdminPanel;