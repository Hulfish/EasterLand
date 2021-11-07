import { useContext, useEffect, useRef, useState } from "react";
import { UsersSearchContext } from "../context/users_search_context";
import { useSelector } from "react-redux"
import SearchLoader from "../components/loaders/search_loader";
import Search_userCard from "../components/search_user-card";
import SearchForm from "../components/search_form";

export default function Searchpage() {
  const {lang} = useSelector(state => state.lang) 
  const counter = useRef(0);
  const [searchResults, setSearchResults] = useState("");
  const [isSearching, setIsSearching] = useState(0);

  return (
    <div class="">
      {/* <Search_userCard user = {{name : "exapmle", surname: "examplenko", _id:"123", }} /> */}
      <h3 class="mb-20"> </h3>
      <SearchForm
        setSearchResults={setSearchResults}
        setIsSearching={setIsSearching}
        placeholder={`${ lang === "RU" ? "Найти кого-нибудь" :  "Search for something"}`}
        button={`${ lang === "RU" ? "Искать" :  "Search"}`}
        isPreventSubmit={1}
      />

      <div>
        {" "}
        <SR_table
          counter={counter}
          incrementCount={() => counter.current++}
          searchStates={{ searchResults, isSearching }}
        />{" "}
      </div>
    </div>
  );
}

//SR_table - SearchResultsTable

function SR_table(props) {
  const {lang} = useSelector(state => state.lang) 
  const { searchResults, isSearching } = props.searchStates;
  const counter = props.counter;

  useEffect(() => {
    // console.log("increment");
    props.incrementCount();
  }, [isSearching]);

  if (isSearching) {
    return (
      <div class="mb-500">
        {" "}
        <SearchLoader />{" "}
      </div>
    );
  }

  return (
    <div class="mb-500 mt-5">
      <div> </div>
      {searchResults[0] ? (
        <>
          <div class="mb-50"> { lang === "RU" ? "Результаты поиска:" :  "Search results:"}</div>
          <CardGenerator searchResults={searchResults} />
        </>
      ) : (
        <Empty_SearchInfo count={counter.current} />
      )}
    </div>
  );
}

function Empty_SearchInfo(props) {
  const {lang} = useSelector(state => state.lang) 
  return <div> {props.count ? `${ lang === "RU" ? "Ничего не найдено" :  "Nothing found"}` : `${ lang === "RU" ? "Найти что-нибудь" :  "Search something"}`} </div>;
}

function CardGenerator(props) {
  return props.searchResults.map((user) => {
    return <Search_userCard user={user} />;
  });
}
