
import './App.css';
import Header from './components/Header';
import ShowerCabin from './components/ShowerCabin.jsx';
import Mirrors from './components/Mirrors';
import AdminPanel from './components/AdminPanel';
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
        <img className='logo_img' src='/logo.png' alt="My Image" />
        <div className='info'>
          <p> +38 (067) 320 60 23 </p>
          <p> skloexpert.ua@gmail.com </p>
          <p> Адреса нашого офісу: 46000, м. Тернопіль, вул. Текстильна, 42 ПН-ПТ: 09:00-18:00 </p>
        </div>
      </div>
      <Header/>
      <Routes>
        <Route path='/' element={<ShowerCabin/>}/>
        <Route path='/mirrors' element={<Mirrors />}/>
        <Route path='/admin' element={<AdminPanel />}/>
      </Routes>
        

    </div>
  );
}

export default App;
