import axios from "axios";

import authHeader from "./auth-header";
import AuthService from "./auth";

const API_URL = "http://localhost:8000/posts/";

class UserService {
  getAll() {
    return axios.get(API_URL + "all", { headers: authHeader() }).data.posts;
  }

  search(query) {
    return axios.get(
      API_URL + "search",
      { params: { search: query } },
      { headers: authHeader() }
    );
  }

  create(
    sport,
    location,
    poster,
    start_date,
    end_date,
    description,
    level,
    max_players
  ) {
    return axios.post(
      API_URL + "mod",
      {
        sport,
        location,
        poster,
        start_date,
        end_date,
        description,
        level,
        max_players,
      },
      { headers: authHeader() }
    );
  }

  getPost(id) {
    return axios.get(API_URL + "posts/" + id, { headers: authHeader() }).data
      .post;
  }

  addUserToPost(id) {
    return axios.post(
      API_URL + "posts/" + id + "/add/" + AuthService.getCurrentUser().user_data.email,
      { headers: authHeader() }
    );
  }

  removeUserFromPost(id) {
    return axios.post(
      API_URL + "posts/" + id + "/remove/" + AuthService.getCurrentUser().user_data.email,
      { headers: authHeader() }
    );
  }

  closePost() {
    return axios.patch(API_URL + "posts/" + id + "/close", {
      headers: authHeader(),
    });
  }
}
export default new UserService();
