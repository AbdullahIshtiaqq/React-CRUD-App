import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getCategories, addProduct, updateProduct } from "../../axios/ApiCalls";
import WaitingLoader from "../../utils/WaitingLoader";
import UploadFile from "./UploadFile";

export default function ProductDetails({
  toAdd,
  openModal,
  setOpenModal,
  product,
}) {
  const [fileUrl, setFileUrl] = useState(() =>
    toAdd ? "" : product.images[0]
  );
  const [filename, setFilename] = useState(() =>
    toAdd ? "" : product.images[0].split("/").slice(-1)
  );

  const myClient = useQueryClient();

  const query = useQuery({
    queryKey: "categories",
    queryFn: async () => await getCategories(10),
  });

  const productMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => myClient.invalidateQueries("getProducts"),
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => myClient.invalidateQueries("getProducts"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form_data = new FormData(event.currentTarget);
    const productData = {
      title: form_data.get("title"),
      price: parseInt(form_data.get("price")),
      description: form_data.get("description"),
      categoryId: parseInt(form_data.get("category")),
      images: [fileUrl],
    };
    if (toAdd) {
      await productMutation.mutateAsync(productData);
    } else {
      await updateMutation.mutateAsync({ id: product.id, data: productData });
    }
    handleClose();
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth>
      {productMutation.isLoading && <WaitingLoader text="Adding... " />}
      {updateMutation.isLoading && <WaitingLoader text="Updating... " />}
      {query.isLoading && <WaitingLoader text="" />}
      {!productMutation.isLoading &&
        !updateMutation.isLoading &&
        !query.isLoading && (
          <>
            <DialogTitle>
              {toAdd && <>Add Product</>}
              {!toAdd && <>Update Product</>}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {toAdd && <>Provide Product Details to Add!</>}
                {!toAdd && <>Update Product Details!</>}
              </DialogContentText>

              <Box
                noValidate
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: "auto",
                  width: "fit-content",
                }}
              >
                <Grid>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    defaultValue={product.title}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="price"
                    label="Price"
                    type="number"
                    id="price"
                    defaultValue={product.price}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    id="description"
                    defaultValue={product.description}
                  />
                </Grid>
                <InputLabel sx={{ mt: 3 }} id="category">
                  Category
                </InputLabel>
                <Select
                  required
                  fullWidth
                  name="category"
                  label="Category"
                  id="category"
                  defaultValue={product.category?.id}
                >
                  {query.data.data.map((category) => {
                    return (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    );
                  })}
                </Select>

                <UploadFile
                  disabled={!toAdd}
                  setFileUrl={setFileUrl}
                  filename={filename}
                  setFilename={setFilename}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {toAdd && <>Add Product</>}
                  {!toAdd && <>Update Product</>}
                </Button>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </>
        )}
    </Dialog>
  );
}
