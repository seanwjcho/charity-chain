import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import CCMarketplaceJSON from "../CCMarketplace.json";
import { useState } from "react";
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

export default function Home() {



    return (
        <div>
            <Navbar></Navbar>
            <br/>
            <br/>
            <br/>
            <Box>
                <center>
                    <Typography color = "red" variant="h3">
                        Welcome to the new way of doing charity
                    </Typography>
                    <img src = "charity chain.jpg" alt = "charity chain logo"/>
                </center>

            </Box>
        </div>

        

    );



}
