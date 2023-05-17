import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import NFT from './components/NFT';
import Upload from './components/Upload';
import Home from './components/Home'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/marketplace" element={<Marketplace/>}/>
        <Route path="/upload" element={<Upload />}/>
        <Route path="/nft/:tokenId" element={<NFT />}/>        
        <Route path="/profile" element={<Profile />}/> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

