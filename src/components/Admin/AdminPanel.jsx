import React from 'react';
import '../../style/admin.scss'

const AdminPanel = () => {
    return (
        <div className='admin_rout'>
            <h1>Категорії</h1>
            <div>
                <a href='/admin-showers'>Душові кабіни</a>
                <a href='/admin-mirrors'>Дзеркала</a>
                <a href='/admin-cosmetic-mirrors'>Косметичні дзеркала</a>
                <a href='/admin-showers-client'>Душ кабіни для клієнта</a>
                <a href='/admin-dashki'>Дашки</a>
                <a href='/admin-glass-partition'>Скляні перегородки</a>
            </div>
        </div>
    );
};

export default AdminPanel;