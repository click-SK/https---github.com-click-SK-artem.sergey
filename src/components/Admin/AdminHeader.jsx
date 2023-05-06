import React from 'react';
import '../../style/admin.scss'

const AdminHeader = () => {
    return (
        <div className='admin_rout'>
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

export default AdminHeader;