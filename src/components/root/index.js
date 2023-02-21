import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

import { Card } from "@/components";
import { default as moviesAPI } from "@/api";
import { movieAction } from "@/store/actions";
import { Loader } from "@/components";
import { moviesID } from "@/constants";
import styles from "./Root.module.scss";

export default function Root() {
  const dispatch = useDispatch();
  const moviesData = useSelector((state) => state?.movies.moviesData);
  const [loading, setLoading] = useState(false);

  const getMovies = async () => {
    setLoading(true);
    let movies = [];
    for (let counter = 0; counter < moviesID.length; counter++) {
      try {
        const result = await moviesAPI.getMovies({ i: moviesID[counter] });
        if (result["Title"]) {
          movies.push(result);
        } else {
          movies = [];
          break;
        }
      } catch (err) {
        movies = [];
        break;
      }
    }
    dispatch(movieAction.getMoviesData(movies));
    setLoading(false);
  };

  useEffect(() => {
    if (!moviesData.length) {
      getMovies();
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.body}>
          <div className={styles.cardsView}>
            <h2 className={styles.header}>Our Movies</h2>

            {!!moviesData?.length > 0 &&
              moviesData?.map((value) => (
                <Link href={`/movies/${value["imdbID"]}`}>
                  <Card key={value.imdbID} data={value} />
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
