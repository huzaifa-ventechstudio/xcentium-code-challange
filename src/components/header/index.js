import Link from "next/link";

import SearchBar from "../searchBar";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href={"/"}>
        <h1>Movies</h1>
      </Link>
      <SearchBar />
    </header>
  );
}
