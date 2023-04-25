
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
