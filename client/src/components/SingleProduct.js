import React,{useState, useEffect} from 'react';
import { Box, makeStyles, Grow, Container, Typography, Button } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useParams, useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme=>{

})

const SingleProduct = () =>{
    const classes = useStyles();
    const [product, setProduct] = useState({});
    const params = useParams();
    const history = useHistory();
    useEffect(()=>{
        fetch(`/api/products/${params._id}`)
        .then(res=>res.json())
        .then(product=>{
            setProduct(product);
        })
    },[]);

    return(
        <Container maxWidth="lg" style={{paddingTop: "8rem"}}>
            <Button onClick={()=> {history.goBack()}} variant="contained" style={{marginBottom: "2rem"}}>Go Back</Button>
            <Grow in>
                <Box>
                    <img src={product.image} alt="products" />
                    <Box>
                        <Typography variant="h6" style={{color: "#000"}}>{product.name}</Typography>
                        <Typography variant="p" style={{color: "#485460"}}>Classic delight with 100% real mozzarella cheese</Typography>
                        <Typography variant="h6" style={{color: "#2d3436", background: "#ffeaa7", borderRadius: 30, textAlign: "center", margin: "1rem 0"}}>{product.size}</Typography>
                        <Box style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem"}}>
                            <Typography variant="h6" style={{color: "#05c46b"}}>₹{product.price}</Typography>
                            <Button variant="outlined" color="primary"><AddShoppingCartIcon/> Add to Cart</Button>
                        </Box>
                    </Box>
                </Box>
            </Grow>
        </Container>
    )
}

export default SingleProduct;