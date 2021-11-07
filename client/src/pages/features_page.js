import { useContext, useEffect } from "react";
import { VeiwContext } from "../context/view_context";
import { useSelector } from "react-redux";

export default function FeaturesPage() {
  const { setIsCustom } = useContext(VeiwContext);
  const { lang } = useSelector((state) => state.lang);
  useEffect(() => {
    setIsCustom(false);
  }, []);
  return (
    <>
      <div style={{ height: "80px" }}></div>
      <h1> {lang === "RU" ? "О нас " : "Features "} </h1>
      <div>
        <div style={{ height: "60px" }}></div>
        <h3> {lang === "RU" ? "Инфо " : "Info"}</h3>
        <div>
          {" "}
          {lang === "RU" ? "Информация о сайте " : " info about the site"}{" "}
        </div>
      </div>
      <div>
        <div style={{ height: "60px" }}></div>
        <h3> {lang === "RU" ? "Пожертвования " : "Donate"}</h3>
        {lang === "RU"
          ? `На данном сайте нет никакой рекламы (не должно быть), он существует абсолютно на никакой основе, а потому можно поддержать автора переводом на счет сбера по номеру `
          : " Our site doesn`t make any product placement or adds so you can support us by making donates on bank account "}<b> +7 914 815 58 94</b> 
        <div> </div>
      </div>
      <div style={{ height: "200px" }}></div>
    </>
  );
}
