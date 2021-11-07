import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../components/footer";
import Lorem from "../components/lorem";
import { AuthContext } from "../context/auth_context";
import { VeiwContext } from "../context/view_context";
import useAuth from "../hooks/auth-hook";

export default function Registerpage() {
  const { lang } = useSelector((state) => state.lang);
  const { registration } = useAuth();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  async function onSubmit() {
    const error =
      !password || !email || !name || !surname || !year || !month || !day;
    if (error) {
      return alert("One of riquired fields is not filled");
    }
    try {
      const res = await registration({
        password,
        email,
        name,
        surname,
        birthDate: { year, month, day },
      });
      const { isSuccess } = res;
      if (isSuccess) {
        setIsSubmitted(true);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function preventSubmit(e) {
    e.preventDefault();
  }

  if (isSubmitted) {
    return (
      <>
        <h1>
          {" "}
          {lang === "RU" ? "Аккаунт создан " : " Your account is created"}{" "}
        </h1>
        <div class="mb-200">
          {" "}
          {lang === "RU"
            ? "Подтвердите аккаунт с помощью электронной почты и вы сможете спокойно войти (в аккаунт)"
            : "Confirm account on your mail and then login with your email and password"}
        </div>
      </>
    );
  }


  return (
    <>
      <div class="mt-200 mb-400 pt-20 pb-20 bg-white">
        <div class="row">
          <h1 class="col px-1 mt-50">  {lang === "RU" ? "Регистрация " : "Registration "}</h1>
        </div>

        <div class="conatainer">
          <div class="row">
            <div class="col">
              {" "}
              <Form
                password={password}
                email={email}
                year={year}
                month={month}
                day={day}
                name={name}
                surname={surname}
                setPassword={setPassword}
                setEmail={setEmail}
                setYear={setYear}
                setMonth={setMonth}
                setDay={setDay}
                setName={setName}
                setSurname={setSurname}
                onSubmit={onSubmit}
                preventSubmit={preventSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Form(props) {
  const { lang } = useSelector((state) => state.lang);
  return (
    <form
      onSubmit={(e) => {
        props.preventSubmit(e);
      }}
    >
      <div class="mb-3">
        <div class="row">
          <div class="mb-20 px-1 ">
            <AuthTemplate
              password={props.password}
              email={props.email}
              setPassword={props.setPassword}
              setEmail={props.setEmail}
            />
          </div>
          <div class="col-6 px-1 mb-20">
            <InputTemplate
              value={props.name}
              onChangeFunc={props.setName}
              placeholder= {lang === "RU" ? "имя " : "first name"}
            />
          </div>
          <div class="col-6 px-1">
            <InputTemplate
              value={props.surname}
              onChangeFunc={props.setSurname}
              placeholder={lang === "RU" ? "фамилия " : "surname"}
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 px-1">
            <InputTemplate
              value={props.day}
              onChangeFunc={props.setDay}
              placeholder={lang === "RU" ? "день " : "day "}
            />
          </div>
          <div class="col-3 px-1">
            <InputTemplate
              value={props.month}
              onChangeFunc={props.setMonth}
              placeholder={lang === "RU" ? "месяц " : "month "}
            />
          </div>
          <div class="col-6 px-1">
            <InputTemplate
              value={props.year}
              onChangeFunc={props.setYear}
              placeholder= {lang === "RU" ? "год " : "year "}
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col px-1">
          <button
            type="submit"
            class="btn btn-primary  "
            onClick={() => props.onSubmit()}
          >
            Register
          </button>
        </div>{" "}
      </div>
    </form>
  );
}

function InputTemplate(props) {
  return (
    <>
      <div class="mt-10">
        <input
          class="form-control"
          placeholder={props.placeholder}
          onChange={(e) => {
            props.onChangeFunc(e.target.value);
          }}
          value={props.value}
        />
      </div>
    </>
  );
}

function AuthTemplate(props) {
  const {lang} = useSelector(state => state.lang)
  return (
    <>
      <div class="mt-20">
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="email"
          value={props.email}
          onChange={(e) => {
            props.setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          class="form-control mt-10"
          id="exampleInputPassword1"
          placeholder={lang === "RU" ? "пароль " : "password "}
          value={props.password}
          onChange={(e) => {
            props.setPassword(e.target.value);
          }}
        />
      </div>
    </>
  );
}
