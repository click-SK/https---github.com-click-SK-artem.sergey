
import './App.css';
import Header from './components/Header';
import ShowerCabin from './components/ShowerCabin.jsx';
import Mirrors from './components/Mirrors';
import GlassPartition from './components/GlassPartition';
import Dashki from './components/Dashki';
import AdminPanel from './components/Admin/AdminPanel';
import Login from './components/Admin/Login';
import LoginManager from './components/Admin/LoginManager';
import EditStandartMirrors from './components/Admin/Mirrors/EditStandartMirrors';
import EditShower from './components/Admin/Shower/EditShower';
import EditGlassPartition from './components/Admin/GlassPartition/EditGlassPartition';
import EditDashki from './components/Admin/Dashki/EditDashki';
import EditCosmeticMirrors from './components/Admin/Mirrors/EditCosmeticMirrors';
import EditShowerClient from './components/Admin/EditClient/EditShowerClient';
import ClientShower from './components/Client/ClientShower';
import ClientStandartMirrors from './components/Client/ClientStandartMirrors';
import ClientCosmeticMirrors from './components/Client/ClientCosmeticMirrors';
import ClientGlassPartition from './components/Client/ClientGlassPartition';
import ClientDashki from './components/Client/ClientDashki';
import EditClientDashki from './components/Admin/EditClient/EditClientDashki';
import EditClientStandartMirror from './components/Admin/EditClient/EditClientStandartMirror';
import EditClientCosmeticMirror from './components/Admin/EditClient/EditClientCosmeticMirror';
import EditClientGlassPartition from './components/Admin/EditClient/EditClientGlassPartition';
import Logo from './components/Logo';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <div className='color_ref'> 
        <p className='prime'></p>
        <p className='second'></p>
        <p className='disab'></p>
        <p className='back'></p>
        <p className='tittle'></p>
      </div> */}
      <Logo/>
      <Header/>
      <Routes>
        <Route path='/' element={<ClientShower/>}/>
        <Route path='/client-standart-mirrors' element={<ClientStandartMirrors/>}/>
        <Route path='/client-cosmetic-mirrors' element={<ClientCosmeticMirrors/>}/>
        <Route path='/client-glass-partition' element={<ClientGlassPartition/>}/>
        <Route path='/client-dashki' element={<ClientDashki/>}/>
        <Route path='/manager-shower' element={<ShowerCabin/>}/>
        <Route path='/manager-mirrors' element={<Mirrors/>}/>
        <Route path='/manager-glass-partition' element={<GlassPartition/>}/>
        <Route path='/manager-dashki' element={<Dashki/>}/>
        <Route path='/edit' element={<Login/>}/>
        <Route path='/login-manager' element={<LoginManager/>}/>
        <Route path='/edit/admin' element={<AdminPanel/>}/>
        <Route path='/admin-mirrors' element={<EditStandartMirrors/>}/>
        <Route path='/admin-showers' element={<EditShower/>}/>
        <Route path='/edit-client-showers' element={<EditShowerClient/>}/>
        <Route path='/admin-dashki' element={<EditDashki/>}/>
        <Route path='/admin-glass-partition' element={<EditGlassPartition/>}/>
        <Route path='/admin-cosmetic-mirrors' element={<EditCosmeticMirrors/>}/>
        <Route path='/edit-client-dashki' element={<EditClientDashki/>}/>
        <Route path='/edit-client-standart-mirror' element={<EditClientStandartMirror/>}/>
        <Route path='/edit-client-cosmetic-mirror' element={<EditClientCosmeticMirror/>}/>
        <Route path='/edit-client-glass-partition' element={<EditClientGlassPartition/>}/>
      </Routes>
        

    </div>
  );
}

export default App;
