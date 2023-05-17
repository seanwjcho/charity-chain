
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


function Navbar() {

  const [connected, toggleConnect] = useState(false);

  const connectToMetamask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        toggleConnect(true);
      } catch (error) {
        console.log(error);
      }
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setSelectedAddress(accounts[0]);
    const signer = provider.getSigner();
    console.log("got signer");



  }





    return (
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
              <li>
                <button onClick = {connectToMetamask} className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">{connected? "Connected": "Click To Connect"}</button>
              </li>
            </ul>
          </li>
          </ul>
        </nav>
      </div>
    );
  }

  export default Navbar;