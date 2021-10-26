import React from 'react';
import { Box, makeStyles, Container } from '@material-ui/core';
import Header from './Header';
import Products from './Products';
import Footer from '../Footer';

const useStyles = makeStyles(theme=>({
    container: {
        paddingTop: "4rem",

    }
}));

const Home = () =>{
    const classes = useStyles();
    return(
        <Box className={classes.container}>
            <Header/>
            <Products/>
            <Footer/>
        </Box>
    )
}

export default Home;