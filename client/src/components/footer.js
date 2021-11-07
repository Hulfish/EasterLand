import {useSelector} from "react-redux"
export default function Footer() {
  const {lang} = useSelector(state => state.lang) 
  
  return (
<footer class="bd-footer py-5 bg-light">
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-3 mb-3">
        <a class="d-inline-flex align-items-center mb-2 link-dark text-decoration-none" href="/features" aria-label="Bootstrap">
          <span class="fs-5">Stepyandex.com</span>
        </a>
        <ul class="list-unstyled small text-muted">
          <li class="mb-2"> {lang === "RU" ? "Это сайт и социальная сеть, автор которой был вдохновлен другом, которого зовут Сте..." : "The great site and social media which author was inspired by his friend that was called Ste..."} </li>
          </ul>
      </div>
      
      <div class="col-6 col-lg-2 mb-3">
        <h5> {lang === "RU" ? "Инфо" : "Info" } </h5>
        <ul class="list-unstyled">
          <li class="mb-2"><a href="/features">{lang === "RU" ? "Инфо" : "Info " }</a></li>
          <li class="mb-2"><a href="/features">{lang === "RU" ? "Подробнее " : "Features " }</a></li>
          <li class="mb-2"><a href="/features">{lang === "RU" ? "Пожертвования " : "Donate " }</a></li>
        </ul>
      </div>
      <div class="col-6 col-lg-2 mb-3">
        <h5>{lang === "RU" ? "Также " : "Also " }</h5>
        <ul class="list-unstyled">
          <li class="mb-2"><a href="/">Faq</a></li>
          <li class="mb-2"><a href="#">{lang === "RU" ? "Спонсоры " : "Sponsors " }</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>

    
  );
}

function Links() {
  const linkClass = "link-white"
  return (
    <>
      <div class="text-center">
        <span class="ml-20">
          <a href="/info" class={linkClass}>
            Link
          </a>
        </span>
        <span class="ml-20">
          <a href="/info"  class = {linkClass} > Link </a>
        </span>
        <span class="ml-20">
          <a href="/info" class={linkClass}>
            Link
          </a>
        </span>
        <span class="ml-20">
          <a  href="/info"class={linkClass}>
            Link
          </a>
        </span>
        <span class="ml-20">
          <a href="/info" class={linkClass}>
            Link
          </a>
        </span>
        <span class="ml-20">
          <a href="/info" class={linkClass}>
            Link
          </a>
        </span>
        <span class="ml-20">
          <a href="/info" class={linkClass}>
            Link
          </a>
        </span>
      </div>
    </>
  );
}
