//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CCMarketplace {


    //owner is the contract address that created the smart contract
    address payable owner;

    uint256 public currentcharityId;

    using Counters for Counters.Counter;
    //_tokenIds variable has the most recent minted tokenId
    //helps keep track of amount of nfts
    Counters.Counter private _tokenIds;


    //The structure to store info about a listed token
    struct ListedToken {
        uint256 tokenId;
        address token;
        address payable owner; //initially, owner is charity as well, upon selling, it gets reassigned.
        uint256 charityId; //charity id never gets reassigned
        address payable artist; //to provide royalties to artist? 
        uint256 price;
        bool currentlyListed;
    }

    //The structure to define a particular charity 
    struct Charity { 
        string charityName;
        address payable charityAddress;
    }

    //the event emitted when a token is successfully listed
    event TokenListedSuccess (
        uint256 indexed tokenId,
        address token, 
        address owner,
        uint256 charityId,
        address artist,
        uint256 price,
        bool currentlyListed
    );

    //This mapping maps tokenId to token info and is helpful when retrieving details about a tokenId
    mapping(uint256 => ListedToken) private idToListedToken;

    //This mapping maps charityId to addresses payable
    mapping(uint256 => Charity) private charityidToCharity;

    //maybe define a mapping of charities to a list of all listed nfts?


    constructor() {
        owner = payable(msg.sender);
    }

    function addCharity(address payable _charityAddress, string _charityName) { 
        require(owner == msg.sender, "Only owner can update available charities");
        currentcharityId++; 
        charityidToCharity[currentcharityId] = Charity(_charityName, _charityAddress);
    }

    function getLatestIdToListedToken() public view returns (ListedToken memory) {
        uint256 currentTokenId = _tokenIds.current();
        return idToListedToken[currentTokenId];
    }

    function getListedTokenForId(uint256 tokenId) public view returns (ListedToken memory) {
        return idToListedToken[tokenId];
    }

    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current();
    }

    //function allows artists to list a token for a particular charity
    function createListedToken(address token, uint256 tokenId, uint256 charityId, uint256 price) public {
        //Make sure the sender sent enough ETH to pay for listing
        require(price > 0, "cannot be free!");

        //require that the current charity exists
        require(charityId >= currentcharityId); 

        //require that NFT sender approved this contract to transfer NFT 
        require(
            IERC721(token).getApproved(tokenId) == address(this),
            "No approval"
        );

        IERC721(token).transferFrom(msg.sender, address(this), tokenId);

        _tokenIds.increment();

        //Update the mapping of tokenId's to Token details, useful for retrieval functions
        idToListedToken[tokenId] = ListedToken(
            tokenId,
            token,
            payable(address(this)), //owner
            charityId, //charity 
            payable(address(msg.sender)), //artist
            price,
            true
        );

        //Emit the event for successful transfer. The frontend parses this message and updates the end user
        emit TokenListedSuccess(
            tokenId,
            token,
            payable(address(this)), //owner
            charityId, //charity 
            payable(address(msg.sender)), //artist
            price,
            true
        );
    }
    
    //This will return all the NFTs currently listed to be sold on the marketplace
    function getAllNFTs() public view returns (ListedToken[] memory) {
        uint nftCount = _tokenIds.current();
        ListedToken[] memory tokens = new ListedToken[](nftCount);
        uint currentIndex = 0;
        uint currentId;
        //at the moment currentlyListed is true for all, if it becomes false in the future we will 
        //filter out currentlyListed == false over here
        for(uint i=0;i<nftCount;i++)
        {
            currentId = i + 1;
            ListedToken storage currentItem = idToListedToken[currentId];
            tokens[currentIndex] = currentItem;
            currentIndex += 1;
        }
        //the array 'tokens' has the list of all NFTs in the marketplace
        return tokens;
    }
    
    //Returns all the NFTs that the current user is owner or seller in
    function getMyNFTs() public view returns (ListedToken[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;
        //Important to get a count of all the NFTs that belong to the user before we can make an array for them
        for(uint i=0; i < totalItemCount; i++)
        {
            if(idToListedToken[i+1].owner == msg.sender || idToListedToken[i+1].seller == msg.sender){
                itemCount += 1;
            }
        }

        //Once you have the count of relevant NFTs, create an array then store all the NFTs in it
        ListedToken[] memory items = new ListedToken[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(idToListedToken[i+1].owner == msg.sender || idToListedToken[i+1].seller == msg.sender) {
                currentId = i+1;
                ListedToken storage currentItem = idToListedToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function executeSale(uint256 tokenId) public payable {
        uint price = idToListedToken[tokenId].price;
        uint256 charity = idToListedToken[tokenId].charityId;
        address payable charityAddress = charityidToCharity[charity].charityAddress;


        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        //Actually transfer the token to the new owner
        _transfer(address(this), msg.sender, tokenId);
        //approve the marketplace to sell NFTs on your behalf
        approve(address(this), tokenId);

        //update the details of the token
        idToListedToken[tokenId].currentlyListed = false;
        idToListedToken[tokenId].owner = payable(msg.sender);
        _itemsSold.increment();

        //Transfer the listing fee to the marketplace creator
        payable(owner).transfer(listPrice);
        //Transfer the proceeds from the sale to the seller of the NFT
        payable(seller).transfer(msg.value);
    }

    //We might add a resell token function in the future
    //In that case, tokens won't be listed by default but users can send a request to actually list a token
    //Currently NFTs are listed by default
}