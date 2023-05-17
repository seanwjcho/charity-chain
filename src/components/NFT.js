import Navbar from "./Navbar";
import { useLocation, useParams } from 'react-router-dom';
import CCMarketplaceJSON from "../CCMarketplace.json";
import { useState } from "react";
//import { GetIpfsUrlFromPinata } from "../utils";

export default function NFT (props) {

const [data, updateData] = useState({});
const [dataFetched, updateDataFetched] = useState(false);
const [message, updateMessage] = useState("");
const [currAddress, updateCurrAddress] = useState("0x");

async function getNFTData(tokenId) {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(CCMarketplaceJSON.address, CCMarketplaceJSON.abi, signer)
    //create an NFT Token
    var tokenURI = await contract.tokenURI(tokenId);
    const listedToken = await contract.getListedTokenForId(tokenId);
    //tokenURI = GetIpfsUrlFromPinata(tokenURI);
    tokenURI = 0;
    //let meta = await axios.get(tokenURI);
    //meta = meta.data;
    console.log(listedToken);

    let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        charity: i.charityId,
        owner: i.owner,
        //image: meta.image,
        //name: meta.name,
        //description: meta.description,
    }
    console.log(item);
    updateData(item);
    updateDataFetched(true);
    console.log("address", addr)
    updateCurrAddress(addr);
}

async function buyNFT(tokenId) {
    try {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(CCMarketplaceJSON.address, CCMarketplaceJSON.abi, signer);
        const salePrice = ethers.utils.parseUnits(data.price, 'ether')
        updateMessage("Buying the NFT... Please Wait (Upto 5 mins)")
        //run the executeSale function
        let transaction = await contract.executeSale(tokenId, {value:salePrice});
        await transaction.wait();

        alert('You successfully bought the NFT!');
        updateMessage("");
    }
    catch(e) {
        alert("Upload Error"+e)
    }
}

    const params = useParams();
    const tokenId = params.tokenId;
    if(!dataFetched)
        getNFTData(tokenId);
    if(typeof data.image == "string")
        //data.image = GetIpfsUrlFromPinata(data.image);

    return(
        <div>
            <Navbar></Navbar>
            <br/> 

            <Card minWidth="300" >
                        <CardContent>
                        <Link to={`/nft/${nft.tokenId}`}>
                            <Typography variant="h6" component="div">
                                Name: {nft.name}
                            </Typography>
                            </Link>
                            <br/>
                            <CardMedia
                            component="img"
                            height="450"
                            image= {nft.image}
                            alt="book_img"
                            />
                            <br/>
                            <Typography variant="body2" color="text.secondary">
                                Description: {nft.description}
                            </Typography>
                            <br/>
                            <Typography variant="body2" color="text.secondary">
                                Price: {nft.price + " ETH"} 
                            </Typography>
                            <br/>
                            <Typography variant="body2" color="text.secondary">
                                Charity: {nft.charityId} 
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Owner: {nft.owner} 
                            </Typography>

                            { currAddress != data.owner && currAddress != data.seller ?
                                <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={() => buyNFT(tokenId)}>Buy this NFT</button>
                                : <div className="text-emerald-700">You are the owner of this NFT</div>
                            }
                        </CardContent>
                        </Card>
        </div>
    )
}