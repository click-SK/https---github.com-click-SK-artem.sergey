import React from 'react';
import '../../style/admin.scss'

const AdminPanel = () => {
    return (
        <div className='admin_rout'>
            <h1>Категорії</h1>
            <div>
                <a href='/admin-mirrors'>Mirrors</a>
                <a href='/admin-cosmetic-mirrors'>Cosmetic mirrors</a>
                <a href='/admin-showers'>Shower</a>
                <a href='/admin-showers-client'>Shower Client</a>
                <a href='/admin-dashki'>Dashki</a>
                <a href='/admin-glass-partition'>Glass Partition</a>
            </div>
        </div>
    );
};

export default AdminPanel;