import "./App.css";
import { createContext, useState } from "react";
import Login from "./authentication/Login";
import NavBar from "./navigation/Navbar";
import AllProducts from "./products/retrieveProducts/AllProducts";
import { ACCESS_TOKEN } from "./constants/Constants";

export const AppContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return token != null;
  });

  const [openModal, setOpenModal] = useState(false);

  return (
    <AppContext.Provider value={{ setLoggedIn, openModal, setOpenModal }}>
      {!loggedIn && <Login setLoggedIn={setLoggedIn} />}
      {loggedIn && (
        <>
          <NavBar setLoggedIn={setLoggedIn} />
          <AllProducts />
        </>
      )}
    </AppContext.Provider>
  );
}

export default App;
