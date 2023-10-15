import Button from "@mui/material/Button";
import ProductDetails from "../createProducts/ProductDetails";
import { useState } from "react";

export default function UpdateProduct({ product }) {
  const [updateOpen, setUpdateOpen] = useState(false);

  const handleUpdate = () => {
    setUpdateOpen(true);
  };
  return (
    <>
      <Button size="small" onClick={handleUpdate}>
        Update
      </Button>
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
