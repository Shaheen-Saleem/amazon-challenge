import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5001/challenge-db720/us-central1/api", // cloud function
});

export default instance;