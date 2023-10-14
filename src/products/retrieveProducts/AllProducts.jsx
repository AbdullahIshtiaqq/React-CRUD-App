import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { getProducts } from "../../axios/ApiCalls";
import Product from "./Product";
import { useQuery } from "react-query";
import { KEYS } from "../../constants/Constants";
import WaitingLoader from "../../utils/WaitingLoader";

export default function AllProducts() {
  const query = useQuery({
    queryKey: KEYS.GET_PRODUCTS,
    queryFn: getProducts,
  });

  if (query.isLoading) {
    return <WaitingLoader text="" />;
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
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
