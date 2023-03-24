import styles from './styles/layout.css'
import {Service} from './components/Service'
import { Header } from './components/Header';
import { Footer } from './components/Footer';
function App() {
  return (
    <>
    <div id="homepage">
      <Header/>   
      <Service/>
      
      </div>
      <Footer/>
    </>
  );
}

export default App;
