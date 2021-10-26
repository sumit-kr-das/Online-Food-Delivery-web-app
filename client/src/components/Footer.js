import React from 'react';
import { Box, makeStyles, Container } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles(theme=>({
    mainContainer: {
        background: "#38393B",
        padding: "2rem 8rem",
    },
    wrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    }
}))

const Footer = () =>{
    const classes = useStyles();
    return(
        <Box className={classes.mainContainer}>  
           <Box className={classes.wrapper}>
               <Box>
                    <img src="/assects/footer-logo.png" alt="footerlogo" />
               </Box>
               <Box>
                   <b><a style={{color: "#fff", textDecoration:"none"}} href="https://github.com/sumit-kr-das">@2021 sumit all copyright reserved</a></b>
               </Box>
               <Box style={{color: "#fff", display: "flex", alignItems: "center"}}>
                    <a style={{color: "#fff", textDecoration:"none"}} href="https://github.com/sumit-kr-das"><GitHubIcon /></a>
                    <LinkedInIcon style={{marginLeft: "1rem"}}/>
                    <TwitterIcon style={{marginLeft: "1rem"}}/>
               </Box>
           </Box>
        </Box>
    )
}

export default Footer;