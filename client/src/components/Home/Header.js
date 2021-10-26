import React from 'react';
import { Box, makeStyles, Grow, Container, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
    container: {
        background: "url('/assects/bg-1.jpg')",
        backgroundPosition: "center",
        width: "100%"
    },
    textalign: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 650,

    }
}));


const Header = () => {
    const classes = useStyles();
    return(
        <Box className={classes.container}>
            <Container max-maxWidth="lg">
                <Grow in>
                    <Box className={classes.textalign}> 
                        <Typography variant="h1" style={{color: "#fff"}}>PERFECT PIZZA</Typography>
                        <Typography variant="p" style={{color: "#fff", margin: "1rem 0"}}>Experience the taste of a perfect pizza at PizzaHouse, one of the best restaurants!</Typography>
                        <Button size="large" variant="contained" color="secondary" style={{width: "15%"}}>View Our Menu</Button>
                    </Box>
                </Grow>
            </Container>
        </Box>
    )
}

export default Header;