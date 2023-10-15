import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteProduct from "../deleteProducts/DeleteProduct";
import UpdateProduct from "../updateProducts/UpdateProduct";

export default function Product({ product }) {
  return (
    <>
      <Card sx={{ maxWidth: 240, minHeight: 580 }}>
        <CardMedia
          sx={{ height: 320 }}
          image={product.images[0]}
          title={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <UpdateProduct product={product} />
          <DeleteProduct id={product.id} />
        </CardActions>
      </Card>
    </>
  );
}
