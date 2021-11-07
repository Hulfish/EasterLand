import { useContext, useState } from "react";
import { UsersSearchContext } from "../context/users_search_context";
import useSearch from "../hooks/search-hook";

export default function CommandForm(props) {
  
  const { search } = useSearch();
  const [text, setText] = useState("");
  const [searchType, setSearchType] = useState("name");

  function setDefault() {
    setText("");
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (window.location.pathname == "/search") {
      // console.log("Already searchPage");
    } else {
      // console.log(window.location);
    }

    try {
      const res = await searchRequest(text.trim(), searchType);
      setDefault();
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  function onChange(value) {
    setText(value);
  }
  async function searchRequest(value, searchType) {
    try {
      const res = await search({ [searchType]: value });
      return res;
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <form class="d-flex" onSubmit={onSubmit}>
      <input
        class="form-control me-2"
        type="search"
        placeholder="enter command"
        aria-label="Search"
        value={text}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </form>
  );
}
