import './App.css'
import { Outlet } from 'react-router'

function App() {

  return (
    <>
      <header><h1>LOGOTYP</h1><nav>lol ol ol ol ol</nav><p>cart</p></header>
      <Outlet />
      <footer>balbalbalbalabb</footer>
    </>
  )
}

export default App
