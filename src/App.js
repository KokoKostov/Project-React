import styles from './styles/layout.css'
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




function App() {
    const navigate = useNavigate()
    const [drawings, setDrawings] = useState([])
    const [auth, setAuth] = useState([])
    const authorization = authService(auth.token)
    const drawService = drawServiceFactory(auth.token)
    useEffect(() => {
        drawService.getAll()
            .then(result => {
                
                setDrawings(result)
            });         
    }, [])

    const onLoginSubmit = async (data) => {
        try {
            console.log(data);
            const result = await authorization.login(data);
            
            setAuth(result);
            console.log(auth);
            navigate('/');
        } catch (error) {

            console.log(error);
        }
    };
    const onRegisterSubmit = async (value) => {

        console.log(value);
        const { repassword, ...registerData } = value;
        if (repassword !== registerData.password) {
            return;
        }

        try {
            
            const result = await authorization.register(registerData);

            setAuth(result);

            navigate('/');
        
        } catch (error) {
            console.log(error);
        }
    };
    const context={
        onLoginSubmit,
        onRegisterSubmit,
        drawings,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken
    }
    console.log(auth);
    return (
 <>
        <AuthContext.Provider value={context}>
            <div id="homepage">
                
                <Header />
                <Routes>
                    <Route path='*' element={<ErrorPage />} />
                    <Route path='/' element={<Home />} />
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
