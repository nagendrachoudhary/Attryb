import logo from './logo.svg';
import './App.css';
import { Navbar } from './Componant/Navbar';
import { Login } from './Componant/Login';
import { Route, Routes } from 'react-router-dom';
import { Singup } from './Componant/Singup';
import { Home } from './Componant/Home';
import AddCars from './Componant/AddCars';
import { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import { Box, Loader } from '@mantine/core';

function App() {
  const {user}= useContext(AuthContext)
  const [loader,setloader]= useState(true)
  setTimeout(() => {
    setloader(false)
  }, 2000);
  return (
    <Box w={'100%'} h={'100%'} className="App">
    <Navbar/>
    {loader?<Box display={'flex'} w={'100%'} h={'100%'} style={{alignItems:'center',justifyContent:'center'}} m={'auto'} ><Loader color="red" variant="dots" /></Box>:
    <Routes>
      <Route path='/' element ={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Register' element ={<Singup/>}/>
      <Route path='/addcar' element={user?<AddCars/>:<Login/>}/>
    </Routes>}
    </Box>
  );
}

export default App;
