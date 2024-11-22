import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import './app.css'
<<<<<<< HEAD
import Nav from './components/Nav/Index';
import ImageGrid from './components/ImageGrid/index'
=======
import Nav from './components/Nav/Index'
import Account from './components/Account/Index'
import LoginForm from './components/LoginForm/Index'
import RegisterForm from './components/RegisterForm/Index'
>>>>>>> dd25f21a85e91fc64acdf385eb0395725ecdfc67

function App() {
  const [count, setCount] = useState(0)

  return (
<<<<<<< HEAD
    <div className="App">
      
      <Nav />
      <ImageGrid />
=======
    <div>
       <div className=''>
         <RegisterForm />
       </div>
       <main>

       </main>
>>>>>>> dd25f21a85e91fc64acdf385eb0395725ecdfc67
    </div>
  
  )
}

export default App
