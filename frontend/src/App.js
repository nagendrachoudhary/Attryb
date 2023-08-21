import logo from './logo.svg';
import './App.css';
import { Navbar } from './Componant/Navbar';
import { Login } from './Componant/Login';
import { Route, Routes } from 'react-router-dom';
import { Singup } from './Componant/Singup';
import { Home } from './Componant/Home';

function App() {
  return (
    <div className="App">
    <Navbar/>
    <Routes>
      <Route path='/' element ={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Register' element ={<Singup/>}/>
    </Routes>
    </div>
  );
}

export default App;
