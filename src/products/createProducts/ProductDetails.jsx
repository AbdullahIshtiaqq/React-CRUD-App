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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import {
  getCategories,
  uploadFile,
  addProduct,
  updateProduct,
} from "../../axios/ApiCalls";
import ProgressChecker from "../../utils/ProgressChecker";
import WaitingLoader from "../../utils/WaitingLoader";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function ProductDetails({
  toAdd,
  openModal,
  setOpenModal,
  product,
}) {
  const [file, setFile] = useState();
  const [filename, setFilename] = useState(() =>
    toAdd ? "" : product.images[0].split("/").slice(-1)
  );
  const [progress, setProgress] = useState(() => (toAdd ? 0 : 100));
  const [fileUrl, setFileUrl] = useState(() =>
    toAdd ? "" : product.images[0]
  );
  const myClient = useQueryClient();

  const query = useQuery({
    queryKey: "categories",
    queryFn: async () => await getCategories(10),
  });

  const mutation = useMutation({
    mutationFn: uploadFile,
  });

  const productMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => myClient.invalidateQueries("getProducts"),
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => myClient.invalidateQueries("getProducts"),
  });

  const handleFileUpload = async (e) => {
    setProgress(0);
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    const res = await mutation.mutateAsync({
      file: e.target.files[0],
      setProgress: setProgress,
    });
    setFileUrl(res.data.location);
  };

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
      handleClose();
    } else {
      await updateMutation.mutateAsync({ id: product.id, data: productData });
      handleClose();
    }
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

                <Button
                  component="label"
                  variant="contained"
                  sx={{ mt: 3, maxWidth: 200 }}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Image
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileUpload}
                  />
                </Button>

                {progress == 100 && (
                  <Typography color="blue">{filename}</Typography>
                )}

                {progress < 100 && progress > 0 && (
                  <ProgressChecker progress={progress} />
                )}

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
