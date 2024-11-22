import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import './app.css'
import Nav from './components/Nav/Index';
import ImageGrid from './components/ImageGrid/index'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      
      <Nav />
      <ImageGrid />
    </div>
  
  )
}

export default App
