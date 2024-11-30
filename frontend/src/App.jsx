import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter,RouterProvider } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import viteLogo from '/vite.svg'
import './index.css'
import './app.css'
import Nav from './components/Nav/Index';
import Account from './components/Account/Index'
import LoginForm from './components/LoginForm/Index'
import RegisterForm from './components/RegisterForm/Index'
import ImageGrid from './components/ImageGrid/Index'

const MainLayout = ({children }) => {
  return (
    <div>
      <Nav/>
      {children }
    </div>
  );
};
const Layout = () =>{
  return(
    <div>
      {children}
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="./components/Account" element={<MainLayout><Account /></MainLayout>} />

      </Routes>
    </Router>

     
  )
}
export default App
