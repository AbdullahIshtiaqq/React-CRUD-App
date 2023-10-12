import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Product from "./product";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { getProducts } from "../apiCalls";
import { useQuery } from "react-query";

export default function AllProducts() {
  const query = useQuery({
    queryKey: "getProducts",
    queryFn: getProducts,
  });

  if (query.isLoading) {
    return (
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ width: 1, height: "100vh" }}
      >
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 12, sm: 9, md: 8, lg: 10 }}
      >
        {query.data.data.map((product) => (
          <Grid xs={6} sm={3} md={2} lg={2} key={product.id}>
            <Product
              product={{
                id: product.id,
                title: product.title,
                price: product.price,
                description: product.description,
                images: product.images,
                category: {
                  id: product.category.id,
                  name: product.category.name,
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
