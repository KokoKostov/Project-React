import styles from './styles/layout.css'

import * as drawService from './services/drawService'
import { Routes, Route } from 'react-router-dom'
import { Drawings } from './components/DrawingsCatalog/DrawingsCatalog'
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Canvas } from './components/Canvas/Canvas';
import { ErrorPage } from './components/404/ErrorPage';
import { useEffect, useState } from 'react';



function App() {
    
const [drawings,setDrawings]= useState([])

useEffect(()=>{     
  drawService.getAll()
    .then(result =>{
        setDrawings(result)     
    });
   
},[])
    return (
        <>
            <div id="homepage">
                <Header />
                <Routes>
                    <Route path = '*' element = {<ErrorPage/>}/>
                    <Route path ='/' element= { <Home/> }/>
                    <Route path='/drawings' element={<Drawings  drawings={drawings}/>}/>
                    <Route path = '/login' element = {<Login/>}/>
                    <Route path = '/register' element = {<Register/>}/>
                    <Route path = '/canvas' element = {<Canvas/>}
                    />
                </Routes>
               
                <Footer />
            </div>
           
        </>
    );
}

export default App;
