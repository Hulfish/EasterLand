import { useState } from "react";
import {useSelector, useDispatch} from "react-redux"

import path from "path";
import SearchForm from "./search_form";
import CommandForm from "./command_form";
import { setTurnLangAction } from "../store/lang_mode_reducer";

export default function Navbar(props) {
  const dispatch = useDispatch()
  const {lang} = useSelector(state => state.lang)
  const bgColor = "bg-white";
  const additional = "border-solid-bottom";

  const homeLink = "/home";
  const loginLink = "/login";
  const logoutLink = "/logout";
  const searchLink = "/search";
  const authLink = props.isLogined ? "/logout" : "/login";

  function changeLang () {
    dispatch(setTurnLangAction())
  }

  function onLink(link) {
    if (window.location.pathname == link) {
      return;
    } else {
      window.location.href = link;
    }
  }

  return props.isMobile ? (
    <div class="scroll-fix w-100">
      <nav
        class={`navbar navbar-expand-lg navbar-light ${bgColor} ${additional}`}
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
          Stepyandex
          </a>

          <div class="flex">
            <div class="flex mr-10">
              <button
                class="btn-nav-custom width-40"
                onClick={() => {
                  onLink(searchLink);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>

              <button
                class="btn-nav-custom width-40"
                onClick={() => {
                  onLink(authLink);
                }}
              >
                {!props.isLogined ? (
                  <svg
                    style={{ marginBottom: "-2px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    class="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                ) : (
                  <svg
                    style={{ marginBottom: "-2px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    class="bi bi-person-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                )}
              </button>
            </div>

            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  href={`/user_profile/${localStorage.getItem("userId")}`}
                >
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/chats">
                  chats
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/explore">
                  explore
                </a>
              </li>
              <li class="nav-item">
                {props.isLogined ? (
                  <a class="nav-link" href="/logout">
                    log out
                  </a>
                ) : (
                  <a class="nav-link" href="/login">
                    log in
                  </a>
                )}
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/search">
                  search
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" onClick ={changeLang} >
                  {lang === "RU" ? "ru" : "en" }
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  ) : (
    <div class="scroll-fix w-100">
      <nav
        class={`navbar navbar-expand-lg navbar-light ${bgColor} ${additional}`}
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
          Stepyandex
          </a>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  href={`/user_profile/${localStorage.getItem("userId")}`}
                >
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/chats">
                {lang === "RU" ? "сообщения" : "chats" }
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/explore">
                {lang === "RU" ? "лента" : "explore" }
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/search">
                {lang === "RU" ? "поиск" : "search" }
                </a>
              </li>

              <li class="nav-item">
                {props.isLogined ? (
                  <a class="nav-link" href="/logout">
                    {lang === "RU" ? "выйти" : "log out" }
                  </a>
                ) : (
                  <a class="nav-link" href="/login">
                    {lang === "RU" ? "войти" : "log in" }
                  </a>
                )}
              </li>
              <li class="nav-item">
                <a class="nav-link" onClick ={changeLang} >
                  {lang === "RU" ? "ru" : "en" }
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );

}