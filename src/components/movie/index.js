import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

import { default as moviesAPI } from "@/api";
import { movieAction } from "@/store/actions";
import { Loader } from "@/components";
import { movieDetails } from "@/constants";
import styles from "./Movie.module.scss";

export default function Movie() {
  const router = useRouter();
  const { movieID } = router.query;
  const dispatch = useDispatch();
  const moviesData = useSelector((state) => state?.movies?.cachedMoviesData);
  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getCachedData = (movieID) => {
    const result = moviesData.filter((movie) => {
      return movie.imdbID === movieID;
    });
    setMovieData(result[0]);
  };

  const getMovieData = async (cachedMovieCondition) => {
    setLoading(true);
    const result = await moviesAPI.getMovies({ i: movieID, plot: "full" });
    console.log(result, "thisssisi");
    if (!result["Title"]) {
      setLoading(false);
      setError(true);
      return;
    }
    setMovieData(result);
    setLoading(false);
    if (cachedMovieCondition && moviesData.length === 5) {
      let tempCacheMoviesData = moviesData;
      tempCacheMoviesData.pop;
      tempCacheMoviesData.push(result);
      dispatch(movieAction.getCachedMovieData(tempCacheMoviesData));
    } else {
      dispatch(movieAction.getCachedMovieData([...moviesData, result]));
    }
  };

  useEffect(() => {
    console.log("running");
    if (!router.isReady) return;
    const cachedMovieCondition =
      moviesData.length > 0 &&
      moviesData.some((movie) => movie.imdbID === movieID);

    if (cachedMovieCondition) {
      getCachedData(movieID);
    } else {
      getMovieData(cachedMovieCondition);
    }
  }, [movieID]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : Object.keys(movieData).length ? (
        <seciton className={styles.movieContainer}>
          <div className={styles.body}>
            <div className={styles.top}>
              <Image
                src={movieData["Poster"]}
                layout="fill"
                objectFit="contain"
                alt={movieData["Title"]}
              />
            </div>
            <div className={styles.bottom}>
              <h1 className={styles.header}>{movieData["Title"]}</h1>
              <p>
                <b>IMDB: </b>
                {movieData["imdbRating"]}
              </p>
              <p>{movieData["Plot"]}</p>
              <div className={styles.mainDetailsContainer}>
                {movieDetails.map((value, index) => {
                  return (
                    <p key={index}>
                      <b>{value["title"]}</b>
                      {movieData[value["key"]]}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </seciton>
      ) : error ? (
        <h2>No movie found with this ID.</h2>
      ) : null}
    </>
  );
}
