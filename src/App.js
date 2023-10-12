import "./App.css";
import { createContext, useState } from "react";
import Login from "./Components/login";
import allProducts from "./Components/allProducts";
import NavBar from "./Components/Navbar";
import AllProducts from "./Components/allProducts";

export const AppContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return token != null;
  });

  const [openModal, setOpenModal] = useState(false);

  return (
    <AppContext.Provider value={{ setLoggedIn, openModal, setOpenModal }}>
      {!loggedIn && <Login />}
      {loggedIn && (
        <>
          <NavBar />
          <AllProducts />
        </>
      )}
    </AppContext.Provider>
  );
}

export default App;
