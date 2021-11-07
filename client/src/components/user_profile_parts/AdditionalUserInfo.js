import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useProfileData from "../../hooks/profile_data-hook";
import {
  setAllParamsAction,
  setUserCityAction,
  setUserCountryAction,
  setUserSchoolAction,
  setUserRelationshipsAction,
} from "../../store/user_info_reducer";
import Loader from "../loaders/loader";

export default function AdditionalUserInfo(props) {
  const {lang} = useSelector(state => state.lang)
  const { getUserAdditionalInfo, updateAdditionInfo } = useProfileData();
  const dispatch = useDispatch();

  const collapseId = "Addit_UserInfo";

  const [isLoading, setIsLoading] = useState(true);

  const { user_school, user_country, user_city, user_relationships } =
    useSelector((state) => state.userInfo);

  const school = user_school;
  const country = user_country;
  const city = user_city;
  const relationships = user_relationships;

  let savePoint = {};

  async function applyChanges() {
    try {
      console.log("school, country, city, relationships" ,school, country, city, relationships);
      const res = await updateAdditionInfo({
        school,
        country,
        city,
        relationships,
      });
      // console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(async () => {
    const pathId =
      window.location.pathname.split("/")[
        window.location.pathname.split("/").length - 1
      ];
    const isHome = pathId === localStorage.userId ? true : false;

    try {
      const user_id = isHome
        ? localStorage.getItem("userId")
        : sessionStorage.getItem("VisitedUser_id");
      const res = await getUserAdditionalInfo(user_id);
      dispatch(setAllParamsAction(res.additInfo));
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <div class="collapse show" id={collapseId}>
        {isLoading ? (
          <Loader />
        ) : (
          <div class={`f-si-${props.isMobile ? 14 : 16} mb-20`}>
            <div> {school || "none"} </div>
            <div> {country || "none"}</div>
            <div> {city || "none"}</div>
            <div> {relationships || "none"} </div>
          </div>
        )}
      </div>

      <div>
        <EditButton isHome={props.isHome} collapseId={collapseId} />
      </div>

      <div class="collapse mb-50" id={collapseId}>
        {isLoading ? (
          <Loader />
        ) : (
          <div class="mt-20">
            <form>
              <ChoseStateTemplate
                label={`${lang === "RU" ? "Школа" : "School" }`}
                value={school}
                setValue={(payload) => dispatch(setUserSchoolAction(payload))}
                chooseList={["Школа №11", "Лицей №1", "Лицей №23"]}
              />
              <ChoseStateTemplate
                label={`${lang === "RU" ? "Страна" : "Country" }`}
                value={country}
                setValue={(payload) => dispatch(setUserCountryAction(payload))}
                chooseList={["Россия", "Россия", "Че ты еще хочешь"]}
              />
              <ChoseStateTemplate
                label = {`${lang === "RU" ? "Город" : "City" }`}
                value={city}
                setValue={(payload) => dispatch(setUserCityAction(payload))}
                chooseList={["Биробиджан", "Хабар", "Москва (обсос)"]}
              />
              <ChoseStateTemplate
                label={`${lang === "RU" ? "Отношения" : "Relationships" }`}
                value={relationships}
                setValue={(payload) => dispatch(setUserRelationshipsAction(payload))}
                chooseList={[
                  "Свободен(а)",
                  "Влюблен(а)",
                  "Все сложно(аа)",
                  "В активном поиске",
                  "Одинок и свободен(а)",
                ]}
              />

              <Addit_ConfirmButtons
                applyChanges={applyChanges}
                // onCancel={onCancel}
              />
            </form>
          </div>
        )}
      </div>
    </>
  );
}

function ChoseStateTemplate(props) {
  const value = props.value;
  // console.log(props.label + " " + value);
  return (
    <div class="row">
      <div class="col-sm-2 col-3">{props.label + ": "}</div>
      <div class="col-sm-10 col-9 mt-1">
        <ChooseFormTemplate
          value={value}
          setValue={props.setValue}
          chooseList={props.chooseList}
        />
      </div>
    </div>
  );
}

function ChooseFormTemplate(props) {
  const value = props.value;
  const chooseList = props.chooseList;
  function setValue(payload) {
    props.setValue(payload);
  }
  return (
    <div class="dropdown w-100">
      <button
        class="btn btn-secondary dropdown-toggle w-100"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {value || "none"}
      </button>
      <ul class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton1">
        {chooseList.map((option) => {
          return (
            <li class="w-100">
              <div
                class="dropdown-item"
                onClick={() => {
                  setValue(option);
                }}
              >
                {option}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function EditButton(props) {
  const {lang} = useSelector(state => state.lang)
  return (
    <div class="mt-10">
      <button
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={"#" + props.collapseId}
        aria-expanded="true"
        aria-controls={props.collapseId}
        class={`btn btn-primary w-100 ${!props.isHome ? "d-none" : ""}`}
        // onClick={() => props.func()}
      >
        {lang === "RU" ? "Изменить" : "Edit" }
      </button>
    </div>
  );
}

function Addit_ConfirmButtons(props) {
  const {lang} = useSelector(state => state.lang)
  return (
    <div class="row mt-3">
      <div class="col-xl-3 col-5">
        <button
          type="button"
          onClick={props.applyChanges}
          class="btn btn-sm btn-primary w-100"
        >
        {lang === "RU" ? "Применить изменения" : "Apply" }
        </button>
      </div>
      <div class="col-xl-7 col-3"> </div>
      <div class="col-xl-2 col-4">
        <button
          type="button"
          onClick={(e) => {
            props.onCancel();
          }}
          class="btn btn-sm btn-danger w-100"
        >
          {lang === "RU" ? "Отменить" : "Cancel" }
        </button>
      </div>
    </div>
  );
}
