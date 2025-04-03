import axios from "axios";

const instance = axios.create({
  baseURL: "https://mapifyme.onrender.com/profile"
});

export default instance;
