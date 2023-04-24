
import './App.css';
import Header from './components/Header';
import ShowerCabin from './components/ShowerCabin.jsx';
import Mirrors from './components/Mirrors';
import AdminPanel from './components/AdminPanel';
import {Routes, Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
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
