import { Box, makeStyles, Container, Typography } from '@material-ui/core';
import Product from './Product';

import { cartContext } from '../../CartContext';
import { useContext } from 'react';

const useStyles = makeStyles(theme=>({
    wrapper: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center"
    }
}));


const Products = () =>{
    const classes = useStyles();

    // const { name } = useContext(cartContext);

    return(

        <Container maxWidth="lg">
            <Typography variant="h3" style={{textAlign: "center", margin: "1rem 0"}}>Our Menu</Typography>
            <Box className={classes.wrapper}>
                <Product/>
            </Box>
        </Container>

    )
}

export default Products;