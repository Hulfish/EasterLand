import AppWrapper from "./app_wrapper";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import { VeiwContext } from "./context/view_context";
import { AuthContext } from "./context/auth_context";
import useRoutes from "./routes";
import { UsersSearchContext } from "./context/users_search_context";
import {Provider, useDispatch} from "react-redux"
import { store } from "./store";

function App() {
  const [token, setToken] = useState(getTokenLS());
  const isLogined = !!token;
  const [isCustom, setIsCustom] = useState(false);
  const routes = useRoutes(isLogined);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isNavMobile, setNavIsMobile] = useState(false)
  const [isFooterAllowed, setIsFooterAllowed] = useState(1)

  function getTokenLS() {
    if (localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      return accessToken;
    }
    return null;
  }



  if (window.location.pathname === "/chats/direct") {
    isFooterAllowed ? setIsFooterAllowed(0) : <></>
  }

  useEffect(async () => {
    // console.log("App rerender!");
  }, []);

  return (
    <>
    <Provider store = {store} >
      <Navbar
        setSearchResults={setSearchResults}
        setIsSearching={setIsSearching}
        isLogined={isLogined}
        isMobile={isNavMobile}
      />
      <VeiwContext.Provider 
        value = {{
          isCustom, 
          setIsCustom
        }}
      >
        <AppWrapper setNavIsMobile = {setNavIsMobile} isCustom={isCustom}>
        <AuthContext.Provider
          value={{
            isLogined,
            setToken,
            token,
          }}
        >
          <UsersSearchContext.Provider
            value={{
              searchResults,
              isSearching,
            }}
          >
            <VeiwContext.Provider
              value={{
                isCustom,
                setIsCustom,
              }}
            >
              <div>{routes} </div>
            </VeiwContext.Provider>
          </UsersSearchContext.Provider>
        </AuthContext.Provider>
      </AppWrapper>
      </VeiwContext.Provider>
      
      {
        isFooterAllowed ? (
          <Footer />
        ) : (
          <></>
        )
      }
    </Provider>
      
      
    </>
  );
}

export default App;
