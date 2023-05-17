import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import CCMarketplaceJSON from "../CCMarketplace.json";
import { useState } from "react";
//import { GetIpfsUrlFromPinata } from "../utils";
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function Upload() {

const [nftAddress, setNftAddress] = useState('');
const [tokenId, setTokenId] = useState('');
const [charityId, setCharityId] = useState('');
const [price, setPrice] = useState(0);

const handleNftAddressChange = (event) => {
    setNftAddress(event.target.value);
}

const handleTokenIdChange = (event) => {
    setTokenId(event.target.value);
}

const handleCharityIdChange = (event) => {
    setCharityId(event.target.value);
}

const handlePriceChange = (event) => {
    setPrice(event.target.value);
}

const handleSubmit = () => {
    console.log('NFT Address:', nftAddress);
    console.log('Token ID:', tokenId);
    console.log('Charity ID:', charityId);
    console.log('Listing Price:', price);
    listNFT();

}

async function listNFT() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(CCMarketplaceJSON.address, CCMarketplaceJSON.abi, signer);
    
    const etherPrice = ethers.utils.parseUnits(price, 'ether');
    console.log("calling createListedToken")
    let transaction = await contract.createListedToken(nftAddress, tokenId, charityId, etherPrice);
    await transaction.wait();
    console.log("successfully called createListedToken");




}


async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(CCMarketplaceJSON.address, CCMarketplaceJSON.abi, signer)
    //create an NFT Token
    let transaction = await contract.getAllNFTs()

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(transaction.map(async i => {
        var tokenURI = await contract.tokenURI(i.tokenId);
        //tokenURI = GetIpfsUrlFromPinata(tokenURI);
        tokenURI = 0;
        //let meta = await axios.get(tokenURI);
        //meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            charity: i.charityId,
            owner: i.owner,
            //image: meta.image,
            //name: meta.name,
            //description: meta.description,
        }
        return item;
    }))

    updateFetched(true);
    updateData(items);
}

//if(!dataFetched)
    //getAllNFTs();


return (
    <div>
        <Navbar></Navbar>
        <br/>
        <br/>
        <br/>
        <center>
            <Typography color = "red" variant="h3">
                List NFTs for sale!
            </Typography>
            <br/>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <div>
                    <TextField
                    required
                    id="nft-address"
                    label="NFT Contract Address"
                    value={nftAddress}
                    onChange={handleNftAddressChange}
                    />
                    <TextField
                    required
                    id="nft-id"
                    label="NFT Token ID"
                    value={tokenId}
                    onChange={handleTokenIdChange}
                    />
                </div>
                <div>
                    <TextField
                    required
                    id="charity-id"
                    label="Charity ID"
                    value={charityId}
                    onChange={handleCharityIdChange}
                    />
                    <TextField
                    required
                    id="price"
                    label="Desired Listing Price (in ETH)"
                    value={price}
                    onChange={handlePriceChange}
                    />
                </div>
                </Box>  
                <br/>
                <Button sx = {{bgcolor: "red"}} variant="contained" onClick={handleSubmit} type="submit">Submit</Button>     
            </center>
    </div>
);

}