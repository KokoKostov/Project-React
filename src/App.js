import styles from './styles/layout.css'
import {Service} from './components/Service'
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Content } from './components/Content';
function App() {
  return (
    <>
    <div id="homepage">
      <Header/>  
      <Content/> 
      <Service/>
      
      </div>
      <Footer/>
    </>
  );
}

export default App;
