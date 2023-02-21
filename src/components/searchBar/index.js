import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { default as moviesAPI } from "@/api";
import { Loader } from "@/components";
import SearchIcon from "@/assets/logos/searchIcon.svg";
import CloseIcon from "@/assets/logos/closeIcon.svg";
import styles from "./SearchBar.module.scss";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timeOut;
    if (searchValue.length) {
      setLoading(true);
      timeOut = setTimeout(() => {
        setLoading(true);
        setSuggestions([]);
        moviesAPI.getMovies({ s: searchValue }).then((res) => {
          if (res["Search"]) {
            setSuggestions(res["Search"]);
          }
          setLoading(false);
        });
      }, 500);
    } else {
      setSuggestions([]);
      setLoading(false);
    }

    return () => clearTimeout(timeOut);
  }, [searchValue]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchBarContainer}>
        <Image
          className={styles.searchIcon}
          src={SearchIcon}
          alt="search-icon"
        />
        <input
          type="text"
          placeholder="Search.."
          value={searchValue}
          style={
            searchValue.length
              ? { paddingRight: "45px" }
              : { paddingRight: "0px" }
          }
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
        />
        {searchValue.length ? (
          <Image
            onClick={() => {
              setSearchValue("");
            }}
            className={styles.closeIcon}
            src={CloseIcon}
            alt="close-icon"
          />
        ) : null}
      </div>
      {loading || searchValue.length || suggestions.length ? (
        <div className={styles.suggestionsContainer}>
          {loading ? (
            <Loader />
          ) : suggestions.length && searchValue ? (
            <ul>
              {suggestions.map((suggestion, index) => {
                return (
                  <Link href={`/movies/${suggestion.imdbID}`}>
                    <li
                      key={suggestion.imdbID}
                      onClick={() => {
                        setSearchValue("");
                      }}
                    >
                      <img src={suggestion.Poster} alt={suggestion.Title} />
                      <div>
                        <h4>{suggestion.Title}</h4>
                        <p>{suggestion.Year}</p>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </ul>
          ) : searchValue.length && !loading ? (
            <p>
              <b>No results Found {":("}</b>
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
