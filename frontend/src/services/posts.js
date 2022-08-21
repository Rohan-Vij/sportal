import axios from "axios";

import authHeader from "./auth-header";
import AuthService from "./auth";

const API_URL = "http://localhost:8000/posts/";

class UserService {
  getAll() {
    return axios.get(
      API_URL + "all",
      { validateStatus: false },
      { headers: authHeader() }
    ).data.posts;
  }

  search(query) {
    return axios.get(
      API_URL + "search",
      { params: { search: query } },
      { validateStatus: false },
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
      { validateStatus: false },
      { headers: authHeader() }
    );
  }

  getPost(id) {
    return axios.get(
      API_URL + "posts/" + id,
      { validateStatus: false },
      { headers: authHeader() }
    ).data.post;
  }

  addUserToPost(id) {
    return axios.post(
      API_URL +
        "posts/" +
        id +
        "/add/" +
        AuthService.getCurrentUser().user_data.email,
      { validateStatus: false },
      { headers: authHeader() }
    );
  }

  removeUserFromPost(id) {
    return axios.post(
      API_URL +
        "posts/" +
        id +
        "/remove/" +
        AuthService.getCurrentUser().user_data.email,
      { validateStatus: false },
      { headers: authHeader() }
    );
  }

  closePost() {
    return axios.patch(
      API_URL + "posts/" + id + "/close",
      { validateStatus: false },
      {
        headers: authHeader(),
      }
    );
  }
}
export default new UserService();
