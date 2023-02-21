import Image from "next/image";

import styles from "./Card.module.scss";

function Card({ data }) {
  return (
    <div className={styles.body}>
      <div className={styles.top}>
        <Image
          width={275}
          height={325}
          src={data["Poster"]}
          alt={data["Title"]}
        />
      </div>
      <div className={styles.bottom}>
        <h4>{data["Title"]}</h4>
        <p>{data["Runtime"]}</p>
      </div>
    </div>
  );
}

export default Card;
