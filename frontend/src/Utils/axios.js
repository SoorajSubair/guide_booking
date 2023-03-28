import axios from "axios";
import { baseUrl } from "./Urls";

const instance = axios.create({
  baseURL: baseUrl,
});

export default instance;