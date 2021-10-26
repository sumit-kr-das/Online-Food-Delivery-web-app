import { Box, Typography, makeStyles, Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

import { useContext, useEffect, useState } from 'react';
import { cartContext } from '../CartContext';

const useStyles = makeStyles(theme=>({
    cartBtn: {
        background: "#e74c3c",
        border: "none",
        padding: "0.2rem 1rem",
        color: "#fff",
        fontSize: "1.2rem",
        borderRadius: "20px",
        textAlign: "center"
    },
}));

const Cart = () =>{
    const classes = useStyles();

    let total = 0;
    const [products, setProducts] = useState([]);
    const { cart, setCart } = useContext(cartContext);
    // console.log("cart is ",cart.items);
    const [priceFetched, togglePriceFetched] = useState(false);
    useEffect(()=>{
        if(!cart.items){
            return;
        }
        if(priceFetched){
            return;
        }
        fetch('/api/products/cart-items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ ids: Object.keys(cart.items)})
        }).then(res => res.json())
        .then(products => {
            setProducts(products);
            togglePriceFetched(true);
        })
    },[cart])

    const getQuantity = (productId) => {
        return cart.items[productId];
    }

    const increment = (productId) => {
        const existingQty = cart.items[productId];
        const _cart = {...cart};
        _cart.items[productId] = existingQty + 1;
        _cart.totalItems += 1;
        setCart(_cart);
    } 

    const decrement = (productId) =>{
        const existingQty = cart.items[productId];
        if(existingQty === 1){
            return;
        }
        const _cart = {...cart};
        _cart.items[productId] = existingQty - 1;
        _cart.totalItems -= 1;
        setCart(_cart);
    }

    const getSum = (id,price) =>{
        const sum = price * getQuantity(id);
        total = total + sum;
        return sum;
    }

    const deleteProduct = (productId) => {
        const _cart = {...cart};
        const qty = _cart.items[productId];
        delete _cart.items[productId];
        _cart.totalItems -= qty;
        setCart(_cart);
        setProducts(products.filter((product)=> product._id !== productId));
    }

    const orderNow = () =>{
        window.alert("Order place successfully !");
        setProducts([]);
        setCart({});
    }

    return(
        products.length ? 
        <Container maxWidth="lg"  style={{paddingTop: "6rem"}}>
            <Typography variant="h4" align="center" style={{margin: "1rem 0"}}>Cart Item</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>PRODUCT NAME</TableCell>
                            <TableCell>PRICE</TableCell>
                            <TableCell>QUANTITY</TableCell>
                            <TableCell>REMOVE PRODUCT</TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        products.map(product=>(
                            <TableBody key={product._id}>
                                <TableCell>
                                    <Box style={{display: "flex", alignItems: "center",}}>
                                        <img src={product.image} alt="cart-img" style={{width: 80,}} />
                                        <b style={{marginLeft: "0.5rem"}}>{product.name}</b>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <b>₹ {getSum(product._id, product.price)}</b>
                                </TableCell>
                                <TableCell>
                                    <Box>
                                        <button onClick={()=>{decrement(product._id)}} className={classes.cartBtn}>-</button>
                                        <b style={{margin: "0 0.5rem"}}>{getQuantity(product._id)}</b>
                                        <button onClick={()=>{increment(product._id)}} className={classes.cartBtn} style={{background: "#27ae60"}}>+</button>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <button onClick={()=>{deleteProduct(product._id)}} className={classes.cartBtn} style={{background: "#EA2027", fontSize: "1rem",}}>Remove</button>
                                </TableCell>
                            </TableBody>
                        ))
                    }
                    <TableBody>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                            <b>Grand Total ₹ {total}</b>
                        </TableCell>
                        <TableCell>
                        <button onClick={orderNow} className={classes.cartBtn} style={{background: "#12CBC4", fontSize: "1rem",}}>Checkout</button>
                        </TableCell>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
        :(
            <Box style={{width: "100%", display: "flex", height: "100vh",alignItems: "center",justifyContent: "center"}}>
                <img src="/assects/empty-cart.png" style={{ width: "40%"}} alt="blank-cart" />
            </Box>
        )
    )
}

export default Cart;