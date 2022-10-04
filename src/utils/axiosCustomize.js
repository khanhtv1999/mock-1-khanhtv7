import axios from "axios";
const customFetch = axios.create({
  baseURL: "https://quangnh.xyz/v1",
  headers: { "Content-Type": "application/json" },
});

export default customFetch;
