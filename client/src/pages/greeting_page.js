import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import Lorem from "../components/lorem";
import { VeiwContext } from "../context/view_context";

export default function Greetingpage(props) {
  const { setIsCustom } = useContext(VeiwContext);
  const { lang } = useSelector((state) => state.lang);

  useEffect(() => {
    setIsCustom(false);
  }, []);

  return (
    <>
      <div class="mb-400 mt-20">
        <div class="jumbotron mt-5">
          <h1 class="display-4">Hello, Stepyandex!</h1>
          <p class="lead">
            {lang === "RU"
              ? "Stepyandex.com отличный сайт для общенияб поиска и для того, чтобы делиться новостями а также моря других интересностей  "
              : " Stepyandex.com is great site for communication, sharing informationm finding friends and a lot of other great things"}
          </p>
          <hr class="my-4" />
          <p>
          {lang === "RU"
              ? "Регистрируйся прямо сейчас чтобы быть на одной волне с друзьями!"
              : "Sing up right now to be with your friends!"}
          </p>
          <p class="lead">
            <a
              class="btn btn-primary btn-lg "
              href="/register"
              role="button"
              style={{ color: "white" }}
            >
              {lang === "RU"
              ? "Регистрироваться"
              : "Sign up"}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
