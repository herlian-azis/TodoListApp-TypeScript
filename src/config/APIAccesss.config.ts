import axios from "axios";
// update this BaseURL -> "<new_ngrok_host_url>" Dynamic
const baseURL = "https://9c08-103-82-15-72.ap.ngrok.io";

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
