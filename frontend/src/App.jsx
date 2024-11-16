import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import './app.css'
import Nav from './components/Nav/Index'
import Account from './components/Account/Index'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
       <div className=''>
         <Account />
       </div>
       <main>

       </main>
    </div>
  
  )
}

export default App
