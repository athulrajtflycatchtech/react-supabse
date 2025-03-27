import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Pages/Home';
import Create from './Pages/Create';
import Update from './Pages/Update';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <nav>
        <h1>Supa Smoothies</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Create New Smoothies</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/:id' element={<Update/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
