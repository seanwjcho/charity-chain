
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




const [connected, toggleConnect] = useState(false);
const [currAddress, updateAddress] = useState('0x');


const connectToMetamask = async () => {
  console.log("clicked");
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


function Navbar() {

    return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
      
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Charity Chain 
          </Typography>

          <Button color="inherit" href = "/" sx={{ flexGrow: 1 }} >Marketplace</Button>
          <Button color="inherit" href = "/sellNFT" sx={{ flexGrow: 1 }}>Sell NFTs</Button>
          
          {connected ? 
                <Box>
                <Button color="inherit" href = "/Profile">My NFTs</Button>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                  Connected: {currAddress}
                </Typography>
                </Box>
                : 
                <Button onClick = {connectToMetamask}>"Click To Connect" </Button>
          }

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>

    );
  }

  export default Navbar;
 

