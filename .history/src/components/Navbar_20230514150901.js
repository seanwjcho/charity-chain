
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import {ethers} from "ethers";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';


const pages = ['Home', 'Marketplace', 'List NFTs'];
const settings = ['Your NFTs', 'Logout'];


function Navbar() {

  const [connected, toggleConnect] = useState(false);
  const [currAddress, updateAddress] = useState('0x');

  const connectToMetamask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.log(error);
      }
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("got signer");
    const address = await signer.getAddress();
    updateAddress(address);
    toggleConnect(true);
    console.log("connected")
  }





    return (

      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
      
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Charity Chain 
          </Typography>

          <Button color="inherit" href = "/">Login</Button>
          <Button color="inherit" href = "/sellNFT">Login</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>

      
      <div className="">
        <nav className="w-screen">
          <ul className='flex items-end justify-between py-3 bg-transparent text-white pr-5'>
          <li className='flex items-end ml-5 pb-2'>
            <Link to="/">
            <div className='inline-block font-bold text-xl ml-2'>
              NFT Marketplace
            </div>
            </Link>
          </li>
          <li className='w-2/6'>
            <ul className='lg:flex justify-between font-bold mr-10 text-lg'>
              {location.pathname === "/" ? 
              <li className='border-b-2 hover:pb-0 p-2'>
                <Link to="/">Marketplace</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0 p-2'>
                <Link to="/">Marketplace</Link>
              </li>              
              }
              {location.pathname === "/sellNFT" ? 
              <li className='border-b-2 hover:pb-0 p-2'>
                <Link to="/sellNFT">List My NFT</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0 p-2'>
                <Link to="/sellNFT">List My NFT</Link>
              </li>              
              }              
              {location.pathname === "/profile" ? 
              <li className='border-b-2 hover:pb-0 p-2'>
                <Link to="/profile">Profile</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0 p-2'>
                <Link to="/profile">Profile</Link>
              </li>              
              } 
              { connected ? 
                <li>"Connected:" {currAddress}  </li> :
                <button onClick = {connectToMetamask} className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">{"Click To Connect"}</button>
              }
             
              
            </ul>
          </li>
          </ul>
        </nav>
      </div>
    );
  }

  export default ResponsiveAppBar;