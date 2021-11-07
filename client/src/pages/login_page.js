import { useContext, useEffect, useState } from "react";
import { MobileContext } from "../context/mobile_context";
import { AuthContext } from "../context/auth_context";
import useAuth from "../hooks/auth-hook";
import { useSelector } from "react-redux";

export default function Loginpage() {
  const {lang} = useSelector(state => state.lang)
  const [isSubmitted, setIsSubmitted] = useState(0);
  const [response, setResponse] = useState("");

  if (isSubmitted) {
    return (
      <div>
        <div > Error: {response} </div>
        <div class="mt-3 mb-300">
          That means that you just need to go to the mail and
          confirm your account by link
        </div>
      </div>
    );
  }

  return (
    <div className="mt-200 mb-400 pt-20 pb-20 bg-white">
      <div>
        {" "}
        <h1>  {lang === "RU" ? "Войти " : " Log in" }</h1>{" "}
      </div>
      <div>
        <LoginCard setIsSubmitted={setIsSubmitted} setResponse={setResponse} />
      </div>
    </div>
  );
}

function LoginCard(props) {
  const {lang} = useSelector(state => state.lang)
  const { isMobile } = useContext(MobileContext);
  const { setToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const { setIsSubmitted, setResponse } = props;

  function preventSubmit(e) {
    e.preventDefault();
  }

  async function loginHandler() {
    try {
      const res = await login(email, password);
      const { accessToken } = res;
      if (accessToken) {
        return setToken(accessToken);
      }
      setResponse(res.data.message);
      setIsSubmitted(true);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div class="">
      <div class="row">
        <div className="pt-20 pb-20">
          <div>
            <Form
              isMobile={isMobile}
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              preventSubmit={preventSubmit}
            />
            <div class="mt-20 flex space-between">
              <button
                onClick={() => {
                  loginHandler();
                }}
                type="button"
                class="btn btn-primary"
                data-toggle="button"
                aria-pressed="false"
                autocomplete="off"
              >
                {lang === "RU" ? "Войти " : "Log in " }
              </button>
              <a href="/register"> {lang === "RU" ? "Регистрация " : "Registration " } </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Form(props) {
  const {lang} = useSelector(state => state.lang)
  const preventSubmit = props.preventSubmit;
  const setEmail = props.setEmail;
  const setPassword = props.setPassword;
  return (
    <form
      // class={!props.isMobile ? "w-500" : "w-250"}
      class="w-100"
      type="submit"
      onSubmit={(e) => {
        preventSubmit(e);
      }}
    >
      <div class="form-group">
        <label for="exampleInputEmail1">{lang === "RU" ? "Email " : "Email address " }</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="email"
          value={props.email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder={lang === "RU" ? "пароль " : "password "}
          value={props.password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
    </form>
  );
}
