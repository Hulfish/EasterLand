import { useContext, useEffect, useState } from "react";
import Lorem from "../components/lorem";
import { VeiwContext } from "../context/view_context";

import path from "path";
import { MobileContext } from "../context/mobile_context";

import { AuthContext } from "../context/auth_context";
import $api from "../http/http-axios";
import useAuth from "../hooks/auth-hook";
import { useSelector } from "react-redux";

export default function Logoutpage() {
  const {lang} = useSelector(state => state.lang)
    const {setToken} = useContext(AuthContext)
  const { logout } = useAuth();
  function onLogout() {
    logout();
    setToken(null)
  }
  return (
    <div class="mt-200 mb-500">
      <div class="mb-20"> {lang === "RU" ? "Вы уверены что хотите выйти? " : "Are you confident you want to log out?" } </div>
      <button class="btn btn-secondary" onClick={onLogout}>
        {lang === "RU" ? "Выйти " : "Log out " }
      </button>{" "}
    </div>
  );
}
