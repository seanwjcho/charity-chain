import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import CCMarketplaceJSON from "../CCMarketplace.json";
import { useState } from "react";
//import { GetIpfsUrlFromPinata } from "../utils";
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Box from '@mui/material/Box';

export default function Upload() {

const [data, updateData] = useState([]);



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
        </center>
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
                label="Required"
                defaultValue="NFT contract address"
                />
                <TextField
                required
                id="nft-address"
                label="Required"
                defaultValue="NFT contract address"
                />
            </div>
            <div>
                <TextField
                error
                id="filled-error"
                label="Error"
                defaultValue="Hello World"
                variant="filled"
                />
                <TextField
                error
                id="filled-error-helper-text"
                label="Error"
                defaultValue="Hello World"
                helperText="Incorrect entry."
                variant="filled"
                />
            </div>
            <div>
                <TextField
                error
                id="standard-error"
                label="Error"
                defaultValue="Hello World"
                variant="standard"
                />
                <TextField
                error
                id="standard-error-helper-text"
                label="Error"
                defaultValue="Hello World"
                helperText="Incorrect entry."
                variant="standard"
                />
            </div>
            </Box>       
    </div>
);

}