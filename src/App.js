import styles from './styles/layout.css'
import { Routes, Route } from 'react-router-dom'
import { Drawings } from './components/Drawings'
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
function App() {
    return (
        <>
            <div id="homepage">
                <Header />
                <Routes>
                    <Route path = '*' element = {<h1>404</h1>}/>
                    <Route path ='/' element= { <Home/> }/>
                    <Route path='/drawings' element={<Drawings />}/>
                    <Route path = '/login' element = {<Login/>}/>
                    <Route path = '/Register' element = {<Register/>}/>
                    
                </Routes>
               
                <Footer />
            </div>
           
        </>
    );
}

export default App;
