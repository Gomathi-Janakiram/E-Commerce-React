import React from "react"
import { Container, Typography, Grid, Button } from "@material-ui/core"
import useStyles from "./styles"
import CartItem from "./CartItem/CartItem"
import { Link } from "react-router-dom"

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles()
    console.log(cart)
    const EmptyCart = () => {
        return (
            <>
                <Typography variant="subtitle1">You have no item in your shopping cart
                   <Link to="/" className={classes.link}>Start adding some</Link>!
                </Typography>
            </>
        )

    }
    const FilledCart = () => {
        return (
            <>
                <Grid container spacing={3}>
                    {cart.line_items.map((item) => (
                        <Grid item xs={12} sm={4} key={item.id}>
                            <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                        </Grid>
                    ))}
                </Grid>
                <div className={classes.cardDetails}>
                    <Typography variant="h4">subtotal:{cart.subtotal.formatted_with_symbol}</Typography>
                    <div>
                        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                        <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                    </div>
                </div>
            </>
        )
    }
    if (!cart.line_items) return "Loading........"
    return (
        // container same like div
        <Container>
            {/*we use div with class toolbar to push the content little bit down  */}
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart