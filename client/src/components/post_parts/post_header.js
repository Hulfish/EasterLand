import { useSelector } from "react-redux";
import SettingsButton from "./buttons/settings_btn";
import ImagePlaceholder from "./image_placeholder_50x50";

export default function PostHeader(props) {
  const {lang} = useSelector(state => state.lang)
  return (
    <>
      <div class="flex space-between">
        <div class="flex">
          <ImagePlaceholder />
          <div class="ml-10">
            <div class="f-si-18 w-200 link" onClick={props.visitOne}>
              {props.author}
            </div>
            <div class="w-120 f-si-12">{DateParser(props.date, lang)}</div>
          </div>
        </div>
        <div>
          <SettingsButton />
        </div>
      </div>
    </>
  );
}

function DateParser(date, lang) {
  let [YMoD, HMiS] = date.split("T");
  let [Y, Mo, D] = YMoD.split("-");
  let [H, Mi, S_d] = HMiS.split(":");
  const [S] = S_d.split(".");
  // console.log(Y, Mo, D, H, Mi, S)
  if (+H + 10 > 23) {
    D = +D + 1;
    H = H - 14;
  } else {
    H = +H + 10;
  }

  return Y + " " + D + " " + monthDefine(Mo, lang) + " " + H + ":" + Mi;
}

function monthDefine(month, lang) {
  if (lang === "EN") {const months = [
    "janaury",
    "february",
    "march",
    "april",
    "may",
    "june",
    "jule",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  return months[+month - 1];}
  if (lang === "RU") {
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "август",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    return months[+month - 1];
  }
}
