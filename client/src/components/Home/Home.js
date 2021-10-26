import React from 'react';
import { Box, makeStyles, Container } from '@material-ui/core';
import Header from './Header';
import Products from './Products';

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
        </Box>
    )
}

export default Home;