import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import ProductDetails from "./productDetails";
import { useState, useContext } from "react";
import { AppContext } from "../App";
import { useQuery } from "react-query";
import { getUserProfile } from "../apiCalls";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setLoggedIn, openModal, setOpenModal } = useContext(AppContext);

  const query = useQuery({
    queryKey: "getProfile",
    queryFn: () => getUserProfile(localStorage.getItem("accessToken")),
  });

  const handleLogout = () => {
    handleClose();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setLoggedIn(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddProduct = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Products
            </Typography>

            {query.isLoading && <CircularProgress color="secondary" />}
            {!query.isLoading && (
              <div>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={handleAddProduct}
                >
                  Add Product
                </Button>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Avatar
                    alt={query.data.data.name}
                    src={query.data.data.avatar}
                  />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem>{query.data.data.name}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {openModal && (
        <ProductDetails
          openModal={openModal}
          toAdd={true}
          setOpenModal={setOpenModal}
          product={{
            title: "",
            description: "",
            price: "",
            category: { id: "" },
            image: "",
          }}
        />
      )}
    </>
  );
}
