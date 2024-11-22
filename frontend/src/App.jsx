import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import './app.css'
import Nav from './components/Nav/Index'
import Account from './components/Account/Index'
import LoginForm from './components/LoginForm/Index'
import RegisterForm from './components/RegisterForm/Index'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
       <div className=''>
         <RegisterForm />
       </div>
       <main>

       </main>
    </div>
  
  )
}

export default App
