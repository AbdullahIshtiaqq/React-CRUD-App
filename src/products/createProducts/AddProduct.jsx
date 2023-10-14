import Button from "@mui/material/Button";
import ProductDetails from "./ProductDetails";

export default function AddProduct({ openModal, setOpenModal }) {
  const handleAddProduct = () => {
    setOpenModal(true);
  };

  const product = {
    title: "",
    description: "",
    price: "",
    category: { id: "" },
    image: "",
  };

  return (
    <>
      <Button variant="outlined" color="inherit" onClick={handleAddProduct}>
        Add Product
      </Button>
      {openModal && (
        <ProductDetails
          openModal={openModal}
          toAdd={true}
          setOpenModal={setOpenModal}
          product={product}
        />
      )}
    </>
  );
}
