import './App.css';
import Navbar from './components/Navbar.js';
import Marketplace from './components/Marketplace';
import Home from './components/Home';
import Profile from './components/Profile';
import NFT from './components/NFT';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="container">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/" element={<Marketplace />}/>
          <Route path="/nft" element={<NFT />}/>        
          <Route path="/profile" element={<Profile />}/>           
        </Routes>
    </div>
  );
}

export default App;