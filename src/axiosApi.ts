import axios from "axios";

const axiosApi = axios.create({
  baseURL: 'https://js-ts-18-default-rtdb.europe-west1.firebasedatabase.app/finance/'
});

export default axiosApi;