import axios from "axios";

const BaseAxiosURL = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
  timeoutErrorMessage: "زمان پاسخگویی بیش از 5ثانیه طول کشید!",
});
export default BaseAxiosURL;
