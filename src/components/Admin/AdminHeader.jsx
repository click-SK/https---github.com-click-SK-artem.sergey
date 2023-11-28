import React from 'react';
import '../../style/admin.scss'

const AdminHeader = () => {
    return (
        <div className='admin_rout'>
            <div>
                <a href='/admin-showers'>Душові кабіни</a>
                <a href='/admin-mirrors'>Дзеркала</a>
                <a href='/admin-cosmetic-mirrors'>Косметичні дзеркала</a>
                <a href='/admin-dashki'>Дашки</a>
                <a href='/admin-glass-partition'>Скляні перегородки</a>
            </div>
        </div>
    );
};

export default AdminHeader;