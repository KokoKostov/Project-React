// import styles from '../public/styles/styles.css'

import 'bootstrap/dist/css/bootstrap.min.css';
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
import { DrawingEdit } from './components/DrawingEdit/DrawingEdit'
import { DrawingDetails } from './components/DrawingDetails/DrawingDetails'







function App() {
    const navigate = useNavigate()
    const [drawings, setDrawings] = useState([])
    
    // const [,setCurrentError]= useState('')
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
        try{

            await authorization.logout()

            setAuth({});
        }catch(error){
            alert(error)
            console.log(error);
        }
          
    }

    const onDrawingSubmit = async (data)=>{
        
        
        try{
         
       const drawings = await drawService.create(data)
        setDrawings((state)=>[...state,drawings]);
        navigate('/')
          
    
    
      
           
        }catch(error){
            alert(error)
            console.log(error);
        }
    }

    const onLoginSubmit = async (data) => {
        try {
            
            const result = await authorization.login(data);
            setAuth(result);
            navigate('/')
        }catch(error){
            alert(error.message)
            // setCurrentError(error.message)
            console.log(error);
            
        }
    };
    const onRegisterSubmit = async (value) => {

       
        const { repassword, ...registerData } = value;
        

        try {
            if (repassword !== registerData.password) {
                alert("Password and Repassword dont match!")
                return
            }
            const result = await authorization.register(registerData);

                setAuth(result)

            navigate('/');
        
        } catch (error) {
            alert(error.message)
            // setCurrentError(error)
            console.log(error);
        }
    };

    const onDeleteConfirm=(id)=>{
        try{

            setDrawings(state => state.filter(drawing => drawing._id !== id));
            
            
            navigate('/drawings')
        }
        catch(error){
            alert(error.message)
            navigate('/drawings')
        }
    }
    const onDrawingEditSubmit = async (values) => {
        try{
            const result = await drawService.edit(values._id, values);

    
            setDrawings(state => state.map(x => x._id === values._id ? result : x))
    
            navigate(`/drawings/${values._id}`);
        }catch(error){
            alert (error.message)
        }
    };



    const contextAuth={
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        
        onDrawingSubmit,
        onDeleteConfirm,
        onDrawingEditSubmit,
        
        drawings,
        authorization,
        drawService,
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
                    <Route path='/' element={<Home drawings = {drawings} />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/drawings' element={<Drawings/>} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/Canvas' element={<Canvas />}/>
                    <Route path='/drawings/:drawingId' element={<DrawingDetails />}/>
                    <Route path='/drawings/:drawingId/edit' element={<DrawingEdit />}/>
                    
                    
                </Routes>

                <Footer />
            </div>
            </AuthContext.Provider >
            </>
    );
}

export default App;
