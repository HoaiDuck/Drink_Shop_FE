import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav/Index'; 
import Account from './components/Account/Index'; 
import Home from './components/Home/Index';
import LoginForm from './components/LoginForm/Index'; 
import RegisterForm from './components/RegisterForm/Index'; 
import ImageGrid from './components/ImageGrid/Index'; 
import './index.css'; 
import './app.css';



const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Nav />}></Route>

        <Route path="Account" element={<Account />} />
          
        <Route path="Home" element={<Home />} />

      </Routes>
      
    </Router>
  );
};

export default App;
