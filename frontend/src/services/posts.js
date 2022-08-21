import axios from "axios";

import authHeader from "./auth-header";
import AuthService from "./auth";

const API_URL = "http://localhost:8000/posts/";

class UserService {
  async getAll() {
    return await axios.get(API_URL + "all", {
      validateStatus: false,
      headers: authHeader(),
    }).data.posts;
  }

  async search(query) {
    return await axios.get(
      API_URL + "search",
      { params: { search: query } },
      { validateStatus: false, headers: authHeader() }
    );
  }

  async create(
    sport,
    location,
    poster,
    start_date,
    end_date,
    description,
    level,
    max_players
  ) {
    return await axios.post(
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
      { validateStatus: false, headers: authHeader() }
    );
  }

  async getPost(id) {
    return await axios.get(API_URL + "posts/" + id, {
      validateStatus: false,
      headers: authHeader(),
    }).data.post;
  }

  async addUserToPost(id) {
    return await axios.post(
      API_URL +
        "posts/" +
        id +
        "/add/" +
        AuthService.getCurrentUser().user_data.email,
      { validateStatus: false, headers: authHeader() }
    );
  }

  async removeUserFromPost(id) {
    return await axios.post(
      API_URL +
        "posts/" +
        id +
        "/remove/" +
        AuthService.getCurrentUser().user_data.email,
      { validateStatus: false, headers: authHeader() }
    );
  }

  async closePost() {
    return await axios.patch(API_URL + "posts/" + id + "/close", {
      validateStatus: false,
      headers: authHeader(),
    });
  }
}
export default new UserService();
