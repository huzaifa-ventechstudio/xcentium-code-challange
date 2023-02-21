import Header from "../header";
import styles from "./Layout.module.scss";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className={styles.mainContainer}>{children}</div>
    </>
  );
}
