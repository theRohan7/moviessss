import { useState } from 'react'
import './App.css'
import Searchbar from './Components/Searchbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <h1>Search Moovies</h1>
      <Searchbar />

    </main>
  )
}

export default App
