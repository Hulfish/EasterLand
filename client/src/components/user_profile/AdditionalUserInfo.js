import { useEffect, useState } from "react";
import useProfileData from "../../hooks/profileData-hook";
import Loader from "../Loaders/loader";

export default function AdditionalUserInfo(props) {
  const { getUserAdditionalInfo, updateAdditionInfo } = useProfileData()
  const collapseId = "Addit_UserInfo";
  const [isLoading, setIsLoading] = useState(true); 

  const [school, setSchool] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [relationships, setRelationships] = useState(null);

  const [form_school, setForm_school] = useState(0);
  const [form_country, setForm_country] = useState(0);
  const [form_city, setForm_city] = useState(0);
  const [form_relationships, setForm_relationships] = useState(0);
  // const [isLoading, setIsLoading] = useState(true);

  async function applyUserInfoChanges() {
    try {
      const res = await updateAdditionInfo({
        form_school,
        form_country,
        form_city,
        form_relationships,
      });
      // console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  function onCancel() {
    setForm_city(city);
    setForm_country(country);
    setForm_school(school);
    setForm_relationships(city);
  }

  useEffect(() => {
    setForm_school(school);
    setForm_country(country);
    setForm_city(city);
    setForm_relationships(relationships);
  }, [relationships]);

  useEffect(async () => {
    try {
      const res = await getUserAdditionalInfo();
      const { school, city, country, relationships } = res.additInfo;
      setCity(city);
      setSchool(school);
      setCountry(country);
      setRelationships(relationships);
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
          <div class = {`f-si-${props.isMobile ? 14 : 16} mb-20`}>
            <div> {school ? school : "none"} </div>
            <div> {country ? country : "none"}</div>
            <div> {city ? city : "none"}</div>
            <div> {relationships ? relationships : "none"} </div>
          </div>
        )}
      </div>

      <div>
        <EditButton collapseId={collapseId} />
      </div>

      <div class="collapse mb-50" id={collapseId}>
        {isLoading ? (
          <Loader />
        ) : (
          <div class="mt-20">
            <form>
              <ChoseStateTemplte
                label={"School"}
                currentValue={form_school}
                setCurrent={(value) => setForm_school(value)}
                chooseList={["Школа №11", "Лицей №1", "Лицей №23"]}
                id={1}
              />
              <ChoseStateTemplte
                label={"Country"}
                currentValue={form_country}
                setCurrent={(value) => setForm_country(value)}
                chooseList={["Россия", "Россия", "Че ты еще хочешь"]}
                id={1}
              />
              <ChoseStateTemplte
                label={"City"}
                currentValue={form_city}
                setCurrent={(value) => setForm_city(value)}
                chooseList={["Биробиджан", "Хабар", "Москва (обсос)"]}
                id={1}
              />
              <ChoseStateTemplte
                label={"Relationships"}
                currentValue={form_relationships}
                setCurrent={(value) => setForm_relationships(value)}
                chooseList={["Свободен(а)", "Влюблен(а)", "Все сложно(аа)", "В активном поиске", "Одинок и свободен(а)"]}
                id={1}
              />

              <Addit_ConfirmButtons
                applyUserInfoChanges={applyUserInfoChanges}
                onCancel={onCancel}
              />
            </form>
          </div>
        )}
      </div>
    </>
  );
}

function DropdownWrapper(props) {
  return (
    <div class="dropdown w-100">
      <button
        class="btn btn-secondary w-100 dropdown-toggle"
        type="button"
        id={"dropdownMenuButton#" + props.id}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {props.currentValue ? props.currentValue : "Undefined"}
      </button>
      <ul
        class="dropdown-menu"
        aria-labelledby={"dropdownMenuButton#" + props.id}
      >
        {props.chooseList?.[0] ? (
          props.chooseList.map((item) => {
            return (
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    props.setCurrent(item);
                  }}
                  class="w-100 btn-custom"
                >
                  {item}
                </button>
              </div>
            );
          })
        ) : (
          <div class="text-center f-si-14"> Nothing to choose </div>
        )}
      </ul>
    </div>
  );
}

function ChoseStateTemplte(props) {
  return (
    <div class="row">
      <div class="col-sm-2 col-3">{props.label + ": "}</div>
      <div class="col-sm-10 col-9 mt-1">
        <DropdownWrapper
          currentValue={props.currentValue}
          setCurrent={props.setCurrent} //function))
          chooseList={props.chooseList}
          id={props.id}
        />
      </div>
    </div>
  );
}

function EditButton(props) {
  return (
    <div class="mt-10">
      <button
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={"#" + props.collapseId}
        aria-expanded="true"
        aria-controls={props.collapseId}
        class="btn btn-primary w-100"
        // onClick={() => props.func()}
      >
        {"Edit"}
      </button>
    </div>
  );
}

function Addit_ConfirmButtons(props) {
  return (
    <div class="row mt-3">
      <div class="col-xl-3 col-5">
        <button
          type="button"
          onClick={props.applyUserInfoChanges}
          class="btn btn-sm btn-primary w-100"
        >
          {"Apply"}
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
          {"Cancel"}
        </button>
      </div>
    </div>
  );
}
