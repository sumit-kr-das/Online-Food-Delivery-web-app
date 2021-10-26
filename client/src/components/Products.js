import { Box, Grow } from '@material-ui/core';
import React from 'react';
import Product from './Home/Products';
import Footer from './Footer';

const Products = () =>{
    return(
        <Box style={{marginTop: "8rem"}}>
            <Grow in>
                <Product/>
            </Grow>
            <Footer/>
        </Box>
    )
}

export default Products;