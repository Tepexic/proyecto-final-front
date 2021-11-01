import axios from "axios";

export class Api {
  static BASE_URL = process.env.VUE_APP_BASE_URL;

  constructor() {
    this.axios = axiosInstance;
  }

  get(url, config) {
    return this.axios.get(url, config);
  }

  post(url, data, config) {
    return this.axios.post(url, data, config);
  }

  put(url, data, config) {
    return this.axios.put(url, data, config);
  }

  delete(url, config) {
    return this.axios.delete(url, config);
  }
}

export const axiosInstance = axios.create({ baseURL: Api.BASE_URL });
