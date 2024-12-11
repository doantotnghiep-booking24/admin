// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { CssBaseline, ThemeProvider } from "@mui/material";
import { useRoutes } from "react-router-dom";
import Router from "./routes/Router";
import axios from "axios";
import { baselightTheme } from "./theme/DefaultColors";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Chat from "./views/utilities/ChatAdmin";
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const auth = Cookies.get("authAdmin")
    ? JSON.parse(Cookies.get("authAdmin"))
    : null;
  useEffect(() => {
    if (auth?.role === "Admin") {
      ``;
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [auth]);
  const routing = useRoutes(Router(isAuth));
  const theme = baselightTheme;

  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        const auth = Cookies.get("authAdmin");

        if (auth) {
          const token = JSON.parse(auth).AccessToken;

          if (token) {
            config.headers["Authorization"] = "Bearer " + token;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
      {isAuth ? <Chat /> : <></>}
    </ThemeProvider>
  );
}

export default App;
