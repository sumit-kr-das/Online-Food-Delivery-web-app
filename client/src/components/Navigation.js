import React, {useState, useContext} from 'react';
import { AppBar, Toolbar, Box, makeStyles, Drawer, List ,  ListItem, ListItemText, IconButton } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { NavLink } from 'react-router-dom';
import MenuIcon from "@material-ui/icons/Menu";

import { cartContext } from '../CartContext';


const useStyles = makeStyles(theme=>({
    toolbar: {
        padding: "0.5rem 4rem",
        display: "flex",
        justifyContent: "space-between" 
    },
    links: {
        display: "flex",
        alignItems: "center",
        listStyle: "none",
        "& > li": {
            [theme.breakpoints.down('xs')]: {
                display: "none"
            },
            marginLeft: "1rem",
            "& > a": {
                padding: "0.5rem 1rem",
                textDecoration: "none",
                fontWeight: "500",
                fontSize: "1.3rem"
            }
        },

    },
    cart: {
        background: "#F59E0D", 
        borderRadius: 25,
        boxShadow: "0 4px 4px rgba(0,0,0,0.2)"
    },
    drawer: {
        width: 300
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: "#000",
        display: "none",
        [theme.breakpoints.down('xs')]: {
            display: "block"
        },
    },
    mobilelink: {
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "2rem",
        "& > li": {
            marginLeft: -90,
            marginTop: "2rem",
            "& > a": {
                padding: "0.5rem 1rem",
                textDecoration: "none",
                fontWeight: "500",
                fontSize: "1.3rem"
            }
        }
    }
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: 30,
      top: -10,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
}))(Badge);

const Navigation = () =>{
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const { cart } = useContext(cartContext);

    return(
        <>
            <Drawer open={open} onClose={() => setOpen(false)}>
                <List disablePadding className={classes.drawer}>
                    <ul className={classes.mobilelink}>
                        <li><NavLink to="/" activeClassName="activei">Home</NavLink></li>
                        <li><NavLink to="/about" activeClassName="activei">About us</NavLink></li>
                        <li><NavLink to="/products" activeClassName="activei">Products</NavLink></li>
                        <li className={classes.cart}><NavLink to="/cart" activeClassName="activei" style={{display: "flex", alignItems: "center", color: "#fff"}} ><StyledBadge badgeContent={cart.totalItems ? cart.totalItems : 0} color="secondary"><AddShoppingCartIcon/></StyledBadge> Cart</NavLink></li>
                    </ul>
                </List>
            </Drawer>
            <AppBar position="fixed" style={{background: "#F5F5F5", width: "100%"}}>
                <Toolbar className={classes.toolbar}>
                    <Box>
                        <NavLink to="/" ><img src="/assects/logo.png" alt="logo" /></NavLink>
                    </Box>
                    <Box>
                        <ul className={classes.links}>
                            <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            onClick={() => setOpen(true)}
                            >
                            <MenuIcon />
                            </IconButton>
                            <li><NavLink to="/" activeClassName="activei">Home</NavLink></li>
                            <li><NavLink to="/about" activeClassName="activei">About us</NavLink></li>
                            <li><NavLink to="/products" activeClassName="activei">Products</NavLink></li>
                            <li className={classes.cart}>
                                <NavLink to="/cart" activeClassName="activei" style={{display: "flex", alignItems: "center", color: "#fff"}} >
                                    <StyledBadge badgeContent={cart.totalItems ? cart.totalItems : 0} color="secondary">
                                        <AddShoppingCartIcon/>
                                    </StyledBadge>
                                     Cart
                                </NavLink>
                            </li>
                        </ul>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navigation;