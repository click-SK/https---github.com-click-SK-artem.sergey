
import './App.css';
import Header from './components/Header';
import ShowerCabin from './components/ShowerCabin.jsx';
import Mirrors from './components/Mirrors';
import GlassPartition from './components/GlassPartition';
import Dashki from './components/Dashki';
import AdminPanel from './components/Admin/AdminPanel';
import EditStandartMirrors from './components/Admin/Mirrors/EditStandartMirrors';
import EditShower from './components/Admin/Shower/EditShower';
import EditGlassPartition from './components/Admin/GlassPartition/EditGlassPartition';
import EditDashki from './components/Admin/Dashki/EditDashki';
import EditCosmeticMirrors from './components/Admin/Mirrors/EditCosmeticMirrors';
import EditShowerClient from './components/Admin/ShowerClient/EditShowerClient';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className='color_ref'> 
        <p className='prime'></p>
        <p className='second'></p>
        <p className='disab'></p>
        <p className='back'></p>
        <p className='tittle'></p>
      </div>
      <div className='logo'>
        <div className='logo_wrap'>
        <img className='logo_img' src='/logo.png' alt="My Image" />
        <div className='info'>
          <p> +38 (067) 320 60 23 </p>
          <p> skloexpert.ua@gmail.com </p>
          <p> Адреса нашого офісу: 46000, м. Тернопіль, вул. Текстильна, 42 ПН-ПТ: 09:00-18:00 </p>
        </div>
        </div>
      </div>
      <Header/>
      <Routes>
        <Route path='/' element={<ShowerCabin/>}/>
        <Route path='/mirrors' element={<Mirrors/>}/>
        <Route path='/glass-partition' element={<GlassPartition/>}/>
        <Route path='/dashki' element={<Dashki/>}/>
        <Route path='/admin' element={<AdminPanel/>}/>
        <Route path='/admin-mirrors' element={<EditStandartMirrors/>}/>
        <Route path='/admin-showers' element={<EditShower/>}/>
        <Route path='/admin-showers-client' element={<EditShowerClient/>}/>
        <Route path='/admin-dashki' element={<EditDashki/>}/>
        <Route path='/admin-glass-partition' element={<EditGlassPartition/>}/>
        <Route path='/admin-cosmetic-mirrors' element={<EditCosmeticMirrors/>}/>
      </Routes>
        

    </div>
  );
}

export default App;
