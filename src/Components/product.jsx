import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ConfirmDeletion from "./deleteConfirmation";
import ProductDetails from "./productDetails";
import { useState } from "react";
import { Update } from "@mui/icons-material";

export default function Product({ product }) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const handleUpdate = () => {
    setUpdateOpen(true);
  };

  const handleDelete = () => {
    setConfirmationOpen(true);
  };
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
          <Button size="small" onClick={handleUpdate}>
            Update
          </Button>
          <Button size="small" onClick={handleDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>
      {confirmationOpen && (
        <ConfirmDeletion
          open={confirmationOpen}
          setOpen={setConfirmationOpen}
          id={product.id}
        />
      )}
      {updateOpen && (
        <ProductDetails
          toAdd={false}
          openModal={updateOpen}
          setOpenModal={setUpdateOpen}
          product={product}
        />
      )}
    </>
  );
}
