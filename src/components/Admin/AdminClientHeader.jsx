import React from 'react';
import '../../style/admin.scss'

const AdminClientHeader = () => {
    return (
        <div className='admin_rout'>
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

export default AdminClientHeader;