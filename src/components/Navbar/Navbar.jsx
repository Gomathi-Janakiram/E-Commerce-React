import React from "react"
import { AppBar, Toolbar, IconButton, Badge, Typography } from "@material-ui/core"
import { AddShoppingCart } from "@material-ui/icons"
import useStyles from "./styles"
import {Link,useLocation} from "react-router-dom"

const Navbar = ({totalItems}) => {
    const classes = useStyles()
    const location=useLocation()
    // if location is our home page then only we show the cart symbol,otherwise we dont
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src="" height="25px" className={classes.image} />
                    Shoppify
                </Typography>
                    <div className={classes.grow} />
                    {location.pathname==="/"?(
                        <div className={classes.button}>
                        {/* If this button is not there normal way is <Link to="/cart">go to cart</Link>... */}
                        {/* Now since we have this btn,mat-ui provides us with components keyword with which we can
                        implement this */}
                        <IconButton component={Link} to="/cart" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <AddShoppingCart/>
                            </Badge>
                        </IconButton>
                    </div>
                    ):null} 
                    
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar