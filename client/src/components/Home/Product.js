import React,{useState, useEffect} from 'react';
import { Box, makeStyles, Typography, Button } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link } from 'react-router-dom';

import { useContext } from 'react';
import { cartContext } from '../../CartContext';

const useStyles = makeStyles(theme=>({
    container: {
        textAlign: "center",
        padding: "48px 20px 35px",
        maxWidth: "250px",
        marginLeft: "auto",
        marginRight: "auto",
        boxShadow: "0 0 10px 0 rgb(0 0 0 / 10%)",
        margin: "2rem 0",
    }
}));



const Product = () =>{
    const classes = useStyles();
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        fetchProduct();
    },[]);

    const fetchProduct = async() =>{
        await fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            setProducts(products);
        })
    }


    // cart system
    const { cart, setCart } = useContext(cartContext);
    const addToCart = (e, product) =>{
        e.preventDefault()
        // object structure
        // const cart = {
        //     iteml: {
        //            "6175789aafba765ee2e9e822": "2",
        //            "6175789aafba765ee2e9e822": "3",
        //     },
        //    totalItems: "5"
        // }
        let _cart = { ...cart }; // {}
        if(!_cart.items){
            _cart.items = {};
        } // { items: {} }

        if(_cart.items[product._id]){
            _cart.items[product._id] += 1;
        }else{
            _cart.items[product._id] = 1;
        }

        if(!_cart.totalItems){
            _cart.totalItems = 0;
        }
        _cart.totalItems += 1;
        setCart(_cart);
    }


    return(
        <>
        {
            products.map(product => (
                <Link to={`products/${product._id}`} style={{textDecoration: "none", cursor: "pointer"}}>
                    <Box key={product._id} className={classes.container}>
                        <img src={product.image} alt="product" style={{width:200, height: 190}} />
                        <Typography variant="h6" style={{color: "#000"}}>{product.name}</Typography>
                        <Typography variant="p" style={{color: "#485460"}}>Classic delight with 100% real mozzarella cheese</Typography>
                        <Typography variant="h6" style={{color: "#2d3436", background: "#ffeaa7", borderRadius: 30}}>{product.size}</Typography>
                        <Box style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem"}}>
                            <Typography variant="h6" style={{color: "#05c46b"}}>₹{product.price}</Typography>
                            <Button onClick={(e)=>{addToCart(e, product)}} variant="outlined" color="primary"><AddShoppingCartIcon/> Add to Cart</Button>
                        </Box>
                    </Box>
                </Link>
            ))
        }
        </>
    )
}

export default Product;