import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:3000/`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

// import NProgress from "nprogress";
// apiClient.interceptors.request.use(config => {
//   console.log("foooo");
//   NProgress.start();
//   return config;
// });

// apiClient.interceptors.response.use(response => {
//   console.log("bar");
//   NProgress.done();
//   return response;
// });

export default {
  getEvents(perPage, page) {
    return apiClient.get("/events?_limit=" + perPage + "&_page=" + page);
  },
  getEvent(id) {
    return apiClient.get(`/events/${id}`);
  },
  postEvent(event) {
    return apiClient.post("/events", event);
  }
};
