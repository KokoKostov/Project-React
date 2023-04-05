import styles from './styles/layout.css'
import { useLocalStorage } from './hooks/useLocalStorage'
import { authService } from './services/authService'
import { AuthContext } from './context/AuthContext'
import {drawServiceFactory} from './services/drawServiceFactory'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Drawings } from './components/DrawingsCatalog/DrawingsCatalog'
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Canvas } from './components/Canvas/Canvas';
import { ErrorPage } from './components/404/ErrorPage';
import { useEffect, useState } from 'react';
import { Logout } from './components/Logout/Logout'





function App() {
    const navigate = useNavigate()
    const [drawings, setDrawings] = useState([])
    const [auth, setAuth] = useLocalStorage('auth', {});
    const authorization = authService(auth.accessToken)
    const drawService = drawServiceFactory(auth.accessToken)
    useEffect(() => {
        drawService.getAll()
            .then(result => {
                
                setDrawings(result)
            });         
    }, [])
    const onLogout = async()=>{
            await authorization.logout()

            setAuth({});
          
    }

    const onLoginSubmit = async (data) => {
        try {
            
            const result = await authorization.login(data);
            
            setAuth(result);
          
            navigate('/');
        } catch (error) {

            console.log(error);
        }
    };
    const onRegisterSubmit = async (value) => {

       
        const { repassword, ...registerData } = value;
        if (repassword !== registerData.password) {
            return;
        }

        try {
            
            const result = await authorization.register(registerData);

            setAuth([]);

            navigate('/');
        
        } catch (error) {
            console.log(error);
        }
    };
    const contextAuth={
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        drawings,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken
    }
   

   
    return (
 <>
        <AuthContext.Provider value={contextAuth}>
            <div id="homepage">
                
                <Header />
                <Routes>
                    <Route path='*' element={<ErrorPage />} />
                    <Route path='/' element={<Home />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/drawings' element={<Drawings/>} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/canvas' element={<Canvas />}
                    />
                </Routes>

                <Footer />
            </div>
            </AuthContext.Provider >
            </>
    );
}

export default App;
