import axios from "axios";
const customFetch = axios.create({
  baseURL: "https://quangnh.xyz/v1",
});
export default customFetch;
