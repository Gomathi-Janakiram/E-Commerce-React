import React from "react"
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from "@material-ui/core"
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from "./styles"

const Product = ({product,onAddToCart}) => {
    const classes=useStyles()

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.media.source} title={Product.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    {/* TYpography for writing something gutterbottom means space in the btm */}
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5">
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{__html:product.description}} variant="body2" color="textSecondary"/>
            </CardContent>
            {/* If u have to perform some actions i.e.,like share etc...u can use cardactions */}
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton onClick={()=>onAddToCart(product.id,1)}>
                    <AddShoppingCart/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product