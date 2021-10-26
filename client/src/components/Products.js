import { Box, Grow } from '@material-ui/core';
import React from 'react';
import Product from './Home/Products';

const Products = () =>{
    return(
        <Box style={{marginTop: "8rem"}}>
            <Grow in>
                <Product/>
            </Grow>
        </Box>
    )
}

export default Products;