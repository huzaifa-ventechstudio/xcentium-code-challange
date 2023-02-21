import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}?apikey=${process.env.NEXT_PUBLIC_API_KEY}&r=json&type=movie`,
});

const getMovies = (userParams) => {
  const params = {};

  if (userParams) {
    Object.keys(userParams).forEach((param) => {
      params[param] = userParams[param];
    });
  }

  return new Promise((resolve, reject) => {
    axiosClient
      .get("", { params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {
  getMovies,
};
